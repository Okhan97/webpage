"use client";
import { generateColorFromSpeed } from "@/utils/colors";
import { useEffect, useRef } from "react";

const generateLayers = (
  minSpeed: number,
  maxSpeed: number,
  steps: number,
  reverse: boolean = false
) => {
  const speeds = Array.from(
    { length: steps },
    (_, i) => minSpeed * Math.pow(maxSpeed / minSpeed, i / (steps - 1))
  );

  return speeds.map((speed) => ({
    speed,
    color: generateColorFromSpeed({ speed, minSpeed, maxSpeed, reverse }),
  }));
};

const ParallaxCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const layers = generateLayers(1, 8, 20);

    let mouseX = 0,
      mouseY = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      layers.forEach((layer) => {
        const xOffset = (mouseX / canvas.width - 0.5) * 100 * layer.speed;
        const yOffset = (mouseY / canvas.height - 0.5) * 100 * layer.speed;

        const squareWidth = canvas.width / 4;
        const squareHeight = canvas.height / 4;

        const centerX = canvas.width / 2 - squareWidth / 2;
        const centerY = canvas.height / 2 - squareHeight / 2;

        ctx.fillStyle = layer.color;
        ctx.fillRect(
          centerX + xOffset,
          centerY + yOffset,
          squareWidth,
          squareHeight
        );
      });

      requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    draw();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <canvas ref={canvasRef} className="h-auto" />
    </div>
  );
};

export default ParallaxCanvas;
