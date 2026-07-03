import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
    username: string;
    password: string;
    verifyCode: string | null;
    subscriptions: mongoose.ObjectId[];
    name: string;
    avatar: string;
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is Required"],
        unique: [true, "Username should be unique"],
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter valid Email"],
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
    },
    verifyCode: {
        type: String,
        default: null,
    },
    subscriptions: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "Subscription",
            },
        ],
        default: [],
    },
    name: {
        type: String,
        required: [true, "Name is Required"],
        trim: true,
    },
    avatar: {
        type: String,
        default: null,
    },
});

const UserModel =
    (mongoose.models.User as mongoose.Model<User>) ||
    mongoose.model<User>("User", UserSchema);

export default UserModel;