"use client";

import { Sun } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { useTheme } from "next-themes";
import { useCurrentTheme } from "@/hooks/get-theme.js";
import { Icons } from "@/components/Icons";

export const ModeToggle = ({ className, ...props }) => {
  const { setTheme } = useTheme();
  const currentTheme = useCurrentTheme();

  const handleThemeChange = () => {
    if (currentTheme === "light") setTheme("dark");
    else if (currentTheme === "dark") setTheme("light");
  };

  return (
    <Button
      className={className}
      onClick={handleThemeChange}
      variant={"outline"}
      size={"icon"}
      {...props}
    >
      <Sun
        className={
          "size-4 rotate-0 scale-100 transition-transform duration-500 dark:-rotate-90 dark:scale-0 sm:size-[1.2rem]"
        }
      />
      <Icons.moon
        className={
          "absolute size-4 rotate-90 scale-0 transition-transform duration-500 dark:rotate-0 dark:scale-100 sm:size-[1.2rem]"
        }
      />
      <span className="sr-only select-none">Toggle theme</span>
    </Button>
  );
};
