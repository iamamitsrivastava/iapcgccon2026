import { RegistrationInput } from '@/types';
import { getEmailTransport, getEmailSender } from '@/lib/services/emailTransport';

// Destination address (conference inbox)
const CONFERENCE_EMAIL = 'iapsmgc.conference@paruluniversity.ac.in';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Send a nicely formatted HTML and plain-text email confirming registration submission.
 * Standardized to use centralized SMTP service with safe error handling and verified delivery.
 */
export async function sendRegistrationMail(reg: RegistrationInput): Promise<void> {
  const recipientEmail = (reg.email || '').trim();

  if (!recipientEmail || !EMAIL_REGEX.test(recipientEmail)) {
    console.warn('⚠️ Invalid or missing recipient email address for registration mail:', recipientEmail);
    throw new Error(`Invalid or missing recipient email address: "${recipientEmail}"`);
  }

  const sender = getEmailSender('IAPSMGCCON 2026');

  const mailOptions = {
    from: sender.formatted,
    to: recipientEmail,
    cc: CONFERENCE_EMAIL,
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
    const transporter = getEmailTransport();
    const info = await transporter.sendMail(mailOptions);
    console.info('[RegistrationEmailSuccess] Confirmation email delivered to', recipientEmail, `messageId: ${info.messageId}`);
  } catch (err: any) {
    console.error('[RegistrationEmailError] Failed to deliver confirmation email:', err?.message || err);
    throw err;
  }
}
