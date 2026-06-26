import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export async function connectDB() {

    if (mongoose.connection.readyState >=1) {
        return;
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log("Database Connected");
        
    } catch (error) {
        console.error("Database NOT Connected");
        throw error;
    }
};