import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().trim().email({ message: "Invalid email address" }),

    password: z.string().min(1, { message: "Password is required" }),
});
