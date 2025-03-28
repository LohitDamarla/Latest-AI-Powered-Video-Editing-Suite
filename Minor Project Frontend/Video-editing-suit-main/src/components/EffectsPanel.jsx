// src/components/EffectsPanel.jsx
import React from "react";

const EffectsPanel = ({ applyEffect }) => {
  const effects = ["Grayscale", "Sepia", "Blur", "Invert Colors", "Brightness", "Contrast"];

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">Effects</h2>
      <div className="flex flex-wrap gap-2">
        {effects.map((effect) => (
          <button
            key={effect}
            onClick={() => applyEffect(effect)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md"
          >
            {effect}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EffectsPanel;