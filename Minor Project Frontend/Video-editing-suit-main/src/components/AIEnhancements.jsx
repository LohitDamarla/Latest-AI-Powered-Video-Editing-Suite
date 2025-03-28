// AIEnhancements.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { FaAdjust, FaEraser, FaPalette } from "react-icons/fa";

const AIEnhancements = ({ onAutoColor, onBGRemove, onSmartEffects }) => {
  return (
    <div className="p-4 bg-gray-900 rounded-lg flex flex-col gap-4">
      <Button onClick={onAutoColor} className="flex items-center gap-2"><FaAdjust /> Auto Color Correction</Button>
      <Button onClick={onBGRemove} className="flex items-center gap-2"><FaEraser /> Background Removal</Button>
      <Button onClick={onSmartEffects} className="flex items-center gap-2"><FaPalette /> Smart Effects</Button>
    </div>
  );
};
export default AIEnhancements;