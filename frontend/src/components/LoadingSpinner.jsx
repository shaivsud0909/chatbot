import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-10 h-10">
        <div className="absolute w-full h-full rounded-full border-4 border-blue-100"></div>
        <div className="absolute w-full h-full rounded-full border-4 border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;