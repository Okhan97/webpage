"use client";

import { useEffect, useRef, useState } from "react";

const CanvasCircle = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState("blue");
  const [nCircles, setNCircles] = useState(1);
  const circlesRef = useRef<{ x: number; y: number }[]>(
    Array.from({ length: nCircles }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }))
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drawCircles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      circlesRef.current.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
      });
    };

    drawCircles();
  }, [color, nCircles]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "KeyA") {
        setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
      }
      if (e.code === "ArrowDown") {
        setNCircles((prev) => {
          const newCount = Math.max(1, Math.floor(prev / 2));
          circlesRef.current = circlesRef.current.slice(0, newCount);
          return newCount;
        });
      }
      if (e.code === "ArrowUp") {
        setNCircles((prev) => {
          const newCount = Math.min(prev * 2, 2 ** 10);
          const newCircles = Array.from({ length: newCount - prev }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }));
          circlesRef.current = [...circlesRef.current, ...newCircles];
          return newCount;
        });
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
    </div>
  );
};

export default CanvasCircle;
