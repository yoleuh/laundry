"use client";

import React, { useState } from "react";

const WashingMachine = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [program, setProgram] = useState("normal");
  const [temperature, setTemperature] = useState(30);

  const toggleMachine = () => setIsRunning(!isRunning);

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="w-64 h-64 bg-gray-300 rounded-full flex items-center justify-center mb-4 relative overflow-hidden">
        {/* Door frame */}
        <div className="absolute inset-0 bg-gray-300 rounded-full flex items-center justify-center">
          <div className="w-56 h-56 bg-white rounded-full"></div>
        </div>
        {/* Drum and contents */}
        <div className="w-56 h-56 rounded-full overflow-hidden relative">
          <div
            className={`w-full h-full bg-blue-200 relative ${
              isRunning ? "animate-spin" : ""
            }`}
          >
            {/* Animated laundry items */}
            <svg
              className="absolute inset-0"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className={`${isRunning ? "animate-bounce" : ""}`}
                cx="30"
                cy="30"
                r="5"
                fill="pink"
              />
              <rect
                className={`${isRunning ? "animate-ping" : ""}`}
                x="60"
                y="60"
                width="10"
                height="10"
                fill="lightgreen"
              />
              <path
                className={`${isRunning ? "animate-pulse" : ""}`}
                d="M70 20 Q 75 10, 80 20 T 90 30"
                fill="none"
                stroke="purple"
                strokeWidth="2"
              />
            </svg>
            {/* Water effect */}
            <div
              className={`absolute inset-x-0 bottom-0 h-1/2 bg-blue-300 opacity-50 ${
                isRunning ? "animate-wave" : ""
              }`}
            ></div>
          </div>
        </div>
        {/* Glass effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-30 rounded-full"></div>
      </div>
      <div className="flex space-x-2 mb-4">
        <button
          onClick={toggleMachine}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isRunning ? "⏸️" : "▶️"}
        </button>
        <button
          onClick={() => setIsRunning(false)}
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          🔄
        </button>
      </div>
      <select
        value={program}
        onChange={(e) => setProgram(e.target.value)}
        className="mb-2 p-2 rounded border border-gray-300"
      >
        <option value="normal">Normal</option>
        <option value="delicate">Delicate</option>
        <option value="heavy">Heavy Duty</option>
      </select>
      <input
        type="range"
        min="20"
        max="90"
        value={temperature}
        onChange={(e) => setTemperature(parseInt(e.target.value))}
        className="w-full mb-2"
      />
      <span>{temperature}°C</span>
    </div>
  );
};

export default WashingMachine;
