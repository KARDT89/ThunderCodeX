'use client';

import React, {useEffect} from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {useState} from "react";
import {auth} from "@/app/firebase/firebase";
import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";
import {useRouter} from "next/navigation";
import {Loader2} from 'lucide-react'

const Signup = () => {
    const [inputs, setInputs] = useState({displayName:"", email: "", password: ""});

    const router = useRouter();

    const handleChangeInput = (e) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
    }
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const handleRegister = async (e) => {

        e.preventDefault();
        if(!inputs.displayName || !inputs.email || !inputs.password) {
            return alert("Please fill all fields");
        }
        try{
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if(!newUser) return
            await router.push("/");

        }catch (error) {
            alert(error.message);
        }
    }
    useEffect(() => {
        if(error) alert(error.message);
    },[error])


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-700 via-black to-gray-900 flex items-center justify-center p-4">
            <form className="space-y-8 p-12 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-2xl w-full max-w-md" onSubmit={handleRegister}>
                <h3 className="text-3xl text-center font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    Join ThunderCodeX
                </h3>

                <div className="space-y-6">
                    <div>
                        <label
                            htmlFor="displayName"
                            className="block mb-3 text-sm font-medium text-gray-300"
                        >
                            Display Name
                        </label>
                        <input
                            onChange={handleChangeInput}
                            type="text"
                            id="displayName"
                            name="displayName"
                            className="w-full px-4 py-3.5 text-sm rounded-lg bg-gray-700/60 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 placeholder-gray-400 text-white transition-all duration-200"
                            placeholder="CodeWarrior42"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-3 text-sm font-medium text-gray-300"
                        >
                            Email Address
                        </label>
                        <input
                            onChange={handleChangeInput}
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-3.5 text-sm rounded-lg bg-gray-700/60 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 placeholder-gray-400 text-white transition-all duration-200"
                            placeholder="name@company.com"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-3 text-sm font-medium text-gray-300"
                        >
                            Password
                        </label>
                        <input
                            onChange={handleChangeInput}
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-3.5 text-sm rounded-lg bg-gray-700/60 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 placeholder-gray-400 text-white transition-all duration-200"
                            placeholder="••••••••"
                        />
                    </div>
                </div>
                <Button
                    type="submit"
                    className="w-full py-6 text-base font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white transition-all hover:scale-[1.02] shadow-lg hover:shadow-blue-500/20"
                >
                    {loading ? <>
                        Creating Account
                        <Loader2 className="animate-spin h-5 w-5" />
                    </>  : "Create Account"}
                </Button>

                <div className="text-sm text-center text-gray-400">
                    Already have an account?{" "}
                    <Link href="/login">
                        <Button
                            variant="link"
                            className="p-0 text-blue-400 hover:text-blue-300 font-semibold ml-1.5 h-auto"
                        >
                            Sign In
                        </Button>
                    </Link>

                </div>
            </form>
        </div>
    );
};

export default Signup;