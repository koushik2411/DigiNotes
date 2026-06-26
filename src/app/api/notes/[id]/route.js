import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import NoteModel from "@/models/Note";

// UPDATE NOTE
export async function PUT(request, {params}) {
    try {
        await connectDB();

        const token = request.headers.get("authorization")?.replace("Bearer ", "");

        const decoded = verifyToken(token);

        if (!decoded) {
            return Response.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = await params;

        const body = await request.json();

        const { title, content, color } = body;

        const note = await NoteModel.findOne(
            {
                _id: id,
                user: decoded.userId,
            }
        );

        if (!note) {
            return Response.json(
                {
                    message: "Note not found",
                },
                {
                    status: 404,
                }
            );
        }

        note.title = title;
        note.content = content;
        note.color = color;

        await note.save();

        return Response.json(
            {
                message: "Note Updated",
                note,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        return Response.json(
            {
                message: "Failed to Update Note",
            },
            {
                status: 500,
            }
        );
    }
}

// DELETE NOTE
export async function DELETE(request, { params }) {
    try {
        await connectDB();

        const token = request.headers.get("authorization")?.replace("Bearer ", "");

        const decoded = verifyToken(token);

        if (!decoded) {
            return Response.json(
                {
                    message: "Unauthorized",
                },
                {
                    status: 401,
                }
            );
        }

        const { id } = await params;

        const deletedNote = await NoteModel.findOneAndDelete(
            {
                _id: id,
                user: decoded.userId,
            }
        );

        if (!deletedNote) {
            return Response.json(
                {
                    message: "Note not found",
                },
                {
                    status: 404,
                }
            );
        }

        return Response.json(
            {
                message: "Note Deleted",
            },
            {
                status: 201,
            }
        );

    } catch (error) {
        return Response.json(
            {
                message: "Failed to delete note",
            },
            {
                status: 500,
            }
        );
    }
}