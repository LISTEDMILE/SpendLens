import mongoose from "mongoose";
import { getServerSession } from "next-auth";

import dbConnect from "@/lib/DbConnect";
import { SendResponse } from "@/lib/SendResponse";

import SubscriptionModel from "@/models/Subscription";
import { authOptions } from "@/lib/auth";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
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

        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return SendResponse({
                success: false,
                status: 400,
                message: "Invalid subscription id.",
            });
        }

        const subscription = await SubscriptionModel.findOne({
            _id: id,
            user: session.user.id,
        }).lean();

        if (!subscription) {
            return SendResponse({
                success: false,
                status: 404,
                message: "Subscription not found.",
            });
        }

        return SendResponse({
            success: true,
            status: 200,
            message: "Subscription fetched successfully.",
            data: subscription,
        });
    } catch (error) {
        console.error("Get Subscription Error:", error);

        return SendResponse({
            success: false,
            status: 500,
            message: "Internal Server Error",
        });
    }
}
