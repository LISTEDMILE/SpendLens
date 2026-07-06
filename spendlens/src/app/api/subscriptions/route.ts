import dbConnect from "@/lib/DbConnect";
import { authOptions } from "@/lib/auth";
import { SendResponse } from "@/lib/SendResponse";
import SubscriptionModel from "@/models/Subscription";

import { getServerSession } from "next-auth";

export async function GET() {
    try {
        await dbConnect();

        const session = await getServerSession(authOptions);

        if (!session || !session.user?.id) {
            return SendResponse({
                success: false,
                status: 401,
                message: "Unauthorized",
            });
        }

        const subscriptions = await SubscriptionModel.find({
            user: session.user.id,
        })
            .select("_id name price startDate endDate reminderDays status")
            .sort({ endDate: 1 })
            .lean();

        return SendResponse({
            success: true,
            status: 200,
            message: "Subscriptions fetched successfully.",
            data: subscriptions,
        });
    } catch (error) {
        console.error("Get Subscriptions Error:", error);

        return SendResponse({
            success: false,
            status: 500,
            message: "Internal Server Error",
        });
    }
}
