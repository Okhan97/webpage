"use client";

import { Circle } from "@/types";
import { getRandomColor, getSimilarRandomColor } from "@/utils/colors";
import { randInt } from "@/utils/numbers";
import { Checkbox } from "@mui/material";
import { RefObject, useEffect, useRef, useState } from "react";
import { drawCircles } from "./drawCircles";

const MAX_CIRCLES = 2 ** 17;
const COLOR_VARIATION = 1000;
const CIRCLE_RADIUS = 1;
const INTERVAL_MS = 2000;

const CanvasCircle = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  //TODO: This 3 should be one state
  const [showRed, setShowRed] = useState(true);
  const [showGreen, setShowGreen] = useState(true);
  const [showBlue, setShowBlue] = useState(true);

  const [color, setColor] = useState(getRandomColor());
  const [nCircles, setNCircles] = useState(1);
  const circlesRef = useRef<Circle[]>([]);
  const blueCirclesRef = useRef<Circle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (typeof window === "undefined") return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // drawCircles({
    //   canvas,
    //   circlesRef,
    //   color,
    // });
    drawCircles({
      canvas,
      circlesRefList: [circlesRef, blueCirclesRef],
      color: getRandomColor(),
    });
  }, [color, nCircles, showBlue]);

  const addNewCircles = (prev: number, ref: RefObject<Circle[]>): number => {
    const newCount = Math.min(prev * 2, MAX_CIRCLES);
    const newCircles = Array.from({ length: newCount - prev }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: CIRCLE_RADIUS + randInt(1, 10),
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
      if (e.code === "KeyS") {
        setNCircles((prev) => {
          const newCount = Math.max(1, Math.floor(prev / 2));
          blueCirclesRef.current = blueCirclesRef.current.slice(0, newCount);
          return newCount;
        });
      }
      if (e.code === "ArrowUp")
        setNCircles((prev) => addNewCircles(prev, circlesRef));
      if (e.code === "KeyW")
        setNCircles((prev) => addNewCircles(prev, blueCirclesRef));
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setColor(getSimilarRandomColor(color, COLOR_VARIATION));
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      <div className="border-red-500 border px-6 py-2 relative z-10">
        <Checkbox checked={showRed} onChange={() => setShowRed(!showRed)} />
        <Checkbox
          checked={showGreen}
          onChange={() => setShowGreen(!showGreen)}
        />
        <Checkbox checked={showBlue} onChange={() => setShowBlue(!showBlue)} />
      </div>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-9"
      />
    </div>
  );
};

export default CanvasCircle;
