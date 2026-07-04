import OtpEmail from "@/emailStructure/otp";
import { resend } from "@/lib/Resend";
import { ApiRespone } from "@/types/ApiResponse";

export async function SendOtp(
    otp: string,
    username: string,
): Promise<ApiRespone> {
    try {
        const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: username,
            subject: "SpendLens Verification Code",
            react: OtpEmail({ otp }),
        });

        if (error)
            return {
                success: false,
                message: error.message,
            };
        else
            return {
                success: true,
                message: "OTP sent successfully",
            };
    } catch (err) {
        console.error(err, "Error sending OTP by Resend");
        return {
            success: false,
            message: "Error sending OTP",
        };
    }
}
