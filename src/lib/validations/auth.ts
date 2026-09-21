import { z } from "zod";
import { normalizePhone } from "@/lib/phone";

export const signUpSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || normalizePhone(v) !== null, "Enter a valid US phone number"),
  password: z.string().min(8, "Use at least 8 characters"),
  ageConfirmed: z
    .boolean()
    .refine((confirmed) => confirmed, "Confirm that you are at least 13 years old"),
  termsAccepted: z
    .boolean()
    .refine((accepted) => accepted, "Accept the Terms of Service to continue"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  identifier: z.string().trim().min(3, "Enter your email or phone number"),
  password: z.string().min(1, "Enter your password"),
});

export type LoginInput = z.infer<typeof loginSchema>;
