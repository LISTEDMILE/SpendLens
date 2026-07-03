import { z } from "zod";

export const otpSchema = z.object({
  otp: z
    .string()
    .trim()
    .length(6, { message: "OTP must be exactly 6 digits" })
    .regex(/^\d+$/, { message: "OTP must contain only numbers" }),

  username: z
    .string()
    .trim()
    .email({ message: "Invalid email address" }),
});