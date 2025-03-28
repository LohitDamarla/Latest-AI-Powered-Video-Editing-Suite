// Toolbar.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { FaCut, FaCompress, FaMagic, FaUndo, FaRedo } from "react-icons/fa";

const Toolbar = ({ onCut, onTrim, onAIEnhance, onUndo, onRedo }) => {
  return (
    <div className="flex gap-4 bg-gray-900 p-2 rounded-lg shadow-md">
      <Button onClick={onCut} className="flex items-center gap-2"><FaCut /> Cut</Button>
      <Button onClick={onTrim} className="flex items-center gap-2"><FaCompress /> Trim</Button>
      <Button onClick={onAIEnhance} className="flex items-center gap-2"><FaMagic /> AI Enhance</Button>
      <Button onClick={onUndo} className="flex items-center gap-2"><FaUndo /> Undo</Button>
      <Button onClick={onRedo} className="flex items-center gap-2"><FaRedo /> Redo</Button>
    </div>
  );
};
export default Toolbar;