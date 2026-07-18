import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations/contact';
import { ContactService } from '@/lib/services/contactService';

// In-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_BODY_SIZE = 10_240; // 10KB

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    entry.count++;
    if (entry.count > MAX_REQUESTS_PER_WINDOW) {
        return true;
    }

    return false;
}

// Periodic cleanup to prevent memory leaks
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitMap.entries()) {
        if (now > value.resetTime) {
            rateLimitMap.delete(key);
        }
    }
}, 60_000);

export async function POST(request: Request) {
    try {
        // 1. Rate limiting
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded?.split(',')[0]?.trim() || 'unknown';

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { success: false, error: 'Too many requests. Please wait a minute before trying again.' },
                { status: 429 }
            );
        }

        // 2. Body size check
        const contentLength = request.headers.get('content-length');
        if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
            return NextResponse.json(
                { success: false, error: 'Request payload too large.' },
                { status: 413 }
            );
        }

        // 3. Parse JSON safely
        let body: unknown;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                { success: false, error: 'Invalid JSON in request body.' },
                { status: 400 }
            );
        }

        // 4. Validate with Zod
        const validation = contactSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Validation failed',
                    details: validation.error.flatten().fieldErrors
                },
                { status: 400 }
            );
        }

        // 5. Save using service layer
        const result = await ContactService.saveSubmission(validation.data);

        return NextResponse.json(
            {
                success: true,
                message: 'Thank you! Your message has been sent successfully.',
                data: { id: result.id }
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'An internal error occurred. Please try again later.'
            },
            { status: 500 }
        );
    }
}
