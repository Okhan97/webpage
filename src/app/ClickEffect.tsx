"use client";

import { useEffect, useRef } from "react";

export const ClickRipple = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      const ripple = document.createElement("div");

      const size = 1500;
      const x = e.clientX + scrollX - size / 2;
      const y = e.clientY + scrollY - size / 2;

      Object.assign(ripple.style, {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        border: "2px solid rgba(255, 255, 255, 0.9)",
        pointerEvents: "none",
        zIndex: "0",
        transform: "scale(0)",
        opacity: "1",
        transition: "transform 20s ease-out, opacity 6s ease-out",
        background: "transparent",
      });

      document.body.appendChild(ripple);

      requestAnimationFrame(() => {
        ripple.style.transform = "scale(10)";
        ripple.style.opacity = "0";
      });

      ripple.addEventListener("transitionend", () => {
        ripple.remove();
      });
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
    />
  );
};
