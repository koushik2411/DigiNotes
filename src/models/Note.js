import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },

        content: {
            type: String,
            required: true,
        },

        color: {
            type: String,
            default: "#eeeeee",
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },

    {
        timestamps: true,
    }
)

const NoteModel = mongoose.models.Note || mongoose.model("Note", noteSchema);

export default NoteModel;