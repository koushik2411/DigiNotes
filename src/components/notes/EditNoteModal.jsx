"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "sonner";

function EditNoteModal({ selectedNote, setSelectedNote, fetchNotes, theme }) {

    const [title, setTitle] = useState(selectedNote.title);
    const [content, setContent] = useState(selectedNote.content);
    const [color, setColor] = useState(selectedNote.color);
    const [lengthColor, setLengthColor] = useState("#000000");

    // Length color
    useEffect(()=> {
        if (title.length > 0 && title.length <=74) {
            setLengthColor("#16a34a");
        } else if (title.length >=75 && title.length <= 90) {
            setLengthColor("#ea580c");
        } else if (title.length >=91) {
            setLengthColor("#ff0000");
        } else {
            setLengthColor("#111111");
        }
    },[title]);

    const updateNote = async() => {
        const updatedNote = {
            ...selectedNote,
            title,
            content,
            color
        }

        const token = localStorage.getItem("token");

        const res = await fetch(`/api/notes/${selectedNote._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(
                {
                    title,
                    content,
                    color,
                }
            ),
        })

        const data = await res.json();

        if (!res.ok) {
            toast.error(data.message);
            return;
        }

        await fetchNotes();

        toast.success("Note Updated")

        setSelectedNote(null);
    }
    
    return (
        <motion.div
          className=" fixed top-0 left-0 min-h-screen w-full flex justify-center items-center bg-black/40 z-20"
        >

            <form
              onClick={(e) => e.stopPropagation()}
              className=" h-[90vh] w-[88vw] max-w-220 p-3 flex flex-col justify-start items-center gap-3 text-slate-800 rounded-lg"
              style={{ backgroundColor: color}}
            >

                <div className=" w-full relative flex">

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Add Title"
                        maxLength={100}
                        className={` w-full p-2 pr-7.5 font-semibold outline-0 rounded ${theme === "light" ? "bg-slate-50 text-slate-800" : "bg-slate-800 text-slate-100"}`}
                    />

                    <p 
                      className={` absolute right-1.5 top-3.5 text-xs z-10 rounded ${title.length === 100 ? " font-semibold animate-bounce text-red-600" : ""}`}
                      style={{ color: lengthColor}}
                    >
                        {title.length}
                    </p>

                </div>

                <textarea
                    placeholder="Add Note"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className={` h-full w-full p-2 resize-none outline-0 rounded overflow-y-auto ${theme === "light" ? "bg-slate-50 text-slate-800" : "bg-slate-800 text-slate-100"}`}
                />

                {/* Buttons Div */}
                <div className=" w-full flex items-center justify-center gap-3">

                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className=" h-7 w-7 p-3 bg-[linear-gradient(to_right,#4b0082,#8f00ff,#0000ff,#00ff00,#ffff00,#ff7f00,#ff0000)] rounded-full border border-white"
                    />

                    <button
                      type="button"
                      disabled={ title.length === 0 || content.length === 0}
                      onClick={updateNote}
                      className=" w-18 p-1 bg-linear-to-b from-green-500 to-green-600 text-center text-slate-50 rounded"
                    >
                        Save
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {e.stopPropagation(); setSelectedNote(null)}}
                      className=" p-1 w-18 bg-linear-to-b from-red-500/90 to-red-600 text-center text-slate-50 rounded"
                    >
                        Close
                    </button>
                </div>

            </form>

        </motion.div>
    )
}

export default EditNoteModal