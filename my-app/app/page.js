"use client";

import { Table, TableHeader, TableCell, TableRow } from "@/components/ui/table";
import Navbar from "./components/Navbar/Navbar";
import ProblemsTable from "./components/ProblemsTable/ProblemsTable";
import { useState, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "./firebase/firebase";
import { Particles } from "@/components/magicui/particles";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Aurora from "@/components/Aurora";

export default function Home() {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  const [loadingProblems, setLoadingProblems] = useState(true);

  const [inputs, setInputs] = useState({
    id: "",
    title: "",
    difficulty: "",
    category: "",
    videoId: "",
    link: "",
    order: 0,
    likes: 0,
    dislikes: 0,
  });

  const handleInputChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProblem = {
      ...inputs,
      order: Number(inputs.order),
    };
    await setDoc(doc(firestore, "problems", inputs.id), newProblem);
    alert("saved to db");
  };

  return (
    <>
      <main className="min-h-screen text-white">
        <Navbar />
        <div className="absolute w-full h-full bg-transparent">
          <Aurora
            colorStops={
              resolvedTheme === "dark"
                ? ["#3A29FF", "#FF94B4", "#FF3232"] // Dark theme colors
                : ["#FFD700", "#FFB347", "#FF7F50"] // Light theme colors
            }
            speed={0.5}
          />
        </div>
        <Particles
          className="absolute inset-0 z-0"
          quantity={100}
          ease={80}
          color={color}
          refresh
        />
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background"></div>
        <div className="relative overflow-x-auto mx-auto max-w-6xl px-6 pb-12 pt-20">
          {loadingProblems && (
            <div className="max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse">
              {[...Array(10)].map((_, idx) => (
                <LoadingSkeleton key={idx} />
              ))}
            </div>
          )}
          <Table className="min-w-full bg-zinc-800/70 rounded-lg shadow-md">
            {!loadingProblems && (
              <TableHeader className="text-xs text-gray-300 uppercase">
                <TableRow className="border-b border-gray-700 hover:bg-transparent">
                  <TableCell className="p-4">Status</TableCell>
                  <TableCell className="p-4">Title</TableCell>
                  <TableCell className="p-4">Difficulty</TableCell>
                  <TableCell className="p-4">Category</TableCell>
                  <TableCell className="p-4">Solution</TableCell>
                </TableRow>
              </TableHeader>
            )}
            <ProblemsTable setLoadingProblems={setLoadingProblems} />
          </Table>
        </div>
        {/* temp form */}
        {/* <form className="p-6 flex flex-col max-w-sm gap-3 text-black" onSubmit={handleSubmit}>
        <input onChange={handleInputChange} type="text" placeholder="problem id" name="id"/>
        <input onChange={handleInputChange} type="text" placeholder="title" name="title"/>
        <input onChange={handleInputChange} type="text" placeholder="difficulty" name="difficulty"/>
        <input onChange={handleInputChange} type="text" placeholder="category" name="category"/>
        <input onChange={handleInputChange} type="text" placeholder="order" name="order"/>
        <input onChange={handleInputChange} type="text" placeholder="videoId?" name="videoId"/>
        <input onChange={handleInputChange} type="text" placeholder="link?" name="link"/>
        <button className="bg-white text-black">Save to DB</button>
      </form> */}
      </main>
    </>
  );
}
const LoadingSkeleton = () => {
  return (
    <div className="flex items-center space-x-12 mt-4 px-6">
      <div className="w-6 h-6 shrink-0 rounded-full bg-zinc-600"></div>
      <div className="h-4 sm:w-52  w-32  rounded-full bg-zinc-600"></div>
      <div className="h-4 sm:w-52  w-32 rounded-full bg-zinc-600"></div>
      <div className="h-4 sm:w-52 w-32 rounded-full bg-zinc-600"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
