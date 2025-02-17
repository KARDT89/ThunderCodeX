import React from "react";
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

function ProblemsTable() {
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
                    fontSize={"18"}
                    className="cursor-pointer hover:text-red-600"
                  />
                ) : (
                  <p className="text-gray-400">Coming soon</p>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </>
  );
}

export default ProblemsTable;
