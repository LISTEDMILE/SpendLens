import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/DbConnect";
import { SendResponse } from "@/lib/SendResponse";
import UserModel from "@/models/User";
import SubscriptionModel from "@/models/Subscription";
import mongoose from "mongoose";
import cloudinary from "@/lib/CloudinaryConfig";

export async function DELETE() {
    try {
        await dbConnect();

        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return SendResponse({
                success: false,
                message: "Unauthorized",
                status: 401,
            });
        }

        const user = await UserModel.findById(session.user.id);

        if (!user) {
            return SendResponse({
                success: false,
                message: "User not found",
                status: 404,
            });
        }

        // Delete all subscriptions
        await SubscriptionModel.deleteMany({
            user: new mongoose.Types.ObjectId(session.user.id),
        });

        if (user.cloudinaryId) {
            await cloudinary.uploader.destroy(user.cloudinaryId);
        }

        // Delete user
        await UserModel.findByIdAndDelete(user._id);

        return SendResponse({
            success: true,
            message: "Account deleted successfully",
            status: 200,
        });
    } catch (error) {
        console.error("Delete User Error:", error);

        return SendResponse({
            success: false,
            message: "Internal Server Error",
            status: 500,
        });
    }
}
