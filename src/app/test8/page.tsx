"use client";
import { useState, useEffect } from "react";
import { coordsToPercentage, getAngleFromCenter } from "./helpers";

const CIRCLE_RADIUS_PX = 120;

const Test8 = () => {
  const [hue, setHue] = useState(200);
  const [saturation, setSaturation] = useState(50);
  const [lightness, setLightness] = useState(50);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [bgColor, setBgColor] = useState("hsl(200, 50%, 50%)");
  const [textColor, setTextColor] = useState("white");

  useEffect(() => {
    setBgColor(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    setTextColor(lightness > 50 ? "black" : "white");
  }, [hue, saturation, lightness]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
      const { x, y } = coordsToPercentage({ x: e.clientX, y: e.clientY });
      setSaturation(x);
      setLightness(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleClick = () => {
    const angle = getAngleFromCenter(coords.x, coords.y);
    setHue(angle);
  };

  const angleRadians = (hue * Math.PI) / 180;
  const dotX = CIRCLE_RADIUS_PX * Math.cos(angleRadians);
  const dotY = CIRCLE_RADIUS_PX * Math.sin(angleRadians);

  return (
    <main
      className="flex items-center justify-center h-screen transition-colors duration-100 relative"
      style={{ backgroundColor: bgColor }}
      onClick={handleClick}
    >
      <div
        className="text-center text-xl font-bold drop-shadow z-10"
        style={{ color: textColor }}
      >
        <p>Hue: {Math.round(hue)}º</p>
        <p>Saturation: {saturation}%</p>
        <p>Lightness: {lightness}%</p>
      </div>

      <div
        className="absolute rounded-full border"
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
    </main>
  );
};

export default Test8;
