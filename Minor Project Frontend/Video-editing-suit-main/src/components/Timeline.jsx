/* Timeline.jsx - Video Editing Timeline Component */
import React from "react";

const Timeline = () => {
  return (
    <div className="w-full bg-gray-900 p-4 rounded-lg flex flex-col items-center">
      <h2 className="text-white mb-2">Timeline</h2>
      <div className="w-full h-20 bg-gray-700 rounded-md flex items-center justify-center">
        <p className="text-gray-300">Drag and drop clips here</p>
      </div>
    </div>
  );
};

export default Timeline;

