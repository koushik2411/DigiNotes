"use client";

import Header from "@/components/layout/Header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserShield } from "react-icons/fa";
import { toast } from "sonner";

function Login() {

    const [isOpen, setIsOpen] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            if (!email || !password) {
                toast.warning("Please fill all the fields");
                return;
            }

            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        email,
                        password,
                    }
                ),
            });

            const data = await res.json();

            toast.success("Login Successful")

            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            localStorage.setItem("token", data.token);

            localStorage.setItem("user", JSON.stringify(data.user));

            router.replace("/");
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            router.replace("/");
        }
    }, []);

    return (
        <div className={` w-full min-h-screen p-3 flex justify-center items-center gap-3 bg-slate-100`}>

            <Header
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />

            <div className={` w-11/12 md:w-10/12 max-w-260 p-3 md:p-6 lg:p-9 flex flex-col lg:flex-row gap-3 rounded-lg bg-linear-to-b from-slate-200 to-slate-300 text-slate-800 lg:items-center lg:justify-center shadow-xl`}>

                {/* Icon div */}
                <div className=" w-full text-9xl lg:text-[180px] flex justify-center items-center text-indigo-950">
                    <FaUserShield/>
                </div>

                {/* Form div */}
                <div className=" w-full p-3 flex flex-col gap-6">

                    <form
                      onSubmit={handleLogin}
                      className=" flex flex-col gap-3"
                    >

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
                          className={` p-2 rounded bg-linear-to-b from-slate-900 to-indigo-900 text-slate-50`}
                        >
                            Login
                        </button>

                    </form>

                    <div className=" mt-5 self-center text-center text-sm flex flex-col gap-2">

                        <p>
                            New User? <Link href="/register" className=" text-blue-500 border-b">Register</Link>
                        </p>

                        <Link href="/register">
                            Forgot Password
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Login