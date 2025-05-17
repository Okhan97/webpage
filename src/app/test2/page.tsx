"use client";

import { Circle } from "@/types";
import { getRandomColor, getSimilarRandomColor } from "@/utils/color";
import { randInt } from "@/utils/numbers";
import { RefObject, useEffect, useRef, useState } from "react";
import { drawCircles } from "./drawCircles";
import ControllerBar from "./ControllerBar";

const MAX_CIRCLES = 2 ** 15;

const CanvasCircle = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [intervalMs, setIntervalMs] = useState(400);
  const [circleRadius, setCircleRadius] = useState(1);
  const [color, setColor] = useState(getRandomColor());
  const [iterateRandom, setIterateRandom] = useState(true);

  const [nCircles, setNCircles] = useState(2 ** 7);
  const firstLayerRef = useRef<Circle[]>([]);
  const secondLayerRef = useRef<Circle[]>([]);
  const thirdLayerRef = useRef<Circle[]>([]);

  useEffect(() => {
    addNewCircles(nCircles, firstLayerRef, circleRadius);
    addNewCircles(nCircles, secondLayerRef, circleRadius);
  }, []);

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
      if (e.code === "Space") {
        setColor(getSimilarRandomColor(color));
      }
      if (e.code === "ArrowDown") {
        setNCircles((prev) => {
          const newCount = Math.max(1, Math.floor(prev / 2));
          firstLayerRef.current = firstLayerRef.current.slice(0, newCount);
          secondLayerRef.current = secondLayerRef.current.slice(0, newCount);
          thirdLayerRef.current = thirdLayerRef.current.slice(0, newCount);
          return newCount;
        });
      }
      if (e.code === "ArrowUp") {
        setNCircles((prev) => {
          addNewCircles(prev, firstLayerRef, circleRadius);
          addNewCircles(prev, secondLayerRef, circleRadius);
          return addNewCircles(prev, thirdLayerRef, circleRadius);
        });
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [circleRadius, color]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (iterateRandom) setColor(getSimilarRandomColor(color));
    }, intervalMs);

    return () => clearInterval(interval);
  }, [color, intervalMs, iterateRandom]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (typeof window === "undefined") return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawCircles({
      canvas,
      circlesRefList: [firstLayerRef, secondLayerRef, thirdLayerRef],
      color,
    });
  }, [color, nCircles]);

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
        nCircles={{
          get: nCircles,
          set: setNCircles,
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
