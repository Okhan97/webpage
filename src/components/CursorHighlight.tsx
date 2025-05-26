"use client";

import { useEffect, useRef } from "react";

export const CursorHighlight = () => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const overlay = overlayRef.current;
      if (overlay) {
        overlay.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.1), transparent 70%)`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed pointer-events-none top-0 left-0 w-screen h-screen z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_80%)]"
    />
  );
};
