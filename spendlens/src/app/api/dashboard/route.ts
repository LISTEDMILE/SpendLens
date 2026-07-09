import dbConnect from "@/lib/DbConnect";
import { SendResponse } from "@/lib/SendResponse";
import { authOptions } from "@/lib/auth";
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

        const subscriptions = await SubscriptionModel.find({
            user: session.user.id,
        }).lean();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let total = subscriptions.length;
        let active = 0;
        let paused = 0;
        let cancelled = 0;
        let monthlySpend = 0;

        const reminderSubscriptions: {
            id: string;
            name: string;
            price: number;
            endDate: Date;
            daysLeft: number;
        }[] = [];

        for (const subscription of subscriptions) {
            switch (subscription.status) {
                case "active":
                    active++;
                    monthlySpend += subscription.price;

                    const renewalDate = new Date(subscription.endDate);
                    renewalDate.setHours(0, 0, 0, 0);

                    const reminderDate = new Date(renewalDate);
                    reminderDate.setDate(
                        reminderDate.getDate() - subscription.reminderDays,
                    );

                    if (today >= reminderDate && today <= renewalDate) {
                        const daysLeft = Math.ceil(
                            (renewalDate.getTime() - today.getTime()) /
                                (1000 * 60 * 60 * 24),
                        );

                        reminderSubscriptions.push({
                            id: subscription._id.toString(),
                            name: subscription.name,
                            price: subscription.price,
                            endDate: subscription.endDate,
                            daysLeft,
                        });
                    }

                    break;

                case "paused":
                    paused++;
                    break;

                case "cancelled":
                    cancelled++;
                    break;
            }
        }

        reminderSubscriptions.sort(
            (a, b) =>
                new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
        );

        return SendResponse({
            success: true,
            message: "Dashboard fetched successfully.",
            status: 200,
            data: {
                stats: {
                    total,
                    active,
                    paused,
                    cancelled,
                    monthlySpend,
                },

                reminders: {
                    count: reminderSubscriptions.length,
                    subscriptions: reminderSubscriptions
                },
            },
        });
    } catch (error) {
        console.error(error);

        return SendResponse({
            success: false,
            message: "Failed to fetch dashboard.",
            status: 500,
        });
    }
}
