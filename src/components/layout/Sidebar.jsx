"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { toast } from "sonner";

function Sidebar({ isOpen, setIsOpen, notesCount, theme, themeToggle }) {

    const [user, setUser] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Logout
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        router.push("/login");

        toast.success("User Logged Out")
    };

    return (
        <>
            {isOpen && (
                <motion.div    
                  animate={{ x: isOpen ? 0 : 300}}
                  onClick={() => setIsOpen(false)} 
                  className="overlay fixed inset-0 bg-black/60 z-20"
                >

                    <motion.div 
                      initial={{ x: 300 }}
                      animate={{ x: 0 }}
                      exit={{ x: 300 }}
                      transition={{ duration: 0.4 }}
                      onClick={(e) => e.stopPropagation()}
                      className={` h-[90vh] w-70 p-3 flex flex-col gap-3 fixed right-3 top-12 ${theme === "light" ? "bg-slate-100 text-slate-800" : "bg-slate-800 text-slate-100"} rounded-xl shadow-lg`}
                    >

                        {/* User details div */}
                        <div className={` p-9 flex flex-col justify-center items-center gap-3 rounded-xl ${theme === "light" ? "bg-slate-300 text-slate-800" : "bg-slate-900 text-slate-100"}`}>

                            <h1 className=" h-24 w-24 p-2 rounded-full bg-gray-500 text-white flex items-center justify-center text-center font-semibold text-4xl">
                                {user.name.charAt(0)}
                            </h1>

                            <h2 className=" text-lg font-semibold">
                                {user?.name}
                            </h2>

                            <h2>
                                {user?.email}
                            </h2>
                        </div>

                        <div className=" h-0.5 w-[96%] bg-slate-400 self-center rounded-2xl"></div>

                        {/* Notes count */}
                        <div className={` w-full p-3 text-center rounded`}>
                            Total Notes: <span className=" text-blue-500 font-semibold">{notesCount}</span>
                        </div>

                        <div className=" h-0.5 w-[96%] bg-slate-400 self-center rounded-2xl"></div>

                        {/* Buttons list */}
                        <div className=" mt-5 flex flex-col gap-3">

                            <button className={` w-full p-3 text-center rounded ${theme === "light" ? "bg-slate-300/40 text-slate-800" : "bg-slate-900/30 text-slate-100"}`}>Edit username</button>

                            <button className={` w-full p-3 text-center rounded ${theme === "light" ? "bg-slate-300/40 text-slate-800" : "bg-slate-900/30 text-slate-100"}`}>Reset Password</button>

                            <button 
                              onClick={themeToggle}
                              className={` w-full p-3 flex items-center gap-2 justify-center rounded ${theme === "light" ? "bg-slate-300/40 text-slate-800" : "bg-slate-900/30 text-slate-100"}`}
                            >
                                Appearance {theme === "dark" ? <FaSun/> : <FaMoon/>}
                            </button>

                            <div className={` h-0.5 w-[96%] mt-5 bg-slate-400 self-center rounded-2xl`}></div>

                            <button
                              onClick={logout}
                              className={` w-full mt-5 p-3 text-red-500 text-center rounded ${theme === "light" ? "bg-slate-300/40" : "bg-slate-900/40"}`}
                            >
                                Logout
                            </button>

                        </div>

                    </motion.div>

                </motion.div>
            )}
        </>
        
    )
}

export default Sidebar