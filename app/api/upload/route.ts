import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and add timestamp to avoid collisions
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase();
    const filename = `${Date.now()}-${safeName}`;

    // 1. Try ImgBB if API key is provided
    if (process.env.IMGBB_API_KEY) {
      try {
        console.log("Uploading to ImgBB...");
        const imgbbForm = new FormData();
        imgbbForm.append('image', new Blob([buffer]), filename);
        
        const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
          method: 'POST',
          body: imgbbForm
        });
        
        if (imgbbRes.ok) {
          const imgbbData = await imgbbRes.json();
          if (imgbbData.success) {
            console.log("Uploaded to ImgBB successfully:", imgbbData.data.url);
            return NextResponse.json({ success: true, url: imgbbData.data.url });
          }
        }
      } catch (imgbbError) {
        console.error("ImgBB upload failed:", imgbbError);
      }
    }

    // 2. Try Vercel Blob if token is provided
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        console.log("Uploading to Vercel Blob...");
        const vercelBlobRes = await fetch(`https://blob.vercel-storage.com/uploads/${filename}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
            'x-api-version': '1',
          },
          body: buffer
        });
        
        if (vercelBlobRes.ok) {
          const vercelBlobData = await vercelBlobRes.json();
          console.log("Uploaded to Vercel Blob successfully:", vercelBlobData.url);
          return NextResponse.json({ success: true, url: vercelBlobData.url });
        }
      } catch (vercelBlobError) {
        console.error("Vercel Blob upload failed:", vercelBlobError);
      }
    }

    const mimeType = file.type || 'application/octet-stream';
    const isImage = mimeType.startsWith('image/');

    // 3. FreeImage.host fallback (Images only) - highly reliable base64 upload
    if (isImage) {
      try {
        console.log("Trying FreeImage.host...");
        const base64Str = buffer.toString('base64');
        const fiRes = await fetch('https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            action: 'upload',
            source: base64Str,
            format: 'json'
          })
        });
        
        if (fiRes.ok) {
          const fiData = await fiRes.json();
          if (fiData.status_code === 200 && fiData.image && fiData.image.url) {
            console.log("Uploaded successfully to FreeImage.host:", fiData.image.url);
            return NextResponse.json({ success: true, url: fiData.image.url });
          }
        }
      } catch (e) {
        console.log("FreeImage.host upload failed:", e);
      }
    }

    // 4. Google Drive (via Apps Script)
    try {
      console.log("Trying Google Drive via Apps Script...");
      const base64Str = buffer.toString('base64');
      const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzchvpJn0a-3FJS3mBx1jLDPABbCwMfBIPxlD4zQVF9S95AnvPHSHRcZPLtiJOuImzeRg/exec";
      
      const gsRes = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
          action: "uploadOnly",
          fileBase64: base64Str,
          fileName: filename,
          fileMimeType: mimeType
        })
      });

      if (gsRes.ok) {
        const gsData = await gsRes.json();
        if (gsData.success && gsData.url) {
          console.log("Uploaded successfully to Google Drive:", gsData.url);
          return NextResponse.json({ success: true, url: gsData.url });
        }
      }
    } catch (e) {
      console.log("Google Drive upload failed:", e);
    }

    // 5. gofile.io (Keeps files until inactive, much better than tmpfiles.org)
    try {
      console.log("Trying gofile.io...");
      const sRes = await fetch('https://api.gofile.io/servers');
      if (sRes.ok) {
        const sData = await sRes.json();
        if (sData.status === 'ok' && sData.data.servers.length > 0) {
          const server = sData.data.servers[0].name;
          const goForm = new FormData();
          goForm.append('file', new Blob([buffer], { type: mimeType }), filename);
          
          const goRes = await fetch(`https://${server}.gofile.io/contents/uploadfile`, {
            method: 'POST',
            body: goForm
          });

          if (goRes.ok) {
            const goData = await goRes.json();
            if (goData.status === 'ok' && goData.data && goData.data.downloadPage) {
              console.log("Uploaded successfully to gofile.io:", goData.data.downloadPage);
              return NextResponse.json({ success: true, url: goData.data.downloadPage });
            }
          }
        }
      }
    } catch (e) {
      console.log("gofile.io upload failed:", e);
    }

    // 6. Absolute Last Resort: Local Filesystem
    try {
      console.log("All public hosts failed. Saving locally as last resort...");
      const uploadDir = join(process.cwd(), 'public/uploads');
      if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, { recursive: true });
      }
      const path = join(uploadDir, filename);
      await writeFile(path, buffer);
      
      const host = request.headers.get('host') || 'localhost:3000';
      const protocol = request.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
      const fullUrl = `${protocol}://${host}/uploads/${filename}`;
      
      console.log("Saved locally successfully:", fullUrl);
      return NextResponse.json({ success: true, url: fullUrl });
    } catch (localError) {
      console.error("Failed to save file locally:", localError);
    }

    // 7. Ultimate Fallback: Return Base64 Data URI
    console.log("All public hosts and local save failed. Returning Base64 Data URI...");
    const base64Str = buffer.toString('base64');
    const dataUri = `data:${mimeType};base64,${base64Str}`;
    return NextResponse.json({ success: true, url: dataUri });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
