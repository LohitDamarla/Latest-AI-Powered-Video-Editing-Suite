// AudioEditor.jsx
import React, { useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { Button } from "@/components/ui/button";

const AudioEditor = ({ audioFile }) => {
  const [waveform, setWaveform] = useState(null);

  React.useEffect(() => {
    if (!waveform) {
      const wavesurfer = WaveSurfer.create({
        container: "#waveform",
        waveColor: "#4a90e2",
        progressColor: "#f39c12",
      });
      setWaveform(wavesurfer);
      if (audioFile) wavesurfer.load(audioFile);
    }
  }, [audioFile]);

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <div id="waveform" className="h-24"></div>
      <Button onClick={() => waveform.playPause()} className="mt-2">Play / Pause</Button>
    </div>
  );
};
export default AudioEditor;