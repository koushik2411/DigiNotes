"use client";

import { FaBars } from "react-icons/fa";
import SearchBar from "../notes/SearchBar";

function Header({ setIsOpen, theme, searchText, setSearchText }) {

    return (
        <header className={` w-full h-10 p-3 py-6 flex justify-between items-center fixed top-0 left-0 z-10 ${theme === "light" ? "bg-linear-to-b from-slate-200 to-slate-100 text-slate-800" : "bg-linear-to-b from-indigo-950 to-slate-900 text-slate-100"}`}>
            
            {/* LOGO */}
            <h2 className=" font-bold text-lg border-b-2">
                Digi<span>Notes</span>
            </h2>

            {/* SEARCH BAR */}
            <SearchBar
                searchText={searchText}
                setSearchText={setSearchText}
                theme={theme}
            />

            {/* SIDEBAR BUTTON */}
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className=" p-2 cursor-pointer border-2 rounded-lg"
            >
                <FaBars/>
            </button>

        </header>
    )
}

export default Header