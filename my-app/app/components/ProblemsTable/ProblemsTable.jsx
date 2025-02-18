"use client";

import React, { useState } from "react";
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

function ProblemsTable() {
  const [youtubePlayer, setYoutubePlayer] = useState({
    isOpen: false,
    videoId: "",
  });
  const closeModal = () => {
    setYoutubePlayer({ isOpen: false, videoId: "" });
  };

  


  return (
    <>
      <TableBody>
        {problems.map((doc, idx) => {
          const difficultyColor =
            doc.difficulty === "Easy"
              ? "text-green-500"
              : doc.difficulty === "Medium"
              ? "text-yellow-500"
              : "text-red-500";

          return (
            <TableRow
              key={doc.id}
              className="border-b border-gray-700 hover:bg-gray-700"
            >
              <TableCell className="p-4">
                <BsCheckCircle fontSize={"18"} width={"18"} />
              </TableCell>
              <TableCell className="p-4">
                <Link
                  className="hover:text-blue-600 cursor-pointer"
                  href={`/problems/${doc.id}`}
                >
                  {doc.title}
                </Link>
              </TableCell>
              <TableCell className={`p-4 ${difficultyColor}`}>
                {doc.difficulty}
              </TableCell>
              <TableCell className="p-4">{doc.category}</TableCell>
              <TableCell className="p-4">
                {doc.videoId ? (
                  <AiFillYoutube
                    fontSize={"28"}
                    className="cursor-pointer hover:text-red-600"
                    onClick={()=>setYoutubePlayer({isOpen: true, videoId: doc.videoId})}
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
