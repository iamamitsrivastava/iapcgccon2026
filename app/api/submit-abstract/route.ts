import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { ACCESS_CODE_MAPPING, REGISTRATION_MAPPING } from '@/lib/registrationData';
import { IS_ABSTRACT_SUBMISSION_OPEN, ABSTRACT_SUBMISSION_CLOSED_MESSAGE } from '@/lib/submissionConfig';

const TARGET_EMAIL = 'iapsmgc.conference@paruluniversity.ac.in';
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzUE8_drWQ2d6uEawp6MyobglT5dj4t7ekTGH2QaLv1JJmnlooAGRngVd6k20wJvHx4Cg/exec";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const submissionType = (formData.get('submissionType') as string) || 'ABSTRACT';

    if (submissionType === 'ABSTRACT' && !IS_ABSTRACT_SUBMISSION_OPEN) {
      return NextResponse.json(
        { error: ABSTRACT_SUBMISSION_CLOSED_MESSAGE, success: false },
        { status: 403 }
      );
    }
    const fullName = (formData.get('fullName') as string || '').trim();
    const rawAccessCode = (formData.get('accessCode') as string) || (formData.get('registrationNo') as string) || (formData.get('registrationNumber') as string);
    const accessCode = (rawAccessCode || '').toUpperCase().trim();
    const email = (formData.get('email') as string || '').toLowerCase().trim();
    let documentLink = (formData.get('documentLink') as string || '').trim();
    const file = formData.get('file') as File | null;

    console.log("Received abstract submission request:", { fullName, accessCode, email, documentLink, hasFile: !!file, fileName: file?.name, fileSize: file?.size });

    const missingFields = [];
    if (!fullName) missingFields.push('fullName');
    if (!accessCode) missingFields.push('accessCode/registrationNo');
    if (!email) missingFields.push('email');
    if (!documentLink && (!file || !(file instanceof File) || file.size === 0)) {
      missingFields.push('document file or link');
    }

    if (missingFields.length > 0) {
      return NextResponse.json({ error: `Missing required fields: ${missingFields.join(', ')}` }, { status: 400 });
    }

    // ── 1. Validate Access / Registration Code against participant records ────
    const validAccessCodes = ACCESS_CODE_MAPPING[email] || [];
    const validRegistrationCodes = REGISTRATION_MAPPING[email] || [];
    
    if (!validAccessCodes.includes(accessCode) && !validRegistrationCodes.includes(accessCode)) {
      return NextResponse.json({ error: 'Invalid Access/Registration Code for this email address.' }, { status: 403 });
    }

    // ── 2. Convert File to Base64 (if file is provided) ─────────────────────
    let fileBase64: string | null = null;
    let fileName: string | null = null;
    let fileMimeType = 'application/pdf';

    if (file && file instanceof File && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      fileBase64 = buffer.toString('base64');
      fileName = file.name || 'abstract-document.pdf';
      fileMimeType = file.type || 'application/pdf';
    } else if (documentLink && documentLink.startsWith('data:')) {
      try {
        const parts = documentLink.split(',');
        if (parts.length === 2) {
          fileBase64 = parts[1];
          const mimeMatch = parts[0].match(/:(.*?);/);
          if (mimeMatch) fileMimeType = mimeMatch[1];
          fileName = 'abstract-document.pdf';
        }
        documentLink = "Uploaded via Direct File Attachment";
      } catch (e) {
        console.error("Failed to parse Data URI:", e);
      }
    }

    // Format filename as Submitter_Full_Name.ext for Google Drive storage
    const sanitizedName = fullName.replace(/[^a-zA-Z0-9 ._()-]/g, '').replace(/\s+/g, ' ');
    let ext = 'pdf';
    if (fileName && fileName.includes('.')) {
      ext = fileName.split('.').pop() || 'pdf';
    } else if (fileMimeType.includes('word') || fileMimeType.includes('document')) {
      ext = 'docx';
    }
    const driveFileName = `${sanitizedName}.${ext}`;

    // ── 3. Send to Google Apps Script for Drive Storage & Sheet Logging ───────
    const gsPayload: any = {
      type: submissionType,
      fullName,
      registrationNumber: accessCode,
      email,
      documentLink: documentLink || '',
      folderId: process.env.GOOGLE_DRIVE_FOLDER_ID || "1pLL29U8Pcd61VtU7E0c6I9xNK64BzvIW",
    };

    if (fileBase64) {
      gsPayload.fileBase64 = fileBase64;
      gsPayload.fileName = driveFileName;
      gsPayload.fileMimeType = fileMimeType;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 35000); // 35s timeout

    let gsRes;
    try {
      gsRes = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gsPayload),
        signal: controller.signal
      });
    } catch (fetchErr: any) {
      clearTimeout(timeoutId);
      console.error("Fetch to Google Apps Script failed:", fetchErr);
      return NextResponse.json({
        error: fetchErr.name === 'AbortError'
          ? "Google Apps Script upload timed out. Please try again."
          : `Failed to connect to Google Drive service: ${fetchErr.message}`
      }, { status: 504 });
    }
    clearTimeout(timeoutId);

    if (!gsRes.ok) {
      console.error("Google Apps Script returned non-200 HTTP status:", gsRes.status);
      return NextResponse.json({ error: `Google Drive service returned HTTP ${gsRes.status}` }, { status: 502 });
    }

    let gsData: any;
    try {
      gsData = await gsRes.json();
    } catch (jsonErr) {
      console.error("Could not parse JSON response from Apps Script:", jsonErr);
      return NextResponse.json({ error: "Invalid response from Google Drive service." }, { status: 502 });
    }

    if (gsData.status === 'error' || gsData.success === false) {
      console.error("Google Apps Script reported error:", gsData.message || gsData.error);
      return NextResponse.json({ error: `Drive storage failed: ${gsData.message || gsData.error || 'Google Apps Script error'}` }, { status: 500 });
    }

    if (gsData.driveUrl) {
      console.log("Successfully saved file to Google Drive. Permanent URL:", gsData.driveUrl);
      documentLink = gsData.driveUrl;
    }

    // ── 4. Send Confirmation Email via SMTP (if configured) ─────────────────
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
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
                  <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #ddd;">Access Code</td>
                  <td style="padding: 10px 14px; border: 1px solid #ddd;">${accessCode}</td>
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
          text: `New ${typeLabel} Submission\n\nFull Name: ${fullName}\nAccess Code: ${accessCode}\nEmail: ${email}\nDocument: ${documentLink}\n\nSubmitted: ${new Date().toISOString()}`,
        });

        const delegateSubject = typeLabel === 'Full Paper' ? 'Full Paper Submission Received - IAPSMGCCON 2026' : 'Abstract Submission Received - IAPSMGCCON 2026';
        
        await transporter.sendMail({
          from: `"IAPSMGC CON 2026 Website" <${process.env.SMTP_USER}>`,
          to: email,
          subject: delegateSubject,
          text: `Dear Delegate,\n\nGreetings from the Organizing Committee of IAPSMGCCON 2026 – Gujarat State Chapter.\n\nThank you for submitting your abstract for presentation at the 33rd Annual State Conference of IAPSM, Gujarat Chapter.\n\nWe are pleased to confirm that your abstract has been successfully received by the Organizing Committee.\n\nView your submitted abstract:\n${documentLink}\n\nPlease retain this email for your records.\n\nWarm regards,\nOrganizing Committee\nIAPSMGCCON 2026`,
          html: `
            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
              <p>Dear Delegate,</p>
              <p>Greetings from the Organizing Committee of IAPSMGCCON 2026 – Gujarat State Chapter.</p>
              <p>Thank you for submitting your abstract for presentation at the 33rd Annual State Conference of IAPSM, Gujarat Chapter.</p>
              <p>We are pleased to confirm that your abstract has been successfully received by the Organizing Committee.</p>
              <p>View your submitted abstract:<br/>
              <a href="${documentLink}" target="_blank" rel="noopener noreferrer">${documentLink}</a></p>
              <p>Please retain this email for your records.</p>
              <p>Warm regards,<br/>Organizing Committee<br/>IAPSMGCCON 2026</p>
            </div>
          `
        });
      } catch (emailErr) {
        console.error("Email sending error (non-fatal):", emailErr);
      }
    }

    return NextResponse.json({ success: true, message: `${submissionType} submitted successfully.`, driveUrl: documentLink });
  } catch (error: any) {
    console.error('Error submitting abstract:', error);
    return NextResponse.json({ error: error.message || 'Failed to submit abstract' }, { status: 500 });
  }
}

