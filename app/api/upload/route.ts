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

    // 3. Fallback to Local Filesystem in local development (Non-Vercel environment)
    const isVercel = process.env.VERCEL === '1' || process.env.NOW_BUILDER === '1';
    if (!isVercel) {
      try {
        console.log("Local development environment detected. Saving locally...");
        const uploadDir = join(process.cwd(), 'public/uploads');
        if (!existsSync(uploadDir)) {
          mkdirSync(uploadDir, { recursive: true });
        }
        const path = join(uploadDir, filename);
        await writeFile(path, buffer);
        console.log("Saved locally successfully:", `/uploads/${filename}`);
        return NextResponse.json({ success: true, url: `/uploads/${filename}` });
      } catch (localError) {
        console.error("Failed to save file locally:", localError);
      }
    }

    // 4. Default zero-config fallback for Vercel production: Catbox.moe
    console.log("Using zero-config fallback (Catbox.moe)...");
    const catboxForm = new FormData();
    catboxForm.append('reqtype', 'fileupload');
    catboxForm.append('fileToUpload', new Blob([buffer]), filename);

    const catboxRes = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: catboxForm
    });

    if (catboxRes.ok) {
      const url = await catboxRes.text();
      if (url.startsWith('http')) {
        console.log("Uploaded successfully to Catbox:", url);
        return NextResponse.json({ success: true, url });
      }
    }

    throw new Error("All upload methods and fallbacks failed.");
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
