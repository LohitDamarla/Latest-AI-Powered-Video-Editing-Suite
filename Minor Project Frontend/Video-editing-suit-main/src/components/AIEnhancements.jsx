import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaAdjust, FaEraser, FaPalette } from "react-icons/fa";

const AIEnhancements = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setDownloadUrl("");
    setMessage("");
  };

  // Function to upload video and process with AI features
  const handleUpload = async (endpoint) => {
    if (!selectedFile) {
      alert("Please select a video file first.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("video", selectedFile);

    try {
      const response = await fetch(`http://localhost:5001/${endpoint}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setDownloadUrl(`http://localhost:5001/download?filename=${data.download_url.split("=")[1]}`);
        setMessage(data.message);
      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Failed to connect to the server.");
    }

    setLoading(false);
  };

  return (
    <div className="p-4 bg-gray-900 rounded-lg flex flex-col gap-4 text-white">
      <h2 className="text-lg font-bold">AI Enhancements</h2>

      {/* File Upload Input */}
      <input type="file" accept="video/*" onChange={handleFileChange} className="mb-2 p-2 bg-gray-800 rounded"/>

      {/* Action Buttons */}
      <Button onClick={() => handleUpload("color-correct")} className="flex items-center gap-2" disabled={loading}>
        <FaAdjust /> Auto Color Correction
      </Button>
      <Button onClick={() => handleUpload("content_analysis")} className="flex items-center gap-2" disabled={loading}>
        <FaEraser /> Content Analysis
      </Button>
      <Button onClick={() => handleUpload("real_time_editing")} className="flex items-center gap-2" disabled={loading}>
        <FaPalette /> Real-Time Editing
      </Button>

      {/* Loading Indicator */}
      {loading && <p>Processing...</p>}

      {/* Response Message */}
      {message && <p className="mt-2">{message}</p>}

      {/* Download Processed Video */}
      {downloadUrl && (
        <div className="mt-2">
          <p>Download Processed Video:</p>
          <a href={downloadUrl} download>
            <Button>Download</Button>
          </a>
        </div>
      )}
    </div>
  );
};

export default AIEnhancements;
