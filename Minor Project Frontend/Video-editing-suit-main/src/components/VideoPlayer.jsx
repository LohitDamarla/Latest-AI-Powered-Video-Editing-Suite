import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (src && videoRef.current) {
      videoRef.current.load();
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [src]); // Re-run when `src` changes (new upload or processed video)

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center bg-black p-4 rounded-lg shadow-lg">
      {src ? (
        <video
          ref={videoRef}
          src={src}
          className="w-full max-h-[500px] rounded-lg"
          onEnded={() => setIsPlaying(false)} // Reset play state when video ends
          controls
        />
      ) : (
        <p className="text-gray-400">Upload a video to preview</p>
      )}

      {/* Play/Pause Button */}
      <div className="flex items-center justify-center w-full mt-3 bg-gray-900 rounded-lg p-2">
        <button
          onClick={togglePlay}
          className="text-white text-xl flex items-center gap-2"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
