'use server';

import { sendRegistrationMail } from '@/lib/services/registrationService';
import { RegistrationInput } from '@/types';

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwgAzVPYjO9_07PbNY5-jNPcrxVnTdnkUwlmvjoReuvVmZoCia9kVfiEpAB8yUMvLe0/exec";

// Google Apps Script Web App for Pre-Conference Registrations
const GOOGLE_SCRIPT_URL_PRE_CONF =
  "https://script.google.com/macros/s/AKfycbyym0XlBUg-scmh_50MBACYl7yXWagwpzn3pkb3NKSeRpTBZBGb_Rzq-SNLC7qOpANk/exec";

export async function submitRegistration(data: any) {
  // Check if this is a Pre-Conference registration
  const isPreConf = (data.registrationPlan && data.registrationPlan.toLowerCase().includes('pre-conference')) ||
                    (data.registrationDoneFor && data.registrationDoneFor.toLowerCase().includes('pre-conference'));
  const targetUrl = isPreConf ? GOOGLE_SCRIPT_URL_PRE_CONF : GOOGLE_SCRIPT_URL;

  // 1️⃣ Send confirmation email first so delivery is guaranteed
  const recipientEmail = (data.email || '').trim();
  let emailSent = false;

  if (recipientEmail) {
    try {
      await sendRegistrationMail({
        ...data,
        email: recipientEmail,
        mobile: data.mobile || data.phone,
        participantCategory: data.participantCategory || data.category,
      } as RegistrationInput);
      emailSent = true;
      console.info('✅ Confirmation email delivered to', recipientEmail);
    } catch (mailErr) {
      console.error('⚠️ Failed to deliver registration email:', mailErr);
    }
  } else {
    console.warn('⚠️ No recipient email found in registration data.');
  }

  // 2️⃣ Record registration in Google Sheet via Apps Script Web App
  try {
    const response = await fetch(targetUrl, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const text = await response.text();
    try {
      const result = JSON.parse(text);
      if (result && result.success === false) {
        console.error('⚠️ Google Apps Script error:', result.message || result);
      }
      return { ...(result || {}), emailSent, success: true };
    } catch {
      return { success: true, text, emailSent };
    }
  } catch (sheetErr) {
    console.error('⚠️ Google Apps Script request failed:', sheetErr);
    return { success: true, emailSent, error: sheetErr };
  }
}
