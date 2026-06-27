"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import AddNoteModal from "@/components/notes/AddNoteModal";
import EditNoteModal from "@/components/notes/EditNoteModal";
import NotesGrid from "@/components/notes/NotesGrid";
import EditProfileModal from "@/components/profile/EditProfileModal";
import Loader from "@/components/ui/Loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { LuNotebookPen } from "react-icons/lu";
import { toast } from "sonner";

function Home({ openEditModal }) {

  const router = useRouter();

  // ---------- STATES ----------

  // Theme
  const [theme, setTheme] = useState("light");

  // Sidebar
  const [isOpen, setIsOpen] = useState(false);

  // Search bar
  const [searchText, setSearchText] = useState("");

  // Note Modal
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Note Card bg color
  const noteCardDefaultBg = theme === "light" ? "#e2e8f0" : "#1d293d"
  const [color, setColor] = useState(noteCardDefaultBg);

  // Edit Modal
  const [selectedNote, setSelectedNote] = useState(null);

  // Loader
  const [loading, setLoading] = useState(true);

  // Username Edit Modal
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Filtered Notes
  const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(searchText.toLowerCase()));


  //Get notes
  const fetchNotes = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch("/api/notes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      setNotes(data.notes);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);


  // Get theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
    }
  },[])

  const themeToggle = () => {
    setTheme(prev => prev === "light" ? "dark" : "light")
  }

  // User
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
  }, []);

  // Set theme
  useEffect(() => {
    localStorage.setItem("theme", theme);
  },[theme]);

  // Token for login
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
    }
  },[]);

  return (
    <div className={` w-full min-h-screen p-3 flex flex-col gap-3 ${theme === "light" ? "bg-linear-to-b from-slate-100 to-slate-200 text-slate-900" : "bg-linear-to-b from-slate-900 to-indigo-950 text-slate-100"}`}>

      <Header 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setSearchText={setSearchText}
        theme={theme}
      />

      <aside>
        <Sidebar 
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          filteredNotes={filteredNotes}
          notesCount={filteredNotes.length}
          theme={theme}
          themeToggle={themeToggle}
          setIsEditProfileOpen={setIsEditProfileOpen}
        />
      </aside>

      {/* -------------------------------------- */}

      {/* Notes Grid with heading */}
      <section className=" w-full max-w-420 mt-7 flex flex-col justify-center self-center">

        <div className=" mb-3 p-1 text-lg flex items-center gap-3 border-b">

          <h2 className=" font-semibold">
            <span className=" text-blue-500 font-bold">{user?.name}</span>'s Notes
          </h2>

          <LuNotebookPen/>

        </div>

        {/* Notes Grid */}
        <div>
          
          {loading ? (
            <Loader/>
          ) : filteredNotes.length === 0 ? (
            <div className=" pt-50 flex flex-col items-center justify-center gap-3">

              <h2 className=" text-xl font-semibold">
                No notes found
              </h2>

              <p className=" text-slate-500">
                Create your first note.
              </p>

            </div>
          ) : (
            <NotesGrid
              color={color}
              setColor={setColor}
              filteredNotes={filteredNotes}
              setNotes={setNotes}
              setSelectedNote={setSelectedNote}
              openEditModal={openEditModal}
              fetchNotes={fetchNotes}
              theme={theme}
            />
          )}
        </div>

      </section>
      {/* -------------------------------------- */}

      {/* Add Note Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className=" h-12 w-32 py-2 px-4 flex items-center justify-center gap-2 fixed bottom-10 right-6 rounded-lg bg-linear-to-b from-blue-400 to-indigo-600 text-slate-50 shadow-lg z-0"
      >
        Add Note <FaPenToSquare/>
      </button>
      {/* -------------------------------------- */}

      {/* Add Note Modal */}
      { isModalOpen && (
        <AddNoteModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setNotes={setNotes}
          fetchNotes={fetchNotes}
          color={color}
          setColor={setColor}
          theme={theme}
        />
      )}

      {/* Edit Note Modal */}
      { selectedNote && (
        <EditNoteModal
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          setNotes={setNotes}
          fetchNotes={fetchNotes}
          theme={theme}
        />
      )}

      {/* Edit Username Modal */}
      { isEditProfileOpen && (
        <EditProfileModal
          user={user}
          setUser={setUser}
          theme={theme}
          setIsEditProfileOpen={setIsEditProfileOpen}
        />
      )}
      
    </div>
  )
}

export default Home