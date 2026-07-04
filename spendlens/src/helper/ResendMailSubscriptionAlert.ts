import SubscriptionAlert from "@/emailStructure/subscriptionAlert";
import { resend } from "@/lib/Resend";
import { ApiRespone } from "@/types/ApiResponse";

interface SubscriptionAlertProps {
    name: string;
    subscriptionName: string;
    price: number;
    renewalDate: Date;
    reminderDays: number;
    username: string;
}

export async function SendSubscriptionAlert({
    name,
    subscriptionName,
    price,
    renewalDate,
    reminderDays,
    username,
}: SubscriptionAlertProps): Promise<ApiRespone> {
    try {
        const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: username,
            subject: "SpendLens Subscription Alert",
            react: SubscriptionAlert({
                name,
                subscriptionName,
                price,
                renewalDate,
                reminderDays,
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
            message: "Subscription Alert Sent Successfully",
        };
    } catch (err) {
        console.error("Error send Subscription Alert", err);
        return {
            success: false,
            message: "Failed to send Subscription Alert",
        };
    }
}
