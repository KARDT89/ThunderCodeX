"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/app/firebase/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { Particles } from "@/components/magicui/particles";
import { useTheme } from "next-themes";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [inputs, setInputs] = useState({ email: "", password: "" });

  const router = useRouter();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleInputChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password)
      return toast.warning("Please fill all input fields", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });

    try {
      const newUser = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;
      await router.push("/");
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
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

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
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
        onSubmit={handleLogin}
      >
        <h3 className="text-3xl text-center font-extrabold bg-gradient-to-r from-yellow-300 to-yellow-600 bg-clip-text text-transparent">
          Welcome to ThunderCodeX
        </h3>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-3 text-sm font-medium text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3.5 text-sm rounded-lg bg-gray-700/60 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 placeholder-gray-400 text-white transition-all duration-200"
              placeholder="name@company.com"
              onChange={handleInputChange}
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
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full px-4 py-3.5 text-sm rounded-lg bg-gray-700/60 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 placeholder-gray-400 text-white transition-all duration-200"
              placeholder="••••••••"
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-11 text-gray-400 hover:text-gray-200 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

            <Link href="/reset-password">
              <button
                type="button"
                className="text-sm mt-3 text-yellow-400 hover:text-yellow-300 transition-colors w-full text-right"
              >
                Forgot Password?
              </button>
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full py-6 text-base font-semibold bg-gradient-to-r from-yellow-300 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black transition-all hover:scale-[1.02] shadow-lg hover:shadow-yellow-500/20"
        >
          {loading ? (
            <>
              Signing in <Loader2 className="animate-spin h-5 w-5" />
            </>
          ) : (
            "Sign in"
          )}
        </Button>

        <div className="text-sm text-center text-gray-400">
          New to ThunderCodeX?{" "}
          <Link href={"/signup"}>
            <Button
              variant="link"
              className="p-0 text-yellow-400 hover:text-yellow-300 font-semibold ml-1.5 h-auto"
            >
              Create Account
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
