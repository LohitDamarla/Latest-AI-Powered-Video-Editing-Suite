import React, { useState } from "react";

const MediaLibrary = ({ setSelectedMedia }) => {
  const [mediaFiles, setMediaFiles] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setMediaFiles([...mediaFiles, file]);
      setSelectedMedia(fileURL); // Pass the video URL to the main editor
    }
  };

  return (
    <div className="w-full bg-gray-900 p-4 rounded-lg">
      <h2 className="text-white mb-2">Media Library</h2>
      <input type="file" accept="video/*" onChange={handleFileUpload} className="text-white" />
      <ul className="mt-2">
        {mediaFiles.map((file, index) => (
          <li key={index} className="text-gray-300">{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MediaLibrary;
