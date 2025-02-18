import React, { useState, useEffect } from "react";
import { FiRefreshCcw } from "react-icons/fi";

function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showClock, setShowClock] = useState(true);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleStart = () => {
    setShowClock(false);
    setIsRunning(true);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setShowClock(true);
  };

  return (
    <div className="flex items-center space-x-3 bg-zinc-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-zinc-700 transition duration-300">
      {showClock ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="1.5em"
          height="1.5em"
          fill="currentColor"
          className="cursor-pointer"
          onClick={handleStart}
        >
          <path
            fillRule="evenodd"
            d="M12 4a9 9 0 110 18 9 9 0 010-18zm0 2a7 7 0 100 14 7 7 0 000-14zm0 1.634a1 1 0 01.993.883l.007.117-.001 3.774 2.111 1.162a1 1 0 01.445 1.253l-.05.105a1 1 0 01-1.254.445l-.105-.05-2.628-1.447a1 1 0 01-.51-.756L11 13V8.634a1 1 0 011-1zM16.235 2.4a1 1 0 011.296-.269l.105.07 4 3 .095.08a1 1 0 01-1.19 1.588l-.105-.069-4-3-.096-.081a1 1 0 01-.105-1.319zM7.8 2.4a1 1 0 01-.104 1.319L7.6 3.8l-4 3a1 1 0 01-1.296-1.518L2.4 5.2l4-3a1 1 0 011.4.2z"
            clipRule="evenodd"
          ></path>
        </svg>
      ) : (
        <>
          <div className="text-lg font-mono">{formatTime(time)}</div>
          <FiRefreshCcw
            className="cursor-pointer text-xl hover:text-gray-400"
            onClick={handleReset}
          />
        </>
      )}
    </div>
  );
}

export default Timer;