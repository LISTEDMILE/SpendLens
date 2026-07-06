import mongoose, { Types, Schema, Document } from "mongoose";

export interface Subscription extends Document {
    startDate: Date;
    endDate: Date;
    name: string;
    price: number;
    reminderDays: number;
    status: string;
    paymentMethod: string;
    user: Types.ObjectId;
}

const SubscriptionSchema: Schema<Subscription> = new Schema({
    startDate: {
        type: Date,
        required: [true, "Start Date is Required"],
    },
    endDate: {
        type: Date,
        required: [true, "End Date is Required"],
    },
    name: {
        type: String,
        trim: true,
        required: [true, "Name of Subscription is Required"],
    },
    price: {
        type: Number,
    },
    reminderDays: {
        type: Number,
        required: [true, "Reminder Days are Required"],
    },
    status: {
        type: String,
        required: [true, "Status is Required"],
        enum: ["active", "cancelled", "paused"],
        default: "active",
    },
    paymentMethod: {
        type: String,
        enum: ["Credit Card", "Debit Card", "UPI", "PayPal", "Other"],
    },
    user: {
        type: Types.ObjectId,
        ref: "User",
    },
});

const SubscriptionModel =
    (mongoose.models.Subscription as mongoose.Model<Subscription>) ||
    mongoose.model<Subscription>("Subscription", SubscriptionSchema);

export default SubscriptionModel;
