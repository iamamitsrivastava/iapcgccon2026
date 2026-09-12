import { NextResponse } from 'next/server';
import { ACCESS_CODE_MAPPING } from '@/lib/registrationData';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ success: false, message: 'Invalid code provided' }, { status: 400 });
    }

    const upperCode = code.toUpperCase().trim();
    
    // Check if code exists in any of the arrays in ACCESS_CODE_MAPPING
    let isValid = false;
    for (const email in ACCESS_CODE_MAPPING) {
        if (ACCESS_CODE_MAPPING[email].includes(upperCode)) {
            isValid = true;
            break;
        }
    }

    // Fallback: If it's a registration code instead, we can allow it too if they pasted that
    if (!isValid) {
        const { REGISTRATION_MAPPING } = await import('@/lib/registrationData');
        for (const email in REGISTRATION_MAPPING) {
            if (REGISTRATION_MAPPING[email].includes(upperCode)) {
                isValid = true;
                break;
            }
        }
    }

    if (isValid) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: 'Invalid access code' }, { status: 400 });

  } catch (error) {
    console.error('API Error /verify-access-code:', error);
    return NextResponse.json({
      success: false,
      message: 'Unable to verify code'
    }, { status: 500 });
  }
}
