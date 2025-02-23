"use client";

import React, { useState } from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import Playground from "./Playground/Playground";
import { useEffect } from "react";
import Confetti from "react-confetti";
import useWindowSize from "@/hooks/useWindowSize";

const Workspace = ({ problem }) => {
  const { width, height } = useWindowSize();
  const [success, setSuccess] = useState(false);
  const [solved, setSolved] = useState(false)

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto"; // Reset when leaving the page
    };
  }, []);

  return (
    <Split className="split" minSize={0}>
      <ProblemDescription problem={problem} _solved={solved}/>
      <div>
        <Playground problem={problem} setSuccess={setSuccess} setSolved={setSolved}/>
        {success && (
          <Confetti tweenDuration={4000} width={width} height={height} />
        )}
      </div>
    </Split>
  );
};

export default Workspace;
