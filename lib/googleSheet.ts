'use server';

import { sendRegistrationMail } from '@/lib/services/registrationService';
import { RegistrationInput } from '@/types';

const GOOGLE_SCRIPT_URL =
  process.env.REGISTRATION_CONFERENCE_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbwCUXfDJmX4z85iU3_MImszaKdPeFKDoKCq96tUle7yly5NBGkjJcvTQ_f_DGler5Fm/exec";

// Google Apps Script Web App for Pre-Conference Registrations
const GOOGLE_SCRIPT_URL_PRE_CONF =
  process.env.REGISTRATION_PRECONF_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbyym0XlBUg-scmh_50MBACYl7yXWagwpzn3pkb3NKSeRpTBZBGb_Rzq-SNLC7qOpANk/exec";

export async function submitRegistration(data: any) {
  // Check if this is a Pre-Conference registration
  const isPreConf = (data.registrationPlan && data.registrationPlan.toLowerCase().includes('pre-conference')) ||
    (data.registrationDoneFor && data.registrationDoneFor.toLowerCase().includes('pre-conference'));
  const targetUrl = isPreConf ? GOOGLE_SCRIPT_URL_PRE_CONF : GOOGLE_SCRIPT_URL;

  // 1️⃣ Record registration and atomically allocate code in Google Sheet
  let sheetResult: any = null;
  let allocatedCode: string | null = null;

  try {
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data),
    });

    const text = await response.text();
    try {
      sheetResult = JSON.parse(text);
    } catch {
      sheetResult = { success: true, text };
    }

    if (sheetResult && sheetResult.success === false) {
      console.error('⚠️ Google Apps Script error:', sheetResult.message || sheetResult);
      return {
        success: false,
        capacityExhausted: !!sheetResult.capacityExhausted,
        message: sheetResult.message || 'Failed to submit registration to Google Sheets.',
      };
    }

    if (sheetResult && sheetResult.registrationCode) {
      allocatedCode = sheetResult.registrationCode;
    }
  } catch (sheetErr: any) {
    console.error('❌ Google Apps Script request failed:', sheetErr);
    return {
      success: false,
      message: 'Failed to record registration in spreadsheet. Please try again or check internet connection.',
      error: sheetErr?.message || String(sheetErr)
    };
  }

  // 2️⃣ Send confirmation email including the allocated registration code
  const recipientEmail = (data.email || '').trim();
  let emailSent = false;
  let emailDeliveryInfo: { messageId?: string; response?: string } | null = null;
  let emailError: string | null = null;

  if (recipientEmail) {
    try {
      const delivery = await sendRegistrationMail({
        ...data,
        email: recipientEmail,
        mobile: data.mobile || data.phone,
        participantCategory: data.participantCategory || data.category,
        registrationCode: allocatedCode || undefined,
      } as RegistrationInput);
      emailSent = true;
      emailDeliveryInfo = delivery;
      console.info('✅ Confirmation email delivered to', recipientEmail, `Code: ${allocatedCode}`);
    } catch (mailErr: any) {
      emailError = mailErr?.message || String(mailErr);
      console.error('⚠️ Failed to deliver registration email:', emailError);
    }
  } else {
    emailError = 'No recipient email found in registration data.';
    console.warn('⚠️ No recipient email found in registration data.');
  }

  return {
    ...(sheetResult || {}),
    success: true,
    registrationCode: allocatedCode,
    emailSent,
    emailDeliveryInfo,
    emailError,
  };
}
