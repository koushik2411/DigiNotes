"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import AddNoteModal from "@/components/notes/AddNoteModal";
import EditNoteModal from "@/components/notes/EditNoteModal";
import NotesGrid from "@/components/notes/NotesGrid";
import SearchBar from "@/components/notes/SearchBar";
import Loader from "@/components/ui/Loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
      router.push("/login");
    }
  },[]);

  return (
    <div className={` w-full min-h-screen p-3 flex flex-col gap-3 ${theme === "light" ? "bg-slate-100 text-slate-800" : "bg-slate-800 text-slate-100"}`}>

      <Header 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
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
        />
      </aside>
      
      {/* -------------------------------------- */}
        {/* Search Bar */}
        <div className=" w-10/12 max-w-420 mt-10 my-3 p-1 rounded-lg self-center">

          <SearchBar 
            searchText={searchText}
            setSearchText={setSearchText}
            theme={theme}
          />
        </div>

      {/* -------------------------------------- */}

      {/* Separator */}
      <div className=" h-1 w-[96vw] max-w-420 bg-slate-400 self-center rounded-2xl"></div>
      {/* -------------------------------------- */}

      {/* Notes Grid with heading */}
      <section className=" w-full max-w-420 flex flex-col justify-center self-center">

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
        className=" h-12 w-32 py-2 px-4 fixed bottom-10 right-6 rounded-lg bg-blue-500 text-slate-50 shadow-lg z-0"
      >
        Add Note
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
      
    </div>
  )
}

export default Home