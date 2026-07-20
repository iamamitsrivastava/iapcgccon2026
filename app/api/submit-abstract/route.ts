import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const TARGET_EMAIL = 'iapsmgc.conference@paruluniversity.ac.in';
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzchvpJn0a-3FJS3mBx1jLDPABbCwMfBIPxlD4zQVF9S95AnvPHSHRcZPLtiJOuImzeRg/exec";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const submissionType = (formData.get('submissionType') as string) || 'ABSTRACT';
    const fullName = formData.get('fullName') as string;
    const registrationNo = formData.get('registrationNo') as string;
    const email = formData.get('email') as string;
    const documentLink = formData.get('documentLink') as string;

    if (!fullName || !registrationNo || !email || !documentLink) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // ── 1. Fetch file from tmpfiles.org and convert to base64 ────────────────
    let fileBase64 = null;
    let fileName = null;
    let fileMimeType = 'application/pdf';

    if (documentLink && documentLink.includes('tmpfiles.org')) {
      try {
        console.log("Fetching tmpfiles.org file to send to Google Drive...");
        const res = await fetch(documentLink);
        if (res.ok) {
          const buffer = Buffer.from(await res.arrayBuffer());
          fileBase64 = buffer.toString('base64');
          fileName = documentLink.split('/').pop() || 'submission-document.pdf';
          if (fileName.toLowerCase().endsWith('.docx')) {
            fileMimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          }
        }
      } catch (e) {
        console.error("Failed to fetch tmpfiles document:", e);
      }
    }

    // ── 2. Log to Google Sheet and Create Drive File ─────────────────────────
    try {
      const gsPayload: any = {
        type: submissionType,
        fullName,
        registrationNumber: registrationNo,
        email,
        documentLink: documentLink, // Fallback if Drive upload fails
      };

      if (fileBase64 && fileName) {
        gsPayload.fileBase64 = fileBase64;
        gsPayload.fileName = fileName;
        gsPayload.fileMimeType = fileMimeType;
      }

      const gsRes = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(gsPayload),
      });

      // We can also extract the permanent drive URL if Apps Script returns it
      if (gsRes.ok) {
         try {
           const gsData = await gsRes.json();
           if (gsData.driveUrl) {
             console.log("Got permanent Drive URL from Apps Script:", gsData.driveUrl);
             // Update the documentLink to the permanent drive URL for the email
             documentLink = gsData.driveUrl;
           }
         } catch(e) { /* ignore parse error */ }
      }

    } catch (sheetErr) {
      console.error('⚠️ Google Sheet logging failed (non-fatal):', sheetErr);
    }

    // ── 2. Send confirmation e-mail ─────────────────────────────────────────
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return NextResponse.json({ error: 'Email credentials not configured.' }, { status: 500 });
    }

    const port = Number(process.env.SMTP_PORT) || 587;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const docHtml = `<a href="${documentLink}" target="_blank" rel="noopener noreferrer">${documentLink}</a>`;
    const typeLabel = submissionType === 'FULL_PAPER' ? 'Full Paper' : 'Abstract';

      const mailAttachments: any[] = [];
      if (documentLink && documentLink.includes('tmpfiles.org')) {
        try {
          console.log("Downloading tmpfiles.org link for email attachment...");
          const res = await fetch(documentLink);
          if (res.ok) {
            const buffer = Buffer.from(await res.arrayBuffer());
            const fileName = documentLink.split('/').pop() || 'submission-document';
            mailAttachments.push({
              filename: fileName,
              content: buffer
            });
            console.log("Attachment downloaded successfully.");
          }
        } catch (downloadErr) {
          console.error("Failed to download tmpfiles attachment:", downloadErr);
        }
      }

    await transporter.sendMail({
      from: `"IAPSMGC CON 2026 Website" <${process.env.SMTP_USER}>`,
      to: TARGET_EMAIL,
      subject: `New ${typeLabel} Submission — ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #D4AF37; border-bottom: 2px solid #D4AF37; padding-bottom: 8px;">
            New ${typeLabel} Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px 14px; font-weight: bold; width: 140px; border: 1px solid #ddd;">Full Name</td>
              <td style="padding: 10px 14px; border: 1px solid #ddd;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #ddd;">Registration No.</td>
              <td style="padding: 10px 14px; border: 1px solid #ddd;">${registrationNo}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #ddd;">Email</td>
              <td style="padding: 10px 14px; border: 1px solid #ddd;">
                <a href="mailto:${email}">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #ddd; vertical-align: top;">Document</td>
              <td style="padding: 10px 14px; border: 1px solid #ddd;">${docHtml}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; font-size: 12px; color: #888;">
            Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST<br/>
            Source: IAPSMGC CON 2026 Website — ${typeLabel} Submission Form
          </p>
        </div>
      `,
      text: `New ${typeLabel} Submission\n\nFull Name: ${fullName}\nRegistration No: ${registrationNo}\nEmail: ${email}\nDocument: ${documentLink}\n\nSubmitted: ${new Date().toISOString()}`,
      attachments: mailAttachments
    });

    return NextResponse.json({ success: true, message: `${typeLabel} submitted successfully.` });
  } catch (error: any) {
    console.error('Error submitting abstract:', error);
    return NextResponse.json({ error: error.message || 'Failed to submit' }, { status: 500 });
  }
}
