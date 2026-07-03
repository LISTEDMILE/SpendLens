import { z } from "zod";

export const addSubscriptionSchema = z.object({
    startDate: z.date({
        message: "Start Date is required",
    }),

    endDate: z.date({
        message: "End Date is required",
    }),

    name: z
        .string()
        .trim()
        .min(1, { message: "Subscription name is required" })
        .max(100, { message: "Subscription name is too long" }),

    price: z.number({
        message: "Price is required",
    }),
    reminderDays: z.number({
        message: "Reminder days are required",
    }),
    status: z.enum(["active", "cancelled", "paused"], {
        message: "Invalid subscription status",
    }),

    paymentMethod: z.enum(
        ["Credit Card", "Debit Card", "UPI", "PayPal", "Other"],
        {
            message: "Invalid payment method",
        },
    ),

    user: z.string().min(1, { message: "User ID is required" }),
});
