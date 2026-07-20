import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { ContactSubmission } from '@/types';
import { ContactInput } from '../validations/contact';

const TARGET_EMAIL = 'iapsmgc.conference@paruluniversity.ac.in';

function getPaths() {
    const DATA_DIR = path.join(/*turbopackIgnore: true*/ process.cwd(), 'data');
    const SUBMISSIONS_DIR = path.join(DATA_DIR, 'submissions');
    const CONTACT_FILE = path.join(SUBMISSIONS_DIR, 'contact.json');
    return { DATA_DIR, SUBMISSIONS_DIR, CONTACT_FILE };
}

/** Send contact details to the conference inbox */
async function sendEmailNotification(submission: ContactInput): Promise<void> {
    // Nodemailer transporter — uses environment variables for credentials.
    // Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in your .env.local
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
        subject: `New Contact Form Submission — ${submission.name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #D4AF37; border-bottom: 2px solid #D4AF37; padding-bottom: 8px;">
                    New Contact Form Submission
                </h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                    <tr style="background: #f9f9f9;">
                        <td style="padding: 10px 14px; font-weight: bold; width: 140px; border: 1px solid #ddd;">Name</td>
                        <td style="padding: 10px 14px; border: 1px solid #ddd;">${submission.name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #ddd;">Email</td>
                        <td style="padding: 10px 14px; border: 1px solid #ddd;">
                            <a href="mailto:${submission.email}">${submission.email}</a>
                        </td>
                    </tr>
                    <tr style="background: #f9f9f9;">
                        <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #ddd;">Contact Number</td>
                        <td style="padding: 10px 14px; border: 1px solid #ddd;">${submission.phone || 'Not provided'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 14px; font-weight: bold; border: 1px solid #ddd; vertical-align: top;">Message</td>
                        <td style="padding: 10px 14px; border: 1px solid #ddd; white-space: pre-wrap;">${submission.message}</td>
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

        // Save locally (best-effort)
        try {
            this.ensureDirectory();
            const submissions = this.getAllSubmissions();
            submissions.push(submission);
            fs.writeFileSync(CONTACT_FILE, JSON.stringify(submissions, null, 2));
        } catch (error) {
            console.warn('Could not write to local filesystem:', error);
        }

        // Send email notification
        try {
            await sendEmailNotification(input);
            console.log(`Contact email sent to ${TARGET_EMAIL}`);
        } catch (emailError: any) {
            console.error('Failed to send notification email:', emailError);
            if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
                throw new Error("SMTP credentials are not configured on the server. Please add them to your Vercel Environment Variables.");
            }
            throw new Error("Failed to send email. " + emailError.message);
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
            console.error('Error reading contact submissions:', error);
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
