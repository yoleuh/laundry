"use client";

import React, { useState, useEffect } from "react";

type TimerType = ReturnType<typeof setTimeout>;
type MachineState = "idle" | "filling" | "washing" | "finished";
type Program = "normal" | "delicate" | "heavy";

const programDurations: Record<Program, number> = {
  normal: 30 * 60, // 30 minutes
  delicate: 15 * 60, // 15 minutes
  heavy: 60 * 60, // 1 hour
};

const WashingMachine = () => {
  const [state, setState] = useState<MachineState>("idle");
  const [waterLevel, setWaterLevel] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(programDurations.normal);
  const [program, setProgram] = useState<Program>("normal");
  const [temperature, setTemperature] = useState(30);

  useEffect(() => {
    let timer: TimerType;
    if (state === "filling") {
      timer = setInterval(() => {
        setWaterLevel((prevLevel) => {
          if (prevLevel >= 100) {
            clearInterval(timer);
            setState("washing");
            return 100;
          }
          return prevLevel + 5;
        });
      }, 500); // Fill in 10 seconds
    } else if (state === "washing") {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            setState("finished");
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [state]);

  const startMachine = () => {
    if (state === "idle") {
      setState("filling");
      setWaterLevel(0);
      setTimeRemaining(programDurations[program]);
    }
  };

  const resetMachine = () => {
    setState("idle");
    setWaterLevel(0);
    setTimeRemaining(programDurations[program]);
  };

  const handleProgramChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProgram = e.target.value as Program;
    setProgram(newProgram);
    setTimeRemaining(programDurations[newProgram]);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md text-black">
      <div className="w-64 h-64 bg-gray-300 rounded-full flex items-center justify-center mb-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-300 rounded-full flex items-center justify-center">
          <div className="w-56 h-56 bg-white rounded-full"></div>
        </div>
        <div className="w-56 h-56 rounded-full overflow-hidden relative">
          <div
            className={`w-full h-full bg-blue-200 relative ${
              state === "washing" ? "animate-spin" : ""
            }`}
          >
            <svg
              className="absolute inset-0"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className={`${state === "washing" ? "animate-bounce" : ""}`}
                cx="30"
                cy="30"
                r="5"
                fill="pink"
              />
              <rect
                className={`${state === "washing" ? "animate-ping" : ""}`}
                x="60"
                y="60"
                width="10"
                height="10"
                fill="lightgreen"
              />
              <path
                className={`${state === "washing" ? "animate-pulse" : ""}`}
                d="M70 20 Q 75 10, 80 20 T 90 30"
                fill="none"
                stroke="purple"
                strokeWidth="2"
              />
            </svg>
            <div
              className={`absolute inset-x-0 bottom-0 bg-blue-300 opacity-50 transition-all duration-500 ${
                state === "washing" ? "animate-wave" : ""
              }`}
              style={{ height: `${waterLevel}%` }}
            ></div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-30 rounded-full"></div>
      </div>
      <div className="text-xl font-bold mb-2">
        {state === "idle" && "Ready"}
        {state === "filling" && "Filling..."}
        {state === "washing" && `Washing: ${formatTime(timeRemaining)}`}
        {state === "finished" && "Finished!"}
      </div>
      <div className="flex space-x-2 mb-4">
        <button
          onClick={startMachine}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={state !== "idle"}
        >
          ▶️
        </button>
        <button
          onClick={resetMachine}
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          🔄
        </button>
      </div>
      <select
        value={program}
        onChange={handleProgramChange}
        className="mb-2 p-2 rounded border border-gray-300"
        disabled={state !== "idle"}
      >
        <option value="normal">Normal (30 min)</option>
        <option value="delicate">Delicate (15 min)</option>
        <option value="heavy">Heavy Duty (60 min)</option>
      </select>
      <input
        type="range"
        min="20"
        max="90"
        value={temperature}
        onChange={(e) => setTemperature(parseInt(e.target.value))}
        className="w-full mb-2"
        disabled={state !== "idle"}
      />
      <span>{temperature}°C</span>
    </div>
  );
};

export default WashingMachine;
