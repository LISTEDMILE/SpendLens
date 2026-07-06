import { SendOtp } from "@/helper/ResendMailOtp";
import dbConnect from "@/lib/DbConnect";
import { SendResponse } from "@/lib/SendResponse";
import OtpModel from "@/models/OtpSchema";
import { otpSchema } from "@/Schemas/OtpSchema";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        await dbConnect();

        let body;

        try {
            body = await request.json();
        } catch {
            return SendResponse({
                success: false,
                message: "Invalid or missing JSON body",
                status: 400,
            });
        }

        const result = otpSchema.safeParse(body);

        if (!result.success) {
            return SendResponse({
                success: false,
                message: result.error.issues[0].message,
                status: 400,
            });
        }

        const { username } = result.data;

        await OtpModel.findOneAndDelete({ username });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const hashedOtp = await bcrypt.hash(otp, 10);

        const newOtp = new OtpModel({
            otp: hashedOtp,
            username: username,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
        });

        await newOtp.save();

        const sendTheOtp = await SendOtp(username, otp);

        if (!sendTheOtp.success)
            return SendResponse({
                success: false,
                message: "Error Sending OTP",
                status: 400,
            });

        return SendResponse({
            success: true,
            message: "OTP sent successfully",
            status: 200,
        });
    } catch (err) {
        console.error("Error sending OTP", err);
        return SendResponse({
            success: false,
            message: "Unable to send OTP",
            status: 500,
        });
    }
}
