import { NextResponse } from 'next/server';
import { REGISTRATION_MAPPING, ACCESS_CODE_MAPPING } from '@/lib/registrationData';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: 'Invalid email address' }, { status: 400 });
    }

    const emailKey = email.toLowerCase().trim();
    
    const registrationCodes = REGISTRATION_MAPPING[emailKey];
    const accessCodes = ACCESS_CODE_MAPPING[emailKey];
    
    if ((registrationCodes && registrationCodes.length > 0) || (accessCodes && accessCodes.length > 0)) {
      return NextResponse.json({
        success: true,
        status: 'verified',
        registrationCodes: registrationCodes || [],
        accessCodes: accessCodes || []
      });
    }

    return NextResponse.json({
      success: true,
      status: 'pending'
    });

  } catch (error) {
    console.error('API Error /check-status:', error);
    return NextResponse.json({
      success: false,
      message: 'Unable to check status'
    }, { status: 500 });
  }
}
