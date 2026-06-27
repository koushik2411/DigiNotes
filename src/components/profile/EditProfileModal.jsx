"use client";

import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

function EditProfileModal ({ user, setUser, setIsEditProfileOpen, theme }) {
    const [name, setName] = useState(user?.name || "");

    const updateUsername = async ()=> {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch("/api/user/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(
                    { name, }
                ),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            localStorage.setItem("user", JSON.stringify(data.user));

            setUser(data.user);

            setIsEditProfileOpen(false);

            toast.success("Username updated");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update Username");
        }
    }

    return (
        <motion.div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

            <div className={`w-8/12 max-w-md rounded-xl p-6 flex flex-col gap-3 justify-center items-center shadow-lg ${theme === "light" ? "bg-linear-to-b from-slate-200 to-slate-300 text-slate-900" : "bg-linear-to-b from-slate-900 to-indigo-950 text-slate-100"}`}>

                    <h2 className="text-xl font-semibold">
                        Edit Username
                    </h2>

                    <input
                        type="text"
                        value={name}
                        maxLength={35}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className=" w-full p-2 border rounded outline-0"
                    />

                    <div className=" mt-3 flex gap-3">

                        <button
                        onClick={updateUsername}
                        disabled={!name.trim() || name.trim() === user.name}
                        className={` w-18 p-2 rounded bg-linear-to-b from-emerald-500 to-emerald-600 text-white`}
                        >
                            Update
                        </button>

                        <button
                        onClick={() => setIsEditProfileOpen(false)}
                        className={` w-18 p-2 rounded bg-linear-to-b from-red-500 to-red-600 text-white`}
                        >
                            Cancel
                        </button>

                    </div>

                </div>

        </motion.div>
    )
}

export default EditProfileModal