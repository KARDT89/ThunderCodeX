"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { problems } from "@/app/mockProblems/problems";
import { BsCheckCircle } from "react-icons/bs";
import { AiFillYoutube } from "react-icons/ai";
import Link from "next/link";
import YouTube from "react-youtube";
import { IoClose } from "react-icons/io5";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "@/app/firebase/firebase";

function ProblemsTable({setLoadingProblems}) {
  const [youtubePlayer, setYoutubePlayer] = useState({
    isOpen: false,
    videoId: "",
  });

  const problems = useGetProblems(setLoadingProblems)

  const closeModal = () => {
    setYoutubePlayer({ isOpen: false, videoId: "" });
  };

  return (
    <>
      <TableBody>
        {problems.map((problem, idx) => {
          const difficultyColor =
            problem.difficulty === "Easy"
              ? "text-green-500"
              : problem.difficulty === "Medium"
              ? "text-yellow-500"
              : "text-red-500";

          return (
            <TableRow
              key={problem.id}
              className="border-b border-gray-700 hover:bg-gray-700"
            >
              <TableCell className="p-4">
                <BsCheckCircle fontSize={"18"} width={"18"} />
              </TableCell>
              <TableCell className="p-4">
                {problem.link ? (
                  <Link href={problem.link} className="hover:text-blue-600 cursor-pointer" target="_blank">{problem.title}</Link>
                ): (
                  <Link
                  className="hover:text-blue-600 cursor-pointer"
                  href={`/problems/${problem.id}`}
                >
                  {problem.title}
                </Link>
                )}
              </TableCell>
              <TableCell className={`p-4 ${difficultyColor}`}>
                {problem.difficulty}
              </TableCell>
              <TableCell className="p-4">{problem.category}</TableCell>
              <TableCell className="p-4">
                {problem.videoId ? (
                  <AiFillYoutube
                    fontSize={"28"}
                    className="cursor-pointer hover:text-red-600"
                    onClick={()=>setYoutubePlayer({isOpen: true, videoId: problem.videoId})}
                  />
                ) : (
                  <p className="text-gray-400">Coming soon</p>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      {youtubePlayer.isOpen && (
        <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
          <div
            className="bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute"
            onClick={closeModal}
          ></div>
          <div className="w-full h-full flex items-center justify-center relative z-50">
            <div className="w-full max-w-4xl relative">
              <IoClose
                fontSize={"35"}
                className="cursor-pointer absolute -top-16 right-0 hover:text-white"
                onClick={closeModal}
              />
              <YouTube
                videoId={youtubePlayer.videoId}
                loading="lazy"
                opts={{
                  width: "100%",
                  height: "500px",
                  playerVars: {
                    autoplay: 1,
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProblemsTable;


function useGetProblems(setLoadingProblems){
  const [problems, setProblems] = useState([])

  useEffect(()=>{
    const getProblems = async () => {
      setLoadingProblems(true)
      const q = query(collection(firestore, "problems"), orderBy("order", "asc"))
      const querySnapshot = await getDocs(q)
      const temp = []
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        temp.push({id: doc.id, ...doc.data()})
      });
      setProblems(temp)
      setLoadingProblems(false)
    }
    getProblems()
  },[setLoadingProblems])

  return problems;
}