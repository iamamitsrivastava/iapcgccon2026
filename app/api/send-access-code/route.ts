import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { REGISTRATION_MAPPING } from '@/lib/registrationData';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // 1. Validation: Reject empty or invalid email addresses
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: 'Unable to send email' }, { status: 400 });
    }

    const emailKey = email.toLowerCase().trim();

    // 2. Setup Nodemailer Transporter using specified Environment Variables
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT) || 587;
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASSWORD;

    if (!host || !user || !pass) {
      console.error('SMTP credentials or configuration missing in environment variables.');
      return NextResponse.json({
        success: false,
        message: 'Unable to send email'
      }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: host,
      port: port,
      secure: port === 465, // true for port 465, false for 587/other ports using STARTTLS
      auth: {
        user: user,
        pass: pass,
      },
    });

    // 3. Optional: Search the participants database/mapping for extra info to make it future ready
    const codes = REGISTRATION_MAPPING[emailKey];
    let accessCodeSectionHtml = '';
    if (codes && codes.length > 0) {
      accessCodeSectionHtml = `
        <div style="background-color: #f8fafc; border: 1px dashed #e2e8f0; padding: 15px; margin: 20px 0; border-radius: 8px; text-align: center;">
          <p style="margin: 0 0 5px 0; font-size: 14px; color: #64748b; font-weight: 600;">Your Access/Registration Code:</p>
          <p style="margin: 0; font-size: 20px; font-weight: bold; color: #1e3a8a; letter-spacing: 1px;">${codes.join(', ')}</p>
        </div>
      `;
    }

    // 4. Construct Responsive HTML Email
    const mailOptions = {
      from: `"IAPSMGC CON 2026" <iapsmgc.conference@paruluniversity.ac.in>`,
      to: emailKey,
      subject: 'IAPSMGC CON 2026 – Registration Successful',
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #334155; line-height: 1.6; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <div style="background-color: #0f172a; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 1px;">IAPSMGC CON 2026</h1>
            <p style="color: #e2e8f0; margin: 5px 0 0 0; font-size: 14px;">Annual Conference</p>
          </div>
          <div style="padding: 30px 40px;">
            <p style="margin-top: 0; font-size: 16px; font-weight: 600; color: #0f172a;">Dear Participant,</p>
            <p>Greetings from IAPSMGC CON 2026.</p>
            <p>Thank you for registering.</p>
            <p>Your registration has been received successfully.</p>
            <p>We look forward to welcoming you to the conference.</p>
            
            ${accessCodeSectionHtml}

            <div style="margin: 30px 0; text-align: center;">
              <a href="https://iapsmgccon2026.paruluniversity.ac.in" style="background-color: #facc15; color: #0f172a; text-decoration: none; padding: 12px 24px; font-weight: bold; border-radius: 8px; font-size: 15px; display: inline-block; transition: background-color 0.2s;">
                Conference Website
              </a>
            </div>

            <p style="font-size: 15px; color: #475569;">If you have any queries, feel free to contact us.</p>
            
            <div style="margin-top: 40px; border-top: 1px solid #f1f5f9; padding-top: 20px;">
              <p style="margin: 0; font-size: 14px; font-weight: 600; color: #0f172a;">Regards,</p>
              <p style="margin: 4px 0 0 0; font-size: 14px; color: #475569; line-height: 1.4;">
                Organizing Committee<br/>
                <strong>IAPSMGC CON 2026</strong><br/>
                Parul University
              </p>
            </div>
          </div>
          <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="font-size: 12px; color: #94a3b8; margin: 0;">&copy; 2026 IAPSMGC CON | Parul University</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.info(`[EmailSuccess] Access code/success email sent to ${emailKey}`);

    return NextResponse.json({
      success: true
    });

  } catch (error) {
    console.error('API Error /send-access-code:', error);
    return NextResponse.json({
      success: false,
      message: 'Unable to send email'
    }, { status: 500 });
  }
}
