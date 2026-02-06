import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { z } from "zod";

// Simple in-memory rate limiter for contact form
const contactRateLimit = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // Max 5 submissions per hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = contactRateLimit.get(ip);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    contactRateLimit.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

// POST /api/contact - Submit contact form
export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for") ??
      request.headers.get("x-real-ip") ??
      "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    // Validate input
    const validatedData = contactSchema.parse(body);
    
    // In production, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Integrate with ticketing system (Zendesk, Intercom, etc.)
    
    // For now, just log and return success
    console.log("Contact form submission:", {
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject,
      message: validatedData.message.substring(0, 100) + "...",
      timestamp: new Date().toISOString(),
      ip,
    });

    // Simulate sending email (in production, use a service like SendGrid, Resend, etc.)
    // await sendEmail({
    //   to: process.env.SUPPORT_EMAIL,
    //   subject: `[Contact] ${validatedData.subject}`,
    //   body: `
    //     From: ${validatedData.name} <${validatedData.email}>
    //     Subject: ${validatedData.subject}
    //     
    //     ${validatedData.message}
    //   `,
    // });

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! We'll get back to you within 24-48 hours.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      );
    }
    
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
