"use client";

import Header from "@/components/layout/Header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaBookReader } from "react-icons/fa";
import { toast } from "sonner";

function Register() {

    const [isOpen, setIsOpen] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        name, 
                        email,
                        password,
                    }
                ),
            });

            if (!name || !email || !password) {
                toast.warning("Please fill all the fields");
                return;
            }

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            toast.success("Registration Successful");

            router.push("/login");

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={` w-full min-h-screen p-3 flex justify-center items-center gap-3 bg-slate-100`}>

            <Header
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />

            <div className={` w-11/12 md:w-10/12 p-3 rounded-lg bg-slate-100 text-slate-800`}>

                {/* Icon div */}
                <div className=" w-full mb-7 text-9xl flex justify-center items-center text-slate-800">
                    <FaBookReader/>
                </div>

                {/* Form div */}
                <div className=" w-full p-3 flex flex-col gap-6">

                    <form
                      onSubmit={handleRegister}
                      className=" flex flex-col gap-3"
                    >

                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                            className={` border p-2 rounded`}
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            className={` border p-2 rounded`}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            minLength={6}
                            maxLength={10}
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            className={` border p-2 rounded`}
                        />

                        <button
                          type="submit"
                          className={` p-2 rounded bg-linear-to-b from-slate-700 to-slate-900 text-slate-50`}
                        >
                            Register
                        </button>

                    </form>

                    <div className=" mt-5 self-center">

                        <p>
                            Already registered? <Link href="/login" className=" text-blue-500 border-b">Login</Link>
                        </p>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Register