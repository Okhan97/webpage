"use client";
import { useState, useEffect } from "react";

const coordsToPercentage = (coords: { x: number; y: number }) => {
  const { innerWidth, innerHeight } = window;
  return {
    x: Math.round((coords.x / innerWidth) * 100),
    y: Math.round(((innerHeight - coords.y) / innerHeight) * 100),
  };
};
const Test8 = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hue, _setHue] = useState(200);
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

  const { x, y } = coordsToPercentage(coords);

  return (
    <main
      className="flex items-center justify-center h-screen transition-colors duration-100"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="text-center text-xl font-bold drop-shadow"
        style={{ color: textColor }}
      >
        Saturation: {x}% <br /> Lightness: {y}%
      </div>
    </main>
  );
};

export default Test8;
