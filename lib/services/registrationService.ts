import { RegistrationInput } from '@/types';
import { getEmailTransport, getEmailSender, escapeHtml } from '@/lib/services/emailTransport';

// Destination address (conference inbox)
const CONFERENCE_EMAIL = 'iapsmgc.conference@paruluniversity.ac.in';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Send a nicely formatted HTML and plain-text email confirming registration submission.
 * Standardized to use centralized SMTP service with safe error handling and verified delivery.
 */
export async function sendRegistrationMail(reg: RegistrationInput): Promise<{ messageId: string; response: string }> {
  const recipientEmail = (reg.email || '').trim();

  if (!recipientEmail || !EMAIL_REGEX.test(recipientEmail)) {
    console.warn('⚠️ Invalid or missing recipient email address for registration mail:', recipientEmail);
    throw new Error(`Invalid or missing recipient email address: "${recipientEmail}"`);
  }

  const sender = getEmailSender('IAPSMGCCON 2026');

  const codeSectionHtml = reg.registrationCode ? `
        <div style="margin: 20px 0; padding: 16px 20px; background: #f8fafc; border-left: 4px solid #D4AF37; border-radius: 6px;">
          <p style="margin: 0 0 8px 0; font-size: 16px; font-weight: 700; color: #0B1C35;">
            Your Registration Code: <span style="color: #0B1C35; font-size: 18px; letter-spacing: 0.05em; font-family: monospace;">${escapeHtml(reg.registrationCode)}</span>
          </p>
          <p style="margin: 0; font-size: 14px; color: #475569;">
            Please keep this code safe. You may need it for future communication and conference-related activities.
          </p>
        </div>` : '';

  const codeSectionText = reg.registrationCode ? `\nYour Registration Code: ${reg.registrationCode}\nPlease keep this code safe. You may need it for future communication and conference-related activities.\n` : '';

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

        <p style="margin: 0 0 16px 0;">Thank you for submitting your registration form for IAPSMGCCON 2026.</p>${codeSectionHtml}

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

Thank you for submitting your registration form for IAPSMGCCON 2026.${codeSectionText}

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
    return { messageId: info.messageId, response: info.response };
  } catch (err: any) {
    console.warn('[RegistrationEmailWarning] Primary transport failed, attempting fallback port 465 SSL transport...', err?.message || err);
    try {
      const fallbackTransporter = getEmailTransport({ port: 465, secure: true });
      const info = await fallbackTransporter.sendMail(mailOptions);
      console.info('[RegistrationEmailSuccess] Confirmation email delivered via fallback transport to', recipientEmail, `messageId: ${info.messageId}`);
      return { messageId: info.messageId, response: info.response };
    } catch (fallbackErr: any) {
      console.error('[RegistrationEmailError] Failed to deliver confirmation email on both transports:', fallbackErr?.message || fallbackErr);
      throw fallbackErr;
    }
  }
}
