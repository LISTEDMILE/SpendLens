import mongoose, { Document, Schema } from "mongoose";

export interface OTP extends Document {
    otp: string;
    username: string;
    expiresAt: Date;
}

const OtpSchema: Schema<OTP> = new Schema({
    otp: {
        type: String,
        required: [true, "OTP is Required"],
    },
    username: {
        type: String,
        unique: [true, "Only one OTP for one username"],
        required: [true, "Username is Required for OTP"],
        trim: true,
        lowercase: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        expires: 0,
    },
});

const OtpModel =
    (mongoose.models.OTP as mongoose.Model<OTP>) ||
    mongoose.model<OTP>("OTP", OtpSchema);

export default OtpModel;
