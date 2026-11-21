import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
}

export interface EmailSenderInfo {
  name: string;
  address: string;
  formatted: string;
}

/**
 * Escapes common HTML special characters to prevent HTML/XSS injection in emails.
 */
export function escapeHtml(unsafe: string | null | undefined): string {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Validates and retrieves server-side SMTP configuration from standardized environment variables:
 * - SMTP_HOST (defaults to 'smtp.gmail.com' if not provided)
 * - SMTP_PORT (defaults to 587 if not provided)
 * - SMTP_USER (required)
 * - SMTP_PASS (required)
 *
 * Rules:
 * - Port 465 -> secure: true
 * - Port 587 -> secure: false (STARTTLS)
 * - Strict validation against missing credentials or invalid ports
 * - Zero exposure of secrets in error messages
 */
export function getSmtpConfig(): SmtpConfig {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const host = (process.env.SMTP_HOST?.trim()) || 'smtp.gmail.com';
  const rawPort = process.env.SMTP_PORT?.trim() || '587';

  if (!user) {
    throw new Error('SMTP configuration error: SMTP_USER environment variable is missing.');
  }

  if (!pass) {
    throw new Error('SMTP configuration error: SMTP_PASS environment variable is missing.');
  }

  const port = parseInt(rawPort, 10);
  if (isNaN(port) || port <= 0 || port > 65535) {
    throw new Error(`SMTP configuration error: SMTP_PORT must be a valid port number (got: "${rawPort}").`);
  }

  // Gmail and standard mail protocols:
  // Port 465 is SSL direct (secure: true).
  // Port 587 is STARTTLS (secure: false).
  const secure = port === 465;

  return {
    host,
    port,
    secure,
    user,
    pass,
  };
}

/**
 * Returns formatted sender details derived from the active SMTP_USER.
 */
export function getEmailSender(displayName = 'IAPSMGC CON 2026'): EmailSenderInfo {
  const { user } = getSmtpConfig();
  return {
    name: displayName,
    address: user,
    formatted: `"${displayName}" <${user}>`,
  };
}

/**
 * Centralized factory to construct a configured Nodemailer transporter.
 * Uses bounded timeouts to prevent serverless function hangs.
 */
export function getEmailTransport(customConfig?: Partial<SmtpConfig>): Transporter {
  const config = { ...getSmtpConfig(), ...customConfig };

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000, // 10s connection timeout
    greetingTimeout: 10000,   // 10s greeting timeout
    socketTimeout: 15000,     // 15s socket timeout
  });
}

/**
 * Safe server-side diagnostic verification for development and automated tests.
 * Never logs credentials. Returns boolean indicating transporter readiness.
 */
export async function verifyEmailTransport(): Promise<{ success: boolean; error?: string }> {
  try {
    const transporter = getEmailTransport();
    await transporter.verify();
    return { success: true };
  } catch (err: any) {
    const safeError = err?.message || 'SMTP verification failed';
    return { success: false, error: safeError };
  }
}

