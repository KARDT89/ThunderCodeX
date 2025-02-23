import React from "react";
import { BsChevronUp } from "react-icons/bs";

const EditorFooter = ({handleSubmit}) => {
  return (
    <div className="flex bg-zinc-800 absolute bottom-0 z-10 w-full">
      <div className="mx-5 my-[10px] flex justify-between w-full">
        <div className="mr-2 flex flex-1 flex-nowrap items-center space-x-4">
          <button className="px-3 py-1.5 font-medium items-center transition-all inline-flex bg-zinc-700 text-sm hover:bg-zinc-600 text-zinc-400 rounded-lg pl-3 pr-2">
            Console
            <div className="ml-1 transform transition flex items-center">
              <BsChevronUp className="mx-1" />
            </div>
          </button>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <button className="px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-zinc-700 hover:bg-zinc-600 text-zinc-400 rounded-lg" onClick={handleSubmit}>
            Run
          </button>
          <button className="px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white bg-green-600 hover:bg-green-500 rounded-lg" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorFooter;
