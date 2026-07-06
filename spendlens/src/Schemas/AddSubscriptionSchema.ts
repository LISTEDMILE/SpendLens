import { z } from "zod";

/* ===========================
   Backend Schema (API)
=========================== */

export const addSubscriptionSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(1, "Subscription name is required")
            .max(100, "Subscription name is too long"),

        startDate: z.coerce.date({
            message: "Start date is required",
        }),

        endDate: z.coerce.date({
            message: "End date is required",
        }),

        price: z.coerce.number().positive("Price must be greater than 0"),

        reminderDays: z.coerce
            .number()
            .min(0, "Reminder days cannot be negative")
            .max(30, "Reminder days cannot exceed 30"),

        status: z.enum(["active", "cancelled", "paused"]),

        paymentMethod: z.enum([
            "Credit Card",
            "Debit Card",
            "UPI",
            "PayPal",
            "Other",
        ]),
    })
    .refine((data) => data.endDate > data.startDate, {
        message: "End date must be after the start date",
        path: ["endDate"],
    });

export type AddSubscriptionData = z.infer<typeof addSubscriptionSchema>;

/* ===========================
   Frontend Schema (Form)
=========================== */

export const addSubscriptionFormSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(1, "Subscription name is required")
            .max(100, "Subscription name is too long"),

        startDate: z.string().min(1, "Start date is required"),

        endDate: z.string().min(1, "End date is required"),

        price: z
            .string()
            .min(1, "Price is required")
            .refine((value) => !isNaN(Number(value)), {
                message: "Price must be a valid number",
            }),

        reminderDays: z
            .string()
            .min(1, "Reminder days are required")
            .refine((value) => !isNaN(Number(value)), {
                message: "Reminder days must be a valid number",
            }),

        status: z.enum(["active", "cancelled", "paused"]),

        paymentMethod: z.enum([
            "Credit Card",
            "Debit Card",
            "UPI",
            "PayPal",
            "Other",
        ]),
    })
    .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
        message: "End date must be after the start date",
        path: ["endDate"],
    });

export type AddSubscriptionFormData = z.infer<typeof addSubscriptionFormSchema>;
