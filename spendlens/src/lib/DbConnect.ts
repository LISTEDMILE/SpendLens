import mongoose from "mongoose";

type connectionObject = {
    isConnected?: number;
};

const connection: connectionObject = {};

async function dbConnect(): Promise<void> {
    if (connection.isConnected) return;

    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error("MONGODB_URI is not defined");
        }

        const db = await mongoose.connect(mongoUri);

        connection.isConnected = db.connections[0].readyState;
    } catch (err) {
        console.error("Error connecting database", err);
        throw new Error("Cannot connect to Server");
    }
}

export default dbConnect;
