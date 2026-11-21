import fs from 'fs';
import path from 'path';
import { ContactSubmission } from '@/types';
import { ContactInput } from '../validations/contact';
import { getEmailTransport, getEmailSender, escapeHtml } from './emailTransport';

const TARGET_EMAIL = 'iapsmgc.conference@paruluniversity.ac.in';

function getPaths() {
    const DATA_DIR = path.join(/*turbopackIgnore: true*/ process.cwd(), 'data');
    const SUBMISSIONS_DIR = path.join(DATA_DIR, 'submissions');
    const CONTACT_FILE = path.join(SUBMISSIONS_DIR, 'contact.json');
    return { DATA_DIR, SUBMISSIONS_DIR, CONTACT_FILE };
}

/** Send contact details to the conference inbox using centralized SMTP service */
async function sendEmailNotification(submission: ContactInput): Promise<void> {
    const transporter = getEmailTransport();
    const sender = getEmailSender('IAPSMGC CON 2026 Website');

    const safeName = escapeHtml(submission.name);
    const safeEmail = escapeHtml(submission.email);
    const safePhone = escapeHtml(submission.phone || 'Not provided');
    const safeMessage = escapeHtml(submission.message);

    const mailOptions = {
        from: sender.formatted,
        to: TARGET_EMAIL,
        replyTo: submission.email,
        subject: `New Contact Form Submission — ${submission.name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #D4AF37; border-bottom: 2px solid #D4AF37; padding-bottom: 8px;">
                    New Contact Form Submission
                </h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                    <tr style="background: #f9f9f9;">
                        <td style="padding: 10px 14px; font-weight: bold; width: 140px; border: 1px solid #ddd;">Name</td>
                        <td style="padding: 10px 14px; border: 1px solid #ddd;">${safeName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #ddd;">Email</td>
                        <td style="padding: 10px 14px; border: 1px solid #ddd;">
                            <a href="mailto:${safeEmail}">${safeEmail}</a>
                        </td>
                    </tr>
                    <tr style="background: #f9f9f9;">
                        <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #ddd;">Contact Number</td>
                        <td style="padding: 10px 14px; border: 1px solid #ddd;">${safePhone}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #ddd; vertical-align: top;">Message</td>
                        <td style="padding: 10px 14px; border: 1px solid #ddd; white-space: pre-wrap;">${safeMessage}</td>
                    </tr>
                </table>
                <p style="margin-top: 20px; font-size: 12px; color: #888;">
                    Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST<br/>
                    Source: IAPSMGC CON 2026 Website — Contact Form
                </p>
            </div>
        `,
        // Plain text fallback
        text: `New Contact Form Submission\n\nName: ${submission.name}\nEmail: ${submission.email}\nContact Number: ${submission.phone || 'Not provided'}\nMessage:\n${submission.message}\n\nSubmitted: ${new Date().toISOString()}`,
    };

    await transporter.sendMail(mailOptions);
}

export class ContactService {
    static async saveSubmission(input: ContactInput): Promise<ContactSubmission> {
        const { CONTACT_FILE } = getPaths();
        const submission: ContactSubmission = {
            id: Date.now().toString(),
            ...input,
            submittedAt: new Date().toISOString(),
            forwardTo: TARGET_EMAIL,
        };

        // Save locally (best-effort; note that Vercel serverless filesystem is ephemeral)
        try {
            this.ensureDirectory();
            const submissions = this.getAllSubmissions();
            submissions.push(submission);
            fs.writeFileSync(CONTACT_FILE, JSON.stringify(submissions, null, 2));
        } catch (error) {
            console.warn('[ContactService] Could not write to local filesystem (expected on read-only serverless platforms):', error);
        }

        // Send email notification via centralized SMTP
        try {
            await sendEmailNotification(input);
            console.log(`[ContactService] Contact notification email successfully dispatched to ${TARGET_EMAIL}`);
        } catch (emailError: any) {
            console.error('[ContactService] Failed to send notification email:', emailError?.message || emailError);
            if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
                throw new Error("SMTP credentials are not configured on the server. Please ensure SMTP_USER and SMTP_PASS are set in your Vercel Environment Variables.");
            }
            throw new Error("Failed to send contact notification email: " + (emailError?.message || "Internal mailer error"));
        }

        return submission;
    }

    private static getAllSubmissions(): ContactSubmission[] {
        const { CONTACT_FILE } = getPaths();
        if (!fs.existsSync(CONTACT_FILE)) return [];

        try {
            const content = fs.readFileSync(CONTACT_FILE, 'utf-8');
            return JSON.parse(content);
        } catch (error) {
            console.error('[ContactService] Error reading local contact submissions:', error);
            return [];
        }
    }

    private static ensureDirectory() {
        const { DATA_DIR, SUBMISSIONS_DIR } = getPaths();
        [DATA_DIR, SUBMISSIONS_DIR].forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });
    }
}
