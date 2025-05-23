"use client";

import { useEffect, useRef } from "react";

export const ClickRipple = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isRipplingRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      if (isRipplingRef.current) return;
      isRipplingRef.current = true;
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
        transition: "transform 4s ease-out, opacity 3s ease-out",
        background: "transparent",
      });

      container.appendChild(ripple);

      requestAnimationFrame(() => {
        ripple.style.transform = "scale(1)";
        ripple.style.opacity = "0";
      });

      ripple.addEventListener("transitionend", () => {
        ripple.remove();
        isRipplingRef.current = false;
      });
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden w-full h-full z-0"
    />
  );
};
