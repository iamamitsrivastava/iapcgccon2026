import nodemailer from 'nodemailer';
import { RegistrationInput } from '@/types';

// Destination address (conference inbox)
const CONFERENCE_EMAIL = 'iapsmgc.conference@paruluniversity.ac.in';

function createTransport(secure = true) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER || process.env.EMAIL_USER || CONFERENCE_EMAIL;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASSWORD || 'dcweynmzcxdzrdkr';
  const port = Number(process.env.SMTP_PORT) || (secure ? 465 : 587);

  // If a custom SMTP host is set (and not standard smtp.gmail.com), connect via host/port
  if (host && host !== 'smtp.gmail.com') {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      tls: { rejectUnauthorized: false },
    });
  }

  // Default to Gmail service (uses secure SSL port 465, highly reliable for Google Workspace)
  if (secure) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
      tls: { rejectUnauthorized: false },
    });
  }

  // Fallback to direct SMTP connection on port 587
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });
}

/**
 * Send a nicely formatted HTML and plain-text email confirming registration submission.
 */
export async function sendRegistrationMail(reg: RegistrationInput): Promise<void> {
  const user = process.env.SMTP_USER || process.env.EMAIL_USER || CONFERENCE_EMAIL;
  const recipientEmail = (reg.email || '').trim();

  if (!recipientEmail) {
    console.warn('⚠️ No recipient email address provided for registration mail.');
    return;
  }

  const senderEmail = user || CONFERENCE_EMAIL;

  const mailOptions = {
    from: `"IAPSMGCCON 2026" <${senderEmail}>`,
    to: recipientEmail,
    replyTo: CONFERENCE_EMAIL,
    bcc: CONFERENCE_EMAIL,
    subject: `✅ Registration Form Submission – IAPSMGCCON 2026`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px 20px; color: #111827; line-height: 1.6; font-size: 15px;">
        <p style="margin: 0 0 16px 0;">Dear Participant,</p>

        <p style="margin: 0 0 16px 0;">Greetings from the Organizing Committee of the 33rd Annual State Conference of the Indian Association of Preventive and Social Medicine, Gujarat Chapter.</p>

        <p style="margin: 0 0 16px 0;">Thank you for submitting your registration form for IAPSMGCCON 2026.</p>

        <p style="margin: 0 0 16px 0;">We have successfully received your registration details. Our team will verify the information and process your registration. A separate registration confirmation email will be sent to this email address within the next few days after successful verification.</p>

        <p style="margin: 0 0 16px 0;">If you have any queries regarding your registration, please feel free to contact us by replying to this email.</p>

        <p style="margin: 0 0 16px 0;">We appreciate your interest in IAPSMGCCON 2026 and look forward to welcoming you to the conference.</p>

        <p style="margin: 0 0 16px 0;">Warm regards,</p>

        <p style="margin: 0; line-height: 1.5;">
          Organizing Committee<br>
          IAPSMGCCON 2026<br>
          Department of Community Medicine<br>
          Parul Institute of Medical Sciences &amp; Research
        </p>
      </div>
    `,
    text: `Dear Participant,

Greetings from the Organizing Committee of the 33rd Annual State Conference of the Indian Association of Preventive and Social Medicine, Gujarat Chapter.

Thank you for submitting your registration form for IAPSMGCCON 2026.

We have successfully received your registration details. Our team will verify the information and process your registration. A separate registration confirmation email will be sent to this email address within the next few days after successful verification.

If you have any queries regarding your registration, please feel free to contact us by replying to this email.

We appreciate your interest in IAPSMGCCON 2026 and look forward to welcoming you to the conference.

Warm regards,

Organizing Committee
IAPSMGCCON 2026
Department of Community Medicine
Parul Institute of Medical Sciences & Research`,
  };

  try {
    const transporter = createTransport(true);
    await transporter.sendMail(mailOptions);
    console.info('✅ Registration confirmation email sent successfully to', recipientEmail);
  } catch (err) {
    console.warn('⚠️ Primary transport failed, attempting fallback transport...', err);
    const fallbackTransporter = createTransport(false);
    await fallbackTransporter.sendMail(mailOptions);
    console.info('✅ Registration confirmation email sent via fallback transport to', recipientEmail);
  }
}
