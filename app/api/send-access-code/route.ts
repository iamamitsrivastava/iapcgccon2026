import { NextResponse } from 'next/server';
import { REGISTRATION_MAPPING } from '@/lib/registrationData';
import { getEmailTransport, getEmailSender } from '@/lib/services/emailTransport';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONFERENCE_INBOX = 'iapsmgc.conference@paruluniversity.ac.in';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // 1. Validation: Reject empty or invalid email addresses
    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json({ success: false, message: 'Invalid or empty email address provided.' }, { status: 400 });
    }

    const emailKey = email.toLowerCase().trim();

    // 2. Search participant records for access/registration codes
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

    // 3. Resolve centralized transporter and sender
    const transporter = getEmailTransport();
    const sender = getEmailSender('IAPSMGC CON 2026');

    // 4. Construct responsive HTML email
    const mailOptions = {
      from: sender.formatted,
      to: emailKey,
      replyTo: CONFERENCE_INBOX,
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
      text: `Dear Participant,\n\nGreetings from IAPSMGC CON 2026.\n\nThank you for registering. Your registration has been received successfully.\n\n${codes && codes.length > 0 ? `Your Access/Registration Code: ${codes.join(', ')}\n\n` : ''}Conference Website: https://iapsmgccon2026.paruluniversity.ac.in\n\nIf you have any queries, feel free to contact us.\n\nRegards,\nOrganizing Committee\nIAPSMGC CON 2026\nParul University`,
    };

    await transporter.sendMail(mailOptions);
    console.info(`[EmailSuccess] Access code/success email delivered to ${emailKey}`);

    return NextResponse.json({
      success: true,
      message: 'Access code sent successfully',
    });

  } catch (error: any) {
    console.error('[AccessCodeEmailError] Delivery error:', error?.message || error);
    return NextResponse.json({
      success: false,
      message: error?.message?.includes('SMTP configuration error')
        ? 'Server email configuration error. Please contact conference support.'
        : 'Unable to send email at this moment. Please try again later.'
    }, { status: 500 });
  }
}
