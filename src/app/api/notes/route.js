import { connectDB } from "@/lib/db";
import NoteModel from "@/models/Note";
import { verifyToken } from "@/lib/auth";

// CREATE NOTE
export async function POST(request) {
    try {
        await connectDB();

        const token = request.headers.get("authorization")?.replace("Bearer ", "");

        if (!token) {
            return Response.json(
                { message: "Unauthorized"},
                { status: 401 }
            );
        }

        const decoded = verifyToken(token);

        if (!decoded) {
            return Response.json(
                { message: "Invalid Token" },
                { status: 401 }
            );
        }

        const body = await request.json();

        const { title, content, color } = body;

        const note = await NoteModel.create(
            {
                title,
                content,
                color,
                user: decoded.userId,
            }
        );

        return Response.json(
            {
                message: "Note Created",
                note,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.log(error);

        return Response.json(
            {
                message: "Failed to create note",
            },
            {
                status: 500,
            }
        );
    }
}

// GET NOTE
export async function GET(request) {
    try {
        await connectDB();

        const token = request.headers.get("authorization")?.replace("Bearer ", "");

        const decoded = verifyToken(token);

        const notes = await NoteModel.find(
            {
                user: decoded.userId,
            }
        ). sort(
            {
                createdAt: -1,
            }
        );

        return Response.json(
            {
                notes,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        return Response.json(
            {
                message: "Failed to Fetch Notes",
            },
            {
                status: 500,
            }
        );
    }
}