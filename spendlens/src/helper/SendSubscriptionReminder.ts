import SubscriptionReminder from "@/emailStructure/SubscriptionReminder";
import { resend } from "@/lib/Resend";
import { ApiResponse } from "@/types/ApiResponse";

interface ReminderSubscription {
    name: string;
    price: number;
    renewalDate: Date;
    reminderDays: number;
}

interface SendSubscriptionReminderProps {
    name: string;
    username: string;
    subscriptions: ReminderSubscription[];
}

export async function SendSubscriptionReminder({
    name,
    username,
    subscriptions,
}: SendSubscriptionReminderProps): Promise<ApiResponse> {
    try {
        const { error } = await resend.emails.send({
            from: "SpendLens <onboarding@resend.dev>",
            to: username,
            subject:
                subscriptions.length === 1
                    ? `${subscriptions[0].name} Subscription Reminder`
                    : `Subscription Renewal Reminder`,
            react: SubscriptionReminder({
                name,
                subscriptions,
            }),
        });

        if (error) {
            return {
                success: false,
                message: error.message,
            };
        }

        return {
            success: true,
            message: "Reminder email sent successfully.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Failed to send reminder email.",
        };
    }
}
