"use client";
import { useEffect, useRef, useState } from "react";

const Test5 = () => {
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollTop = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const rotationDegree = (scrollTop / maxScroll) * 360;

      setRotation(rotationDegree);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex-1 w-full h-full">
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        Scroll to Rotate Me!
      </div>
      <div style={{ height: "200vh" }}></div>
    </div>
  );
};

export default Test5;
