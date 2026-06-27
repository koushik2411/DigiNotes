import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import UserModel from "@/models/User";

export async function PUT(request) {
    try {
        await connectDB();

        const token = request.headers.get("authorization")?.replace("Bearer ", "");

        // Get Token
        if (!token) {
            return Response.json(
                {
                    message: "Unauthorized"
                },
                {
                    status: 401
                }
            );
        }

        // Verify Token
        const decoded = verifyToken(token);

        if (!decoded) {
            return Response.json(
                {
                    message: "Invalid Token"
                },
                {
                    status: 401
                }
            );
        }

        // Get Body
        const body = await request.json();

        const { name } = body;

        if (!name || !name.trim()) {
            return Response.json(
                {
                    message: "Name is required"
                },
                {
                    status: 400
                }
            );
        }

        // Find User
        const user = await UserModel.findById(decoded.userId);

        if (!user) {
            return Response.json(
                {
                    message: "User not found"
                },
                {
                    status: 404
                }
            );
        }

        // Update
        user.name = name.trim();

        await user.save();

        return Response.json(
            {
                message: "Profile updated successfully",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                message: "Failed to update profile"
            },
            {
                status: 500
            }
        );
    }
}