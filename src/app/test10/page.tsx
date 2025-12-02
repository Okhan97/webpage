"use client";

import { useEffect, useState } from "react";
import { COLORS } from "./constants";

const Test10 = () => {
  const [color, setColor] = useState(COLORS[0]);
  const [lastTapTime, setLastTapTime] = useState(0);
  const [colorHistory, setColorHistory] = useState<string[]>([COLORS[0].name]);

  useEffect(() => {
    const changeToRandomColor = () => {
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
    };
    // Handle shake on mobile
    let lastX = 0;
    let lastY = 0;
    let lastZ = 0;

    const handleMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration) return;

      const x = acceleration.x ?? 0;
      const y = acceleration.y ?? 0;
      const z = acceleration.z ?? 0;

      const deltaX = Math.abs(x - lastX);
      const deltaY = Math.abs(y - lastY);
      const deltaZ = Math.abs(z - lastZ);

      // Detect shake
      if (deltaX + deltaY + deltaZ > 30) {
        changeToRandomColor();
      }

      lastX = x;
      lastY = y;
      lastZ = z;
    };

    // Handle double-tap 'S' on PC
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

    window.addEventListener("devicemotion", handleMotion);
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("devicemotion", handleMotion);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [lastTapTime, colorHistory]);

  const textColor =
    color.name === "white" || color.name === "yellow" ? "#000000" : "#ffffff";

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center p-8 transition-colors duration-500"
      style={{ backgroundColor: color.value }}
    >
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
