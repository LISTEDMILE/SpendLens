import { SendSubscriptionReminder } from "@/helper/SendSubscriptionReminder";
import dbConnect from "@/lib/DbConnect";
import SubscriptionModel from "@/models/Subscription";

export async function GET(request: Request) {
    try {
        const auth = request.headers.get("authorization");

        if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
            return Response.json(
                { success: false, message: "Unauthorized" },
                { status: 401 },
            );
        }
        await dbConnect();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const subscriptions = await SubscriptionModel.find({
            status: "active",
        }).populate("user");

        const reminderMap = new Map<
            string,
            {
                name: string;
                username: string;
                subscriptions: {
                    name: string;
                    price: number;
                    renewalDate: Date;
                    reminderDays: number;
                }[];
            }
        >();

        for (const subscription of subscriptions) {
            const user = subscription.user as any;

            if (!user) continue;

            const renewalDate = new Date(subscription.endDate);
            renewalDate.setHours(0, 0, 0, 0);

            const reminderDate = new Date(renewalDate);
            reminderDate.setDate(
                reminderDate.getDate() - subscription.reminderDays,
            );

            // Only send reminders during the reminder window
            if (today >= reminderDate && today <= renewalDate) {
                if (!reminderMap.has(user._id.toString())) {
                    reminderMap.set(user._id.toString(), {
                        name: user.name,
                        username: user.username,
                        subscriptions: [],
                    });
                }

                reminderMap.get(user._id.toString())!.subscriptions.push({
                    name: subscription.name,
                    price: subscription.price,
                    renewalDate,
                    reminderDays: subscription.reminderDays,
                });
            }
        }

        // Send one email per user
        for (const [, reminder] of reminderMap) {
            await SendSubscriptionReminder({
                name: reminder.name,
                username: reminder.username,
                subscriptions: reminder.subscriptions,
            });
        }

        return Response.json(
            {
                success: true,
                message: "Subscription reminders processed successfully.",
            },
            {
                status: 200,
            },
        );
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                success: false,
                message: "Failed to process subscription reminders.",
            },
            {
                status: 500,
            },
        );
    }
}
