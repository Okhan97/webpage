"use client";
import { useState, useEffect, useRef } from "react";
import { coordsToPercentage, getAngleFromCenter } from "./helpers";
import "./animations.css";

const CIRCLE_RADIUS_PX = 120;

const Test6 = () => {
  const [hue, setHue] = useState(200);
  const [saturation, setSaturation] = useState(50);
  const [lightness, setLightness] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isShining, setIsShining] = useState(false);

  const latestCoordsRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      latestCoordsRef.current = { x: e.clientX, y: e.clientY };
      const { x, y } = coordsToPercentage({ x: e.clientX, y: e.clientY });
      setSaturation(x);
      setLightness(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const updateHue = () => {
      if (isDragging) {
        const { x, y } = latestCoordsRef.current;
        const angle = getAngleFromCenter(x, y);
        setHue(angle);
      }
      animationFrameRef.current = requestAnimationFrame(updateHue);
    };

    animationFrameRef.current = requestAnimationFrame(updateHue);
    return () => cancelAnimationFrame(animationFrameRef.current!);
  }, [isDragging]);

  useEffect(() => {
    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        navigator.clipboard.writeText(
          `hsl(${Math.round(hue)}, ${saturation}%, ${lightness}%)`
        );
        setIsShining(true);
        setTimeout(() => setIsShining(false), 200);
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hue, saturation, lightness]);

  const angleRadians = (hue * Math.PI) / 180;
  const dotX = CIRCLE_RADIUS_PX * Math.cos(angleRadians);
  const dotY = CIRCLE_RADIUS_PX * Math.sin(angleRadians);

  const textColor = lightness > 50 ? "black" : "white";

  return (
    <main
      className="flex items-center justify-center h-screen transition-colors duration-100 relative select-none"
      style={{ backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)` }}
    >
      <div
        className={`text-center text-xl font-bold drop-shadow z-10 transition-all duration-200 ${
          isShining ? "scale-105 drop-shadow-lg" : ""
        }`}
        style={{ color: textColor }}
      >
        <p>Hue: {Math.round(hue)}º</p>
        <p>Saturation: {saturation}%</p>
        <p>Lightness: {lightness}%</p>
      </div>

      <div
        className={`absolute rounded-full border transition-all duration-200 ${
          isShining ? "scale-105" : ""
        }`}
        style={{
          borderColor: textColor,
          width: `${CIRCLE_RADIUS_PX * 2}px`,
          height: `${CIRCLE_RADIUS_PX * 2}px`,
        }}
      >
        <div
          className="absolute w-4 h-4 rounded-full"
          style={{
            backgroundColor: textColor,
            top: `${CIRCLE_RADIUS_PX + dotY - 8}px`,
            left: `${CIRCLE_RADIUS_PX + dotX - 8}px`,
          }}
        />
      </div>

      {isShining && (
        <div
          className="absolute rounded-full border"
          style={{
            borderColor: textColor,
            width: `${CIRCLE_RADIUS_PX * 2}px`,
            height: `${CIRCLE_RADIUS_PX * 2}px`,
            animation: "shrinkToFit 200ms ease-in-out",
          }}
        />
      )}
    </main>
  );
};

export default Test6;
