"use client";

import React from "react";
import { ThemeProvider } from "@/components/ThemeProvider";

const Providers = ({ children }) => {
  return (
    <ThemeProvider attribute={"class"} defaultTheme={"dark"} enableSystem>
      {children}
    </ThemeProvider>
  );
};

export default Providers;
