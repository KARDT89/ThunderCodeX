import React from "react";

const RectangleSkeleton = () => {
  return (
    <div className="space-y-2.5 animate-pulse">
      <div className="flex items-center w-full space-x-2">
        <div className="h-6 w-12 rounded-full bg-zinc-600"></div>
      </div>
    </div>
  );
};
export default RectangleSkeleton;
