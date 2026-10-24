import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { validateDiscountCode } from '@/lib/discountCodes';

const DATA_FILE = path.join(process.cwd(), 'data', 'used_discount_codes.json');

function getUsedCodes(): string[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) return parsed.map((c: string) => (c || '').toUpperCase());
    }
  } catch (err) {
    console.error('Error reading used_discount_codes.json:', err);
  }
  return [];
}

function saveUsedCode(code: string) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const current = getUsedCodes();
    const upper = code.toUpperCase();
    if (!current.includes(upper)) {
      current.push(upper);
      fs.writeFileSync(DATA_FILE, JSON.stringify(current, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Error saving to used_discount_codes.json:', err);
  }
}

export async function GET() {
  const usedCodes = getUsedCodes();
  return NextResponse.json({ success: true, usedCodes });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, action, clientUsedCodes = [] } = body;

    const serverUsedCodes = getUsedCodes();
    const combinedUsed = Array.from(new Set([...serverUsedCodes, ...(Array.isArray(clientUsedCodes) ? clientUsedCodes : [])]));

    const result = validateDiscountCode(code, combinedUsed);

    if (!result.valid) {
      return NextResponse.json({ success: false, message: result.message }, { status: 400 });
    }

    if (action === 'burn' && result.code) {
      saveUsedCode(result.code);
    }

    return NextResponse.json({
      success: true,
      code: result.code,
      discountPercent: result.discountPercent,
      appliesTo: result.appliesTo,
      message: result.message
    });
  } catch (error: any) {
    console.error('API Error /discount-code:', error);
    return NextResponse.json({ success: false, message: 'Server error verifying discount code' }, { status: 500 });
  }
}
