import { z } from "zod";

export const otpSchema = z.object({
  

  username: z
    .string()
    .trim()
    .email({ message: "Invalid email address" }),
  
 
});