"use client";

import "./test.css";
import { useEffect, useState } from "react";

const PsychedelicEffect = () => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return; // Prevent SSR errors

    const canvas = document.getElementById("trippyCanvas") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      [...Array(30)].forEach((_, i) => {
        ctx.beginPath();
        const x = canvas.width / 2 + Math.sin(time + i) * 200;
        const y = canvas.height / 2 + Math.cos(time + i) * 200;
        const radius = Math.abs(Math.sin(time + i) * 80);
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${(time * 50 + i * 20) % 360}, 100%, 50%)`;
        ctx.fill();
      });

      time += 0.005;
      requestAnimationFrame(draw);
    };

    draw();

    // Mouse movement listener for 3D effect
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setMouseX((e.clientX - centerX) / centerX);
      setMouseY((e.clientY - centerY) / centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
      style={{
        perspective: "200px",
      }}
    >
      <canvas
        id="trippyCanvas"
        className="absolute top-0 left-0 w-full h-full transition-transform duration-50 border"
        style={{
          transform: `rotateX(${mouseY * 15}deg) rotateY(${mouseX * 15}deg)`,
        }}
      ></canvas>
      <canvas
        id="trippyCanvas"
        className="absolute top-0 left-0 w-full h-full transition-transform duration-100 border"
        style={{
          transform: `rotateX(${mouseY * 25}deg) rotateY(${mouseX * 25}deg)`,
        }}
      ></canvas>
    </div>
  );
};

export default PsychedelicEffect;
