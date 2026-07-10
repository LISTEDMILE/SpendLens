import { z } from "zod";

export const signUpSchema = z
    .object({
        username: z.string().trim().email({ message: "Invalid Email Address" }),

        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" })
            .max(12, { message: "Password cannot exceed 12 characters" })
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
                message:
                    "Password must contain an uppercase letter, a lowercase letter, and a number",
            }),

        confirmPassword: z.string(),

        name: z
            .string()
            .trim()
            .min(2, { message: "Name must be at least 2 characters" })
            .max(15, { message: "Name cannot exceed 15 characters" }),
        
        // otp resend ..................................

        // otp: z
        //     .string()
        //     .trim()
        //     .length(6, { message: "OTP must be exactly 6 digits" })
        //     .regex(/^\d+$/, { message: "OTP must contain only numbers" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });
