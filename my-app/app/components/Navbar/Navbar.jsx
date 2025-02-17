"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { MorphingText } from "@/components/magicui/morphing-text";
import { Github, LogIn } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-zinc-800 text-dark-gray-7">
      <div className="flex w-full items-center justify-between max-w-[1200px] mx-auto">
        <Link href={"/"} className="h-[22px] flex-1 text-white">
          MorphingText
        </Link>
        <div className="flex items-center space-x-4 flex-1 justify-end">
          <div>
            <Button
              asChild
              variant="outline"
              className="w-full border-black text-black hover:bg-zinc-200/90"
            >
              <a
                href="https://github.com/yourusername/thundercodex"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
          <div>
            <Button
              asChild
              className="w-full bg-gradient-to-r from-zinc-600 to-zinc-500 text-white"
            >
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
