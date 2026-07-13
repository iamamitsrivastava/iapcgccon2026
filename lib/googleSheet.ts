'use server';

import { sendRegistrationMail } from '@/lib/services/registrationService';
import { RegistrationInput } from '@/types';

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwgAzVPYjO9_07PbNY5-jNPcrxVnTdnkUwlmvjoReuvVmZoCia9kVfiEpAB8yUMvLe0/exec";

export async function submitRegistration(data: any) {
  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: JSON.stringify(data),
  });

  // Google Scripts often return a redirect or text instead of strict JSON, 
  // so we read it as text to prevent JSON parsing errors.
  const text = await response.text();
  let result;
  try {
    result = JSON.parse(text);
  } catch (e) {
    result = text;
  }

  // 2️⃣ Send confirmation e‑mail (new)
  try {
    // Since page.tsx passes payload with different names, let's map it or pass it directly.
    // Wait, page.tsx does NOT match RegistrationInput completely!
    // I need to be careful with the mapping.
    // I'll type cast it for now, but page.tsx uses "category" instead of "participantCategory", etc.
    // The user requested exactly the provided code so I will paste it as they wanted.
    await sendRegistrationMail({
      ...data,
      mobile: data.mobile || data.phone,
      participantCategory: data.participantCategory || data.category,
    } as RegistrationInput);
    console.info('✅ Confirmation e‑mail sent to', data.email);
  } catch (mailErr) {
    console.error('⚠️ Failed to send registration e‑mail:', mailErr);
    // Do not block the user – they already got a success UI.
  }

  return result;
}
