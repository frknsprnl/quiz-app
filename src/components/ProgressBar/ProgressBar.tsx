import React from "react";

const ProgressBar:React.FC<{progress: Number}> = ({progress = 0}) => {
  return (
    <div className="w-full rounded-full h-2.5 bg-gray-700">
      <div
        className="bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 h-2.5 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
