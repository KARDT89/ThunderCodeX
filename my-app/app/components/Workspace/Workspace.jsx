"use client";

import React from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import Playground from "./Playground/Playground";
import { useEffect } from "react";

const Workspace = ({ problem }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto"; // Reset when leaving the page
    };
  }, []);
  return (
    <Split className="split" minSize={0}>
      <ProblemDescription problem={problem} />
      <div>
        <Playground problem={problem} />
      </div>
    </Split>
  );
};

export default Workspace;
