import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const TARGET_EMAIL = 'iapsmgc.conference@paruluniversity.ac.in';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, registrationNo, email, documentLink } = body;

    if (!fullName || !registrationNo || !email || !documentLink) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        return NextResponse.json({ error: 'Email SMTP credentials are not configured.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false, // STARTTLS
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: `"IAPSMGC CON 2026 Website" <${process.env.SMTP_USER}>`,
        to: TARGET_EMAIL,
        subject: `New Abstract Submission — ${fullName}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #D4AF37; border-bottom: 2px solid #D4AF37; padding-bottom: 8px;">
                    New Abstract Submission
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
                        <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #ddd; vertical-align: top;">Document Link</td>
                        <td style="padding: 10px 14px; border: 1px solid #ddd;">
                            <a href="${documentLink}" target="_blank" rel="noopener noreferrer">${documentLink}</a>
                        </td>
                    </tr>
                </table>
                <p style="margin-top: 20px; font-size: 12px; color: #888;">
                    Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST<br/>
                    Source: IAPSMGC CON 2026 Website — Abstract Submission Form
                </p>
            </div>
        `,
        text: `New Abstract Submission\n\nFull Name: ${fullName}\nRegistration No: ${registrationNo}\nEmail: ${email}\nDocument Link: ${documentLink}\n\nSubmitted: ${new Date().toISOString()}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Abstract submitted successfully.' });
  } catch (error: any) {
    console.error('Error submitting abstract via email:', error);
    return NextResponse.json({ error: error.message || 'Failed to submit data' }, { status: 500 });
  }
}
