"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { MorphingText } from "@/components/magicui/morphing-text";
import { Github, LogIn } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/app/firebase/firebase";
import Logout from "../Buttons/Logout";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Timer from "../Timer/timer";
import ProblemsPage from "@/app/problems/[id]/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useSignOut } from "react-firebase-hooks/auth";
import { getDoc, doc } from "firebase/firestore";
import { AuroraText } from "@/components/magicui/aurora-text";

const Navbar = ({ problemPage }) => {
  const [user] = useAuthState(auth);

  const [signOut] = useSignOut(auth);

  const [showDisplayName, setShowDisplayName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          console.log("Fetching user data for UID:", user.uid);
          const userDoc = await getDoc(doc(firestore, "users", user.uid));
          if (userDoc.exists()) {
            //console.log("User document data:", userDoc.data());
            setShowDisplayName(userDoc.data().displayName);
            //console.log(showDisplayName);
          } else {
            console.log("No such user document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [user]);

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-zinc-800 text-dark-gray-7 ">
      <div
        className={` flex w-full items-center justify-between ${
          !problemPage ? "max-w-[1200px] mx-auto" : ""
        }`}
      >
        <Link href={"/"} className="h-[22px] flex-1 text-white">
          <Image src={"/images/logo-full.png"} width={100} height={100} />
        </Link>
        {problemPage && (
          <div className="flex items-center gap-4 flex-1 justify-center">
            <button className="flex items-center justify-center rounded-lg bg-gray-700 hover:bg-gray-600 h-9 w-9 transition duration-200">
              <FaChevronLeft className="text-white" />
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 font-medium text-gray-300 hover:text-white transition"
            >
              <BsList className="text-lg" />
              <p>Problem List</p>
            </Link>
            <button className="flex items-center justify-center rounded-lg bg-gray-700 hover:bg-gray-600 h-9 w-9 transition duration-200">
              <FaChevronRight className="text-white" />
            </button>
          </div>
        )}
        <div className="flex items-center space-x-4 flex-1 justify-end">
          <div>{user && problemPage && <Timer />}</div>
          {!problemPage && !user && (
            <div>
              <Button
                asChild
                variant="outline"
                className="w-full border-black text-black hover:bg-zinc-200/90"
              >
                <a
                  href="https://github.com/KARDT89"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>
          )}

          <div>
            {!user && (
              <Button
                asChild
                className="w-full bg-gradient-to-r from-yellow-300 to-yellow-600 text-black"
              >
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}

            {user && (
              <div className="cursor-pointer group relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-5">
                      <h1 className="font-bold tracking-tighter md:text-5xl lg:text-2xl">
                        <AuroraText>Welcome, {showDisplayName}</AuroraText>
                      </h1>

                      <Avatar className="h-[40px] w-[40px]">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>welcome</AvatarFallback>
                      </Avatar>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-zinc-900 text-yellow-500">
                    <DropdownMenuLabel></DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link
                      href="https://github.com/KARDT89"
                      target="_blank"
                      className="w-full cursor-pointer"
                    >
                      <DropdownMenuItem className="w-full flex items-center justify-between text-white focus:bg-zinc-700 focus:text-white">
                        Visit GitHub
                        <Github className="mr-2 h-4 w-4" />
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      className="w-full flex items-center justify-between text-white focus:bg-zinc-700 focus:text-white"
                      onClick={handleLogout}
                    >
                      Logout
                      <LogOut />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
