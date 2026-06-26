import { connectDB } from "@/lib/db";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        const body = await request.json();

        const { email, password } = body;

        await connectDB();

        const user = await UserModel.findOne({ email });

        if (!user) {
            return Response.json(
                { message:"Invalid Credentials" },
                { status: 401 }
            );
        }

        const isMatch = await bcrypt.compare( password, user.password );

        if (!isMatch) {
            return Response.json(
                { message: "Invalid Credentials"},
                { status: 401 }
            );
        }

        const token = jwt.sign(
            { userId: user._id,},

            process.env.JWT_SECRET_KEY,

            { expiresIn: "3d",}
        );

        return Response.json(
            {
                message: "Login Success",
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            },
            {
                status: 200,
            }
        )

    } catch (error) {
        return Response.json(
            { message: "Failed to login"},
            { status: 500 }
        );
    }
}