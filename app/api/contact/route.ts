import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { z } from "zod";
import { sanitizeObject } from "@/lib/sanitize";

// POST /api/contact - Submit contact form
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = contactSchema.parse(body);

    // ★ Sanitize all string fields to prevent stored XSS
    sanitizeObject(validatedData as unknown as Record<string, unknown>);

    // In production, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Integrate with ticketing system (Zendesk, Intercom, etc.)

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
