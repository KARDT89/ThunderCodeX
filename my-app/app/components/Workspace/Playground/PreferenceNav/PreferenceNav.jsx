import React from "react";
import { Button } from "@/components/ui/button";
import { AiOutlineFullscreen, AiOutlineSetting, AiOutlineFullscreenExit } from "react-icons/ai";
import { useState, useEffect } from "react";

function PreferenceNav() {
  const [isFullScreen, setIsFullScreen] = useState(false);

	const handleFullScreen = () => {
		if (isFullScreen) {
			document.exitFullscreen();
		} else {
			document.documentElement.requestFullscreen();
		}
		setIsFullScreen(!isFullScreen);
	};

  useEffect(() => {
		function exitHandler(e) {
			if (!document.fullscreenElement) {
				setIsFullScreen(false);
				return;
			}
			setIsFullScreen(true);
		}

		if (document.addEventListener) {
			document.addEventListener("fullscreenchange", exitHandler);
			document.addEventListener("webkitfullscreenchange", exitHandler);
			document.addEventListener("mozfullscreenchange", exitHandler);
			document.addEventListener("MSFullscreenChange", exitHandler);
		}
	}, [isFullScreen]);


  return (
    <div className="flex items-center justify-between bg-zinc-900 h-11 w-full">
      <div className="flex items-center text-white">
        <Button className="flex cursor-pointer items-center rounded text-left focus:outline-none bg-zinc-800 text-gray-200 hover:bg-zinc-700 px-2 py-1 font-medium">
          <div className="flex items-center px-1">
            <div className="text-xs text-label-2 dark:text-gray-400">
              JavaScript
            </div>
          </div>
        </Button>
      </div>
      <div className="flex items-center m-2">
        <button className='preferenceBtn group'>
            <div className="h-4 w-4 text-gray-200 font-bold text-lg">
                <AiOutlineSetting/>
            </div>
            <div className="preferenceBtn-tooltip">
                Settings
            </div>
        </button>
        <button className='preferenceBtn group' onClick={handleFullScreen}>
            <div className="h-4 w-4 text-gray-200 font-bold text-lg">
            {!isFullScreen ? <AiOutlineFullscreen /> : <AiOutlineFullscreenExit />}
            </div>
            <div className="preferenceBtn-tooltip">
                Full Screen
            </div>
        </button>
      </div>
    </div>
  );
}

export default PreferenceNav;
