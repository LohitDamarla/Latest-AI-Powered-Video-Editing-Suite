// src/components/ExportPanel.jsx
import React, { useState } from "react";

const ExportPanel = ({ exportVideo }) => {
  const [format, setFormat] = useState("mp4");
  const [resolution, setResolution] = useState("1080p");

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">Export Video</h2>
      <div className="mb-4">
        <label className="block mb-1">Format:</label>
        <select value={format} onChange={(e) => setFormat(e.target.value)} className="p-2 bg-gray-800 rounded-md">
          <option value="mp4">MP4</option>
          <option value="avi">AVI</option>
          <option value="mov">MOV</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Resolution:</label>
        <select value={resolution} onChange={(e) => setResolution(e.target.value)} className="p-2 bg-gray-800 rounded-md">
          <option value="720p">720p</option>
          <option value="1080p">1080p</option>
          <option value="4K">4K</option>
        </select>
      </div>
      <button onClick={() => exportVideo(format, resolution)} className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-md">
        Export Video
      </button>
    </div>
  );
};

export default ExportPanel;