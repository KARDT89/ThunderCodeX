import React from "react";
import Link from "next/link"; // Correct import
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between sm:px-12 px-2 md:px-24">
      <Link href="/" className="flex items-center justify-center h-20">
        <Image
          src="/images/Leetcode.png" // Path to the image
          alt="Description of image"
          width={100} // Set the width of the image
          height={100} // Set the height of the image
        />
      </Link>
      <div className="flex items-center">
        <Button variant={"outline"}>Login</Button>
      </div>
    </div>
  );
};
