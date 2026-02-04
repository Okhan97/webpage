"use client";

import { useEffect, useRef, useState } from "react";
import { drawCheckerboard } from "./helpers";
import { DEFAULT_CELL_SIZE, MIN_CELL_SIZE, MAX_CELL_SIZE } from "./constants";

const Test12 = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cellSize, setCellSize] = useState(DEFAULT_CELL_SIZE);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    const render = () => {
      drawCheckerboard(ctx, canvas.width, canvas.height, cellSize);
    };

    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [cellSize]);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/20">
        <label className="flex flex-col gap-2 text-white/90 text-sm">
          <span>Cell Size: {cellSize}px</span>
          <input
            type="range"
            min={MIN_CELL_SIZE}
            max={MAX_CELL_SIZE}
            value={cellSize}
            onChange={(e) => setCellSize(Number(e.target.value))}
            className="w-48 cursor-pointer"
          />
        </label>
      </div>
    </>
  );
};

export default Test12;
