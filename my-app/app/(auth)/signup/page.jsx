"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { auth, firestore } from "@/app/firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { Eye, EyeOff } from "lucide-react";
import { Particles } from "@/components/magicui/particles";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

const Signup = () => {
  const [inputs, setInputs] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const router = useRouter();

  const handleChangeInput = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!inputs.displayName || !inputs.email || !inputs.password) {
      return toast.warning("please fill all fields", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
    try {
      toast.loading("Creating your account", {
        position: "top-center",
        toastId: "loadingToast",
      });
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;

      const userData = {
        uid: newUser.user.uid,
        email: newUser.user.email,
        displayName: inputs.displayName,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        likedProblems: [],
        dislikedProblems: [],
        solvedProblems: [],
        starredProblems: [],
      };

      await setDoc(doc(firestore, "users", newUser.user.uid), userData);
      await router.push("/");
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    } finally {
      toast.dismiss("loadingToast");
    }
  };
  useEffect(() => {
    if (error)
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
  }, [error]);

  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");
 
  useEffect(() => {
    setColor(resolvedTheme === "light" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 via-black to-gray-900 flex items-center justify-center p-4">
      <FlickeringGrid
              className="absolute inset-0 z-0 size-full"
              squareSize={4}
              gridGap={6}
              color="#6B7280"
              maxOpacity={0.5}
              flickerChance={0.1}
            />
      <form
        className="space-y-8 p-12 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-2xl w-full max-w-md"
        onSubmit={handleRegister}
      >
        <h3 className="text-3xl text-center font-extrabold bg-gradient-to-r from-yellow-300 to-yellow-600 bg-clip-text text-transparent">
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

          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-3 text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              onChange={handleChangeInput}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full px-4 py-3.5 text-sm rounded-lg bg-gray-700/60 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 placeholder-gray-400 text-white transition-all duration-200"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-11 text-gray-400 hover:text-gray-200 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full py-6 text-base font-semibold bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-700 text-black transition-all hover:scale-[1.02] shadow-lg hover:shadow-yellow-500/20"
        >
          {loading ? (
            <>
              Creating Account
              <Loader2 className="animate-spin h-5 w-5" />
            </>
          ) : (
            "Create Account"
          )}
        </Button>

        <div className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link href="/login">
            <Button
              variant="link"
              className="p-0 text-yellow-400 hover:text-yellow-300 font-semibold ml-1.5 h-auto"
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
