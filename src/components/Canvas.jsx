import React from "react";

const Canvas = ({ children }) => {
  return (
    <div className="relative w-full h-screen overflow-scroll bg-gray-100">
      {children}
    </div>
  );
};

export default Canvas;
