import { z } from "zod";

// ===========================================
// Authentication Schemas
// ===========================================

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  full_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  agree_terms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms" }),
  }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// ===========================================
// Purchase Schemas
// ===========================================

export const purchaseSchema = z.object({
  plan_id: z.string().min(1, "Please select a plan"),
  payment_method: z.enum(["card", "crypto"], {
    errorMap: () => ({ message: "Please select a payment method" }),
  }),
  email: z.string().email("Please enter a valid email address"),
  promo_code: z.string().optional(),
});

// ===========================================
// Payout Schemas
// ===========================================

export const payoutRequestSchema = z.object({
  challenge_id: z.string().uuid("Invalid challenge ID"),
  amount: z.number().positive("Amount must be positive"),
  method: z.enum(["bank", "crypto"]),
  wallet_address: z.string().optional(),
  bank_details: z.object({
    account_name: z.string(),
    account_number: z.string(),
    bank_name: z.string(),
    swift_code: z.string(),
  }).optional(),
}).refine(
  (data) => {
    if (data.method === "crypto") return !!data.wallet_address;
    if (data.method === "bank") return !!data.bank_details;
    return false;
  },
  { message: "Please provide payment details" }
);

// ===========================================
// Contact Form Schema
// ===========================================

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

// ===========================================
// Type Exports
// ===========================================

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type PurchaseInput = z.infer<typeof purchaseSchema>;
export type PayoutRequestInput = z.infer<typeof payoutRequestSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
