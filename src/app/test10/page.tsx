"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { COLORS } from "./constants";
import { useDeviceMotion } from "@/utils/useDeviceMotion";

const Test10 = () => {
  const [color, setColor] = useState(COLORS[0]);
  const [lastTapTime, setLastTapTime] = useState(0);
  const [colorHistory, setColorHistory] = useState<string[]>([COLORS[0].name]);
  const { acceleration, permissionGranted, requestPermission } =
    useDeviceMotion();
  const lastAcceleration = useRef({ x: 0, y: 0, z: 0 });

  const changeToRandomColor = useCallback(() => {
    // Filter out the last 3 colors from the available options
    const availableColors = COLORS.filter(
      (c) => !colorHistory.slice(-3).includes(c.name)
    );

    // If somehow all colors are in history (shouldn't happen with 10 colors and 3 history)
    // just use all colors
    const colorsToChooseFrom =
      availableColors.length > 0 ? availableColors : COLORS;

    const randomIndex = Math.floor(Math.random() * colorsToChooseFrom.length);
    const newColor = colorsToChooseFrom[randomIndex];

    setColor(newColor);
    setColorHistory((prev) => [...prev, newColor.name]);
  }, [colorHistory]);

  // Handle shake detection
  useEffect(() => {
    if (acceleration) {
      const deltaX = Math.abs(acceleration.x - lastAcceleration.current.x);
      const deltaY = Math.abs(acceleration.y - lastAcceleration.current.y);
      const deltaZ = Math.abs(acceleration.z - lastAcceleration.current.z);

      const isShake = deltaX + deltaY + deltaZ > 30;
      if (isShake) {
        changeToRandomColor();
      }

      lastAcceleration.current = acceleration;
    }
  }, [acceleration, changeToRandomColor]);

  // Handle keyboard for desktop
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "s") {
        const currentTime = Date.now();
        const timeSinceLastTap = currentTime - lastTapTime;

        if (timeSinceLastTap < 300) {
          // Double tap detected (within 300ms)
          changeToRandomColor();
          setLastTapTime(0); // Reset to avoid triple taps
        } else {
          setLastTapTime(currentTime);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [lastTapTime, changeToRandomColor]);

  const textColor =
    color.name === "white" || color.name === "yellow" ? "#000000" : "#ffffff";

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center p-8 transition-colors duration-500"
      style={{ backgroundColor: color.value }}
    >
      {!permissionGranted && (
        <button
          onClick={requestPermission}
          className="absolute top-8 px-6 py-3 bg-white text-black rounded-lg font-semibold shadow-lg hover:bg-gray-100"
        >
          Enable Motion Sensors
        </button>
      )}
      <h1
        className="text-6xl font-bold mb-4 capitalize"
        style={{ color: textColor }}
      >
        {color.name}
      </h1>
      <p className="text-xl" style={{ color: textColor }}>
        {typeof window !== "undefined" && "ontouchstart" in window
          ? "Shake your phone!"
          : "Double-tap 'S' to change color"}
      </p>
    </div>
  );
};

export default Test10;
