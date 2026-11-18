import nodemailer from 'nodemailer';
import { RegistrationInput } from '@/types';

// Destination address (conference inbox) – you can also CC/BCC the user.
const CONFERENCE_EMAIL = 'iapsmgc.conference@paruluniversity.ac.in';

function createTransport() {
  const user = process.env.SMTP_USER || process.env.EMAIL_USER || CONFERENCE_EMAIL;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASSWORD || 'dcweynmzcxdzrdkr';

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587 (STARTTLS)
    auth: {
      user: user,
      pass: pass,
    },
  });
}

/**
 * Send a nicely formatted HTML e‑mail confirming the registration.
 */
export async function sendRegistrationMail(reg: RegistrationInput): Promise<void> {
  const user = process.env.SMTP_USER || process.env.EMAIL_USER || CONFERENCE_EMAIL;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASSWORD || 'dcweynmzcxdzrdkr';

  const recipientEmail = (reg.email || '').trim();
  if (!recipientEmail) {
    console.warn('⚠️ No recipient email address provided for registration mail.');
    return;
  }

  const transporter = createTransport();
  const senderEmail = user || CONFERENCE_EMAIL;

  const mailOptions = {
    from: `"IAPSMGC CON 2026" <${senderEmail}>`,
    to: recipientEmail,                 // **User’s e‑mail**
    cc: CONFERENCE_EMAIL,              // optional copy for the conference inbox
    subject: `✅ Your IAPSMGC 2026 Registration`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;line-height:1.6;color:#333;">
        <p>Dear Participant,</p>

        <p>Greetings from the Organizing Committee of the 33rd Annual State Conference of the Indian Association of Preventive and Social Medicine, Gujarat Chapter.</p>

        <p>Thank you for submitting your registration form for IAPSMGCCON 2026.</p>

        <p>We have successfully received your registration details. Our team will verify the information and process your registration. A separate registration confirmation email will be sent to this email address within the next few days after successful verification.</p>

        <p>If you have any queries regarding your registration, please feel free to contact us by replying to this email.</p>

        <p>We appreciate your interest in IAPSMGCCON 2026 and look forward to welcoming you to the conference.</p>

        <p>Warm regards,<br><br>
        Organizing Committee<br>
        IAPSMGCCON 2026<br>
        Department of Community Medicine<br>
        Parul Institute of Medical Sciences & Research</p>
      </div>
    `,
    // Plain-text fallback for mail clients that don’t render HTML
    text: `
      Dear Participant,

      Greetings from the Organizing Committee of the 33rd Annual State Conference of the Indian Association of Preventive and Social Medicine, Gujarat Chapter.

      Thank you for submitting your registration form for IAPSMGCCON 2026.

      We have successfully received your registration details. Our team will verify the information and process your registration. A separate registration confirmation email will be sent to this email address within the next few days after successful verification.

      If you have any queries regarding your registration, please feel free to contact us by replying to this email.

      We appreciate your interest in IAPSMGCCON 2026 and look forward to welcoming you to the conference.

      Warm regards,

      Organizing Committee
      IAPSMGCCON 2026
      Department of Community Medicine
      Parul Institute of Medical Sciences & Research
    `,
  };

  await transporter.sendMail(mailOptions);
}
