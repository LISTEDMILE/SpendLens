import { authOptions } from "@/lib/auth";
import cloudinary from "@/lib/CloudinaryConfig";
import dbConnect from "@/lib/DbConnect";
import { SendResponse } from "@/lib/SendResponse";
import UserModel from "@/models/User";
import { getServerSession } from "next-auth";

export async function GET() {
    try {
        await dbConnect();

        const session = await getServerSession(authOptions);

        if (!session || !session.user || !session.user.id)
            return SendResponse({
                message: "Unauthorized Access",
                success: false,
                status: 401,
            });

        const id = session.user.id;

        const user = await UserModel.findById(id)
            .select("_id name avatar")
            .lean();

        if (!user)
            return SendResponse({
                message: "User not Found",
                success: false,
                status: 404,
            });

        return SendResponse({
            message: "Profile data",
            success: true,
            status: 200,
            data: user,
        });
    } catch (err) {
        console.error("Error fetching profile", err);
        return SendResponse({
            success: false,
            message: "Failed to fetch profile",
            status: 500,
        });
    }
}

export async function PATCH(request: Request) {
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

        const formData = await request.formData();

        const name = formData.get("name") as string;

        const avatar = formData.get("avatar") as File | null;

        const user = await UserModel.findById(session.user.id);

        if (!user) {
            return SendResponse({
                success: false,
                status: 404,
                message: "User not found",
            });
        }

        if(!name || name == "") return SendResponse({
                success: false,
                status: 400,
                message: "Enter your Name",
            });

        user.name = name;

        if (avatar && avatar.size > 0) {
            // Delete previous image (if uploaded by you)
            if (user.cloudinaryId) {
                try {
                    await cloudinary.uploader.destroy(user.cloudinaryId);
                } catch (err) {
                    console.error("Failed to delete old avatar:", err);
                }
            }

            const bytes = await avatar.arrayBuffer();

            const buffer = Buffer.from(bytes);

            const dataUri = `data:${avatar.type};base64,${buffer.toString("base64")}`;

            const uploaded = await cloudinary.uploader.upload(dataUri, {
                folder: "SpendLens/Profile",
            });

            user.avatar = uploaded.secure_url;
            user.cloudinaryId = uploaded.public_id;
        }

        await user.save();

        return SendResponse({
            success: true,
            status: 200,
            message: "Profile updated successfully.",
            data: {
                _id: user._id,
                name: user.name,
                avatar: user.avatar,
            },
        });
    } catch (error) {
        console.error("Update Profile Error:", error);

        return SendResponse({
            success: false,
            status: 500,
            message: "Internal Server Error",
        });
    }
}
