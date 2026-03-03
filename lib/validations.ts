import { z } from "zod";

// ===========================================
// Shared Refinements
// ===========================================

/** Block names that contain HTML/script patterns */
const safeName = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name is too long")
  .regex(/^[a-zA-Z\s.\-']+$/, "Name contains invalid characters");

/** Password with max-length cap (prevents bcrypt hash-DoS) */
const strongPassword = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password is too long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

const safeEmail = z.string().trim().toLowerCase().email("Please enter a valid email address").max(254, "Email is too long");

// ===========================================
// Authentication Schemas
// ===========================================

export const loginSchema = z.object({
  email: safeEmail,
  password: z.string().min(8, "Password must be at least 8 characters").max(128, "Password is too long"),
});

export const signupSchema = z.object({
  email: safeEmail,
  password: strongPassword,
  full_name: safeName,
  agree_terms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms" }),
  }),
});

export const forgotPasswordSchema = z.object({
  email: safeEmail,
});

export const resetPasswordSchema = z.object({
  password: strongPassword,
  confirmPassword: z.string().max(128),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// ===========================================
// Purchase Schemas
// ===========================================

export const purchaseSchema = z.object({
  plan_id: z.string().trim().min(1, "Please select a plan").max(50, "Invalid plan ID"),
  payment_method: z.enum(["card", "crypto"], {
    errorMap: () => ({ message: "Please select a payment method" }),
  }),
  email: safeEmail,
  promo_code: z.string().trim().max(20, "Promo code is too long").optional(),
});

// ===========================================
// Payout Schemas
// ===========================================

export const payoutRequestSchema = z.object({
  challenge_id: z.string().uuid("Invalid challenge ID"),
  amount: z.number().positive("Amount must be positive").max(1000000, "Amount exceeds maximum"),
  method: z.enum(["bank", "crypto"]),
  wallet_address: z.string().trim().max(100, "Wallet address is too long").optional(),
  bank_details: z.object({
    account_name: z.string().trim().max(100, "Account name is too long"),
    account_number: z.string().trim().max(34, "Account number is too long"),
    bank_name: z.string().trim().max(100, "Bank name is too long"),
    swift_code: z.string().trim().max(11, "SWIFT code is too long"),
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
  name: safeName,
  email: safeEmail,
  subject: z.string().trim().min(5, "Subject is required").max(200, "Subject is too long"),
  message: z.string().trim().min(20, "Message must be at least 20 characters").max(5000, "Message is too long"),
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

