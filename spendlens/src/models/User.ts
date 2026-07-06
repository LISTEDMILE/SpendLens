import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
    username: string;
    password?: string;
    subscriptions: mongoose.ObjectId[];
    name: string;
    avatar: string;
    cloudinaryId: string;
    provider: string;
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is Required"],
        unique: [true, "Username should be unique"],
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter valid Email"],
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
    cloudinaryId: {
        type: String,
    
    },
    password: {
        type: String,
        required: function () {
            return this.provider === "credentials";
        },
    },

    provider: {
        type: String,
        enum: ["credentials", "google", "github"],
        default: "credentials",
        required: true,
    },
});

const UserModel =
    (mongoose.models.User as mongoose.Model<User>) ||
    mongoose.model<User>("User", UserSchema);

export default UserModel;
