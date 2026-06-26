"use client";

import { motion } from "framer-motion";
import { toast } from "sonner";

function NoteCard({ note, id, setSelectedNote, fetchNotes }) {

    const openEditModal = (note) => {
        setSelectedNote(note);
    }

    const deleteNote = async(id) => {

        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`/api/notes/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            await fetchNotes();

            toast.success("Note Deleted successfully");

        } catch (error) {
            console.error(error);
            toast.error("Failed to delete note");
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50}}
            whileInView={{ opacity: 1, y: 0}}
            whileHover={{ scale: 1.02, boxShadow: "0 4px 16px #777" }}
            transition={{ duration: 0.35, ease: "easeInOut"}}
            key={id}
            className=" p-3 flex flex-col justify-between gap-3 rounded-lg shadow text-slate-800"
            style={{ backgroundColor: note.color}}
        >
            {/* Content */}
            <div className=" h-42 md:h-45 lg:h-55 p-1.5 border border-slate-300 rounded overflow-hidden">
                <p className=" text-sm">
                    {note.content}
                </p>
            </div>

            {/* Details Div */}
            <div className=" flex flex-col gap-1">
                <h1 className=" max-w-full overflow-hidden font-semibold text-lg">
                    {note.title}
                </h1>

                <h3 className=" text-xs">
                    {new Date(note.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </h3>
            </div>

            {/* Buttons Div */}
            <div className=" mt-3 flex items-center justify-center gap-3">

                <button 
                  onClick={() => openEditModal(note)}
                  className=" w-18 p-1 bg-linear-to-b from-yellow-400 to-yellow-500 text-center text-slate-50 rounded"
                >
                    Edit
                </button>

                <button 
                  onClick={() => deleteNote(note._id)}
                  className=" w-18 p-1 bg-linear-to-b from-red-500 to-red-600 text-center text-slate-50 rounded"
                >
                    Delete
                </button>
            </div>
        </motion.div>
    )
}

export default NoteCard