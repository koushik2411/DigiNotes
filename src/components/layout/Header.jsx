"use client";

import { FaBars } from "react-icons/fa";

function Header({ setIsOpen, theme }) {

    return (
        <header className={` w-full h-10 p-4 py-6 flex justify-between items-center fixed top-0 left-0 z-10 ${theme === "light" ? "bg-slate-100 text-slate-800" : "bg-slate-800 text-slate-100"}`}>
            
            {/* LOGO */}
            <h2 className=" font-bold text-lg border-b-2">
                Digi<span>Notes</span>
            </h2>

            {/* SIDEBAR BUTTON */}
            <button
                onClick={() => setIsOpen(prev => !prev)}
            >
                <FaBars/>
            </button>

        </header>
    )
}

export default Header