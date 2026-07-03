import { z } from "zod";

export const signUpSchema = z.object({
    username: z.string().trim().email({ message: "Invalid Email Address" }),

    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(12, { message: "Password cannot exceed 12 characters" })
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
            "Password must contain an uppercase letter, a lowercase letter, and a number",
        ),

    name: z
        .string()
        .trim()
        .min(2, { message: "Name must be at least 2 characters" })
        .max(15, { message: "Name cannot exceed 15 characters" }),

    avatar: z
        .string()
        .url({ message: "Avatar must be a valid URL" })
        .optional()
        .or(z.literal("")),
});
