"use client";

import NoteCard from "./NoteCard";

function NotesGrid({ filteredNotes, color, setColor, deleteNote, setNotes, openEditModal, setSelectedNote, fetchNotes, theme }) {

    return (
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">

            {filteredNotes.map((note) => (
                <NoteCard 
                    note={note}
                    key={note._id}
                    color={color}
                    setColor={setColor}
                    deleteNote={deleteNote}
                    setNotes={setNotes}
                    setSelectedNote={setSelectedNote}
                    openEditModal={openEditModal}
                    fetchNotes={fetchNotes}
                    theme={theme}
                />
            ))}

        </div>
    )
}

export default NotesGrid