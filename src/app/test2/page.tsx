"use client";

import { Circle } from "@/types";
import { getRandomColor, getSimilarRandomColor } from "@/utils/colors";
import { randInt } from "@/utils/numbers";
import { RefObject, useEffect, useRef, useState } from "react";
import { drawCircles } from "./drawCircles";
import ControllerBar from "./ControllerBar";

const MAX_CIRCLES = 2 ** 17;
const COLOR_VARIATION = 100;

const CanvasCircle = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [intervalMs, setIntervalMs] = useState(1000);
  const [circleRadius, setCircleRadius] = useState(1);
  const [color, setColor] = useState(getRandomColor());
  const [iterateRandom, setIterateRandom] = useState(false);

  //TODO: This 3 should be one state
  const [showRed, setShowRed] = useState(true);
  const [showGreen, setShowGreen] = useState(true);
  const [showBlue, setShowBlue] = useState(true);

  const [nCircles, setNCircles] = useState(2 ** 7);
  const circlesRef = useRef<Circle[]>([]);
  const blueCirclesRef = useRef<Circle[]>([]);

  // Set starting circles
  useEffect(() => {
    addNewCircles(nCircles, circlesRef, circleRadius);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (typeof window === "undefined") return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawCircles({
      canvas,
      circlesRefList: [circlesRef, blueCirclesRef],
      color,
    });
  }, [color, nCircles, showBlue]);

  const addNewCircles = (
    prev: number,
    ref: RefObject<Circle[]>,
    circleRadius: number
  ): number => {
    const newCount = Math.min(prev * 2, MAX_CIRCLES);
    const newCircles = Array.from({ length: newCount - prev }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: circleRadius + randInt(1, 10),
    }));
    ref.current = [...ref.current, ...newCircles];
    return newCount;
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "KeyA") {
        setColor(getSimilarRandomColor(color, COLOR_VARIATION));
      }
      if (e.code === "ArrowDown") {
        setNCircles((prev) => {
          const newCount = Math.max(1, Math.floor(prev / 2));
          circlesRef.current = circlesRef.current.slice(0, newCount);
          return newCount;
        });
      }
      if (e.code === "ArrowUp")
        setNCircles((prev) => addNewCircles(prev, circlesRef, circleRadius));
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [circleRadius, color]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (iterateRandom)
        setColor(getSimilarRandomColor(color, COLOR_VARIATION));
    }, intervalMs);

    return () => clearInterval(interval);
  }, [color, intervalMs, iterateRandom]);

  return (
    <div>
      <ControllerBar
        intervalMs={{
          get: intervalMs,
          set: setIntervalMs,
        }}
        circleRadius={{
          get: circleRadius,
          set: setCircleRadius,
        }}
        color={{
          get: color,
          set: setColor,
        }}
        iterateRandom={{
          get: iterateRandom,
          set: setIterateRandom,
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-9"
      />
    </div>
  );
};

export default CanvasCircle;
