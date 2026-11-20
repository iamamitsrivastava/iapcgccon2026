import nodemailer from 'nodemailer';
import { RegistrationInput } from '@/types';

// Destination address (conference inbox)
const CONFERENCE_EMAIL = 'iapsmgc.conference@paruluniversity.ac.in';

/**
 * Standard port 587 transporter (matching working send-access-code and contactService routes)
 */
function createTransport() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER || process.env.EMAIL_USER || CONFERENCE_EMAIL;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASSWORD || 'dcweynmzcxdzrdkr';

  return nodemailer.createTransport({
    host: host,
    port: port,
    secure: port === 465,
    auth: {
      user: user,
      pass: pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

/**
 * Fallback port 465 SSL transporter
 */
function createFallbackTransport() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const user = process.env.SMTP_USER || process.env.EMAIL_USER || CONFERENCE_EMAIL;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASSWORD || 'dcweynmzcxdzrdkr';

  return nodemailer.createTransport({
    host: host,
    port: 465,
    secure: true,
    auth: {
      user: user,
      pass: pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
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
    const transporter = createTransport();
    const info = await transporter.sendMail(mailOptions);
    console.info('✅ Registration confirmation email sent successfully to', recipientEmail, info.messageId);
  } catch (err) {
    console.warn('⚠️ Primary port 587 transport failed, attempting fallback port 465 transport...', err);
    try {
      const fallbackTransporter = createFallbackTransport();
      const info = await fallbackTransporter.sendMail(mailOptions);
      console.info('✅ Registration confirmation email sent via fallback transport to', recipientEmail, info.messageId);
    } catch (fallbackErr) {
      console.error('❌ Failed to send registration email on both transports:', fallbackErr);
      throw fallbackErr;
    }
  }
}
