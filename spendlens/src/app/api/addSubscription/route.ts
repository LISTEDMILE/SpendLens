import dbConnect from "@/lib/DbConnect";
import { SendResponse } from "@/lib/SendResponse";
import { authOptions } from "@/lib/auth";
import { addSubscriptionSchema } from "@/Schemas/AddSubscriptionSchema";
import SubscriptionModel from "@/models/Subscription";
import UserModel from "@/models/User";

import { getServerSession } from "next-auth";

export async function POST(request: Request) {
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

        const body = await request.json();

        const result = addSubscriptionSchema.safeParse(body);

        if (!result.success) {
            return SendResponse({
                success: false,
                status: 400,
                message: result.error.issues[0].message,
            });
        }

        const {
            name,
            startDate,
            endDate,
            price,
            reminderDays,
            status,
            paymentMethod,
        } = result.data;

        const user = await UserModel.findById(session.user.id);

        if (!user) {
            return SendResponse({
                success: false,
                status: 404,
                message: "User not found",
            });
        }

        const subscription = await SubscriptionModel.create({
            user: user._id,
            name,
            startDate,
            endDate,
            price,
            reminderDays,
            status,
            paymentMethod,
        });

        await UserModel.findByIdAndUpdate(user._id, {
            $push: {
                subscriptions: subscription._id,
            },
        });

        return SendResponse({
            success: true,
            status: 201,
            message: "Subscription added successfully.",
        });
    } catch (error) {
        console.error("Add Subscription Error:", error);

        return SendResponse({
            success: false,
            status: 500,
            message: "Internal Server Error",
        });
    }
}

export async function PUT(request: Request) {
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

        const { searchParams } = new URL(request.url);

        const id = searchParams.get("id");
        if (!id)
            return SendResponse({
                success: false,
                status: 401,
                message: "No Subscription Id",
            });

        const body = await request.json();

        const result = addSubscriptionSchema.safeParse(body);

        if (!result.success) {
            return SendResponse({
                success: false,
                status: 400,
                message: result.error.issues[0].message,
            });
        }

        const {
            name,
            startDate,
            endDate,
            price,
            reminderDays,
            status,
            paymentMethod,
        } = result.data;

        const user = await UserModel.findById(session.user.id);

        if (!user) {
            return SendResponse({
                success: false,
                status: 404,
                message: "User not found",
            });
        }

        const subscription = await SubscriptionModel.findById(id);

        if (!subscription)
            return SendResponse({
                success: false,
                status: 404,
                message: "Subscription not found",
            });

        if (session.user.id != subscription.user._id.toString())
            return SendResponse({
                success: false,
                status: 300,
                message: "Unauthorized Access",
            });

        subscription.name = name;
        subscription.startDate = startDate;
        subscription.endDate = endDate;
        subscription.price = price;
        subscription.reminderDays = reminderDays;
        subscription.status = status;
        subscription.paymentMethod = paymentMethod;

        await subscription.save();

        return SendResponse({
            success: true,
            status: 201,
            message: "Subscription Updated successfully.",
        });
    } catch (error) {
        console.error("Add Subscription Error:", error);

        return SendResponse({
            success: false,
            status: 500,
            message: "Internal Server Error",
        });
    }
}

export async function DELETE(request: Request) {
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

        const { searchParams } = new URL(request.url);

        const id = searchParams.get("id");
        if (!id)
            return SendResponse({
                success: false,
                status: 404,
                message: "No Subscription Id",
            });

        const subscription = await SubscriptionModel.findOne({
            _id: id,
            user: session.user.id,
        });

        if (!subscription) {
            return SendResponse({
                success: false,
                status: 404,
                message: "Unauthorized Access",
            });
        }

        await UserModel.findByIdAndUpdate(session.user.id, {
            $pull: {
                subscriptions: id,
            },
        });

        await subscription.deleteOne();

        return SendResponse({
            success: true,
            status: 201,
            message: "Subscription Deleted successfully.",
        });
    } catch (error) {
        console.error("Add Subscription Error:", error);

        return SendResponse({
            success: false,
            status: 500,
            message: "Internal Server Error",
        });
    }
}
