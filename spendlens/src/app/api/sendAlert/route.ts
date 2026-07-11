import { SendSubscriptionReminder } from "@/helper/SendSubscriptionReminder";
import dbConnect from "@/lib/DbConnect";
import SubscriptionModel from "@/models/Subscription";

export async function GET(request: Request) {
    try {
        const auth = request.headers.get("authorization");

        if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
            return Response.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 },
            );
        }

        await dbConnect();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const subscriptions = await SubscriptionModel.aggregate([
            {
                $match: {
                    status: "active",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $unwind: "$user",
            },
            {
                $project: {
                    name: 1,
                    price: 1,
                    endDate: 1,
                    reminderDays: 1,
                    "user._id": 1,
                    "user.name": 1,
                    "user.username": 1,
                },
            },
        ]);

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
            const renewalDate = new Date(subscription.endDate);
            renewalDate.setHours(0, 0, 0, 0);

            const reminderDate = new Date(renewalDate);
            reminderDate.setDate(
                reminderDate.getDate() - subscription.reminderDays
            );

            if (today < reminderDate || today > renewalDate) continue;

            const userId = subscription.user._id.toString();

            if (!reminderMap.has(userId)) {
                reminderMap.set(userId, {
                    name: subscription.user.name,
                    username: subscription.user.username,
                    subscriptions: [],
                });
            }

            reminderMap.get(userId)!.subscriptions.push({
                name: subscription.name,
                price: subscription.price,
                renewalDate,
                reminderDays: subscription.reminderDays,
            });
        }

        await Promise.all(
            [...reminderMap.values()].map((reminder) =>
                SendSubscriptionReminder({
                    name: reminder.name,
                    username: reminder.username,
                    subscriptions: reminder.subscriptions,
                })
            )
        );

        return Response.json(
            {
                success: true,
                message: "Subscription reminders processed successfully.",
            },
            {
                status: 200,
            }
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
            }
        );
    }
}
