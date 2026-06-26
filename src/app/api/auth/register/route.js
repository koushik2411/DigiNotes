import { connectDB } from "@/lib/db";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {

        const body = await request.json();

        const { name, email, password } = body;

        if ( !name || !email || !password ) {
            return Response.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        await connectDB();

        // Existing User Check
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return Response.json(
                { message: "User already exists" },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash( password, 10 );

        const newUser = await UserModel.create(
            {
                name,
                email,
                password: hashedPassword,
            }
        );

        return Response.json(
            {
                message: "User Registered",
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                },
            },
            { status: 201 }
        );

    } catch (error) {
        return Response.json(
            { message: "Registration Failed" },
            { status: 500 },
        );
    }
}