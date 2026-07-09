import dbConnect from "@/lib/DbConnect";
import { authOptions } from "@/lib/auth";
import { SendResponse } from "@/lib/SendResponse";
import SubscriptionModel from "@/models/Subscription";

import { getServerSession } from "next-auth";

export async function GET() {
    try {
        await dbConnect();

        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return SendResponse({
                success: false,
                message: "Unauthorized",
                status: 401,
            });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const subscriptions = await SubscriptionModel.find({
            user: session.user.id,
            status: "active",
        }).lean();

        const reminders = subscriptions
            .map((subscription) => {
                const renewalDate = new Date(subscription.endDate);
                renewalDate.setHours(0, 0, 0, 0);

                const reminderDate = new Date(renewalDate);
                reminderDate.setDate(
                    reminderDate.getDate() - subscription.reminderDays,
                );

                const daysLeft = Math.ceil(
                    (renewalDate.getTime() - today.getTime()) /
                        (1000 * 60 * 60 * 24),
                );

                // Upcoming (inside reminder window)
                if (today >= reminderDate && daysLeft >= 0) {
                    return {
                        id: subscription._id,
                        name: subscription.name,
                        price: subscription.price,
                        endDate: subscription.endDate,
                        daysLeftOrDue: daysLeft,
                        areDaysLeftOrDue: "left" as const,
                    };
                }

                // Overdue
                if (daysLeft < 0) {
                    return {
                        id: subscription._id,
                        name: subscription.name,
                        price: subscription.price,
                        endDate: subscription.endDate,
                        daysLeftOrDue: Math.abs(daysLeft),
                        areDaysLeftOrDue: "due" as const,
                    };
                }

                return null;
            })
            .filter(Boolean)
            .sort((a: any, b: any) => {
                const aDue = a.areDaysLeftOrDue === "due";
                const bDue = b.areDaysLeftOrDue === "due";

                // Overdue first
                if (aDue && !bDue) return -1;
                if (!aDue && bDue) return 1;

                // Then nearest renewal
                return (
                    new Date(a.endDate).getTime() -
                    new Date(b.endDate).getTime()
                );
            });

        return SendResponse({
            success: true,
            message: "Upcoming renewals fetched successfully.",
            status: 200,
            data: {
                count: reminders.length,
                subscriptions: reminders.slice(0, 3),
            },
        });
    } catch (error) {
        console.error(error);

        return SendResponse({
            success: false,
            message: "Failed to fetch upcoming renewals.",
            status: 500,
        });
    }
}