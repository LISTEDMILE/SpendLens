import dbConnect from "@/lib/DbConnect";
import { SendResponse } from "@/lib/SendResponse";
import OtpModel from "@/models/OtpSchema";
import UserModel from "@/models/User";
import { signUpSchema } from "@/Schemas/SignUpSchema";
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

        const result = signUpSchema.safeParse(body);

       

        if (!result.success) {
            return SendResponse({
                success: false,
                message: result.error.issues[0].message,
                status: 400,
            });
        }

        const { username, name, password, otp } = result.data;


        const existingUser = await UserModel.findOne({ username });
        if (existingUser)
            return SendResponse({
                success: false,
                message: "Username already register",
                status: 400,
            });

        const findOtp = await OtpModel.findOne({ username }).select("otp");
        if (!findOtp)
            return SendResponse({
                success: false,
                message: "Enter valid OTP",
                status: 400,
            });
        const validOtp = await bcrypt.compare(otp, findOtp.otp);

        if (!validOtp)
            return SendResponse({
                success: false,
                message: "Enter valid OTP",
                status: 400,
            });

        const hashedPass = await bcrypt.hash(password, 10);

        const user = new UserModel({
            username,
            password: hashedPass,
            name,
        });

        await user.save();
        await OtpModel.deleteOne({ username });

        return SendResponse({
            success: true,
            message: "Account created successfully",
            status: 201,
        });
    } catch (err) {
        console.error(err, "Error Signing Up");
        return SendResponse({
            success: false,
            message: "Server Error",
            status: 500,
        });
    }
}
