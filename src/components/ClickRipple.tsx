"use client";

import { useEffect, useRef } from "react";

type ClickRippleProps = {
  maxRipples?: number;
  rippleSize?: number;
  rippleBorder?: number;
  rippleTime?: number;
};

export const ClickRipple = ({
  maxRipples = 3,
  rippleSize = 1500,
  rippleBorder = 2,
  rippleTime = 3,
}: ClickRippleProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rippleCountRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      if (rippleCountRef.current >= maxRipples) return;
      rippleCountRef.current += 1;
      const ripple = document.createElement("div");

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rippleSize / 2;
      const y = e.clientY - rect.top - rippleSize / 2;

      Object.assign(ripple.style, {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: `${rippleSize}px`,
        height: `${rippleSize}px`,
        borderRadius: "50%",
        border: `${rippleBorder}px solid rgba(255, 255, 255, 0.9)`,
        pointerEvents: "none",
        zIndex: "0",
        transform: "scale(0)",
        opacity: "1",
        transition: `transform ${
          rippleTime + 1
        }s ease-out, opacity ${rippleTime}s ease-out`,
        background: "transparent",
      });

      container.appendChild(ripple);

      requestAnimationFrame(() => {
        ripple.style.transform = "scale(1)";
        ripple.style.opacity = "0";
      });

      ripple.addEventListener("transitionend", () => {
        ripple.remove();
        rippleCountRef.current -= 1;
      });
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [maxRipples, rippleBorder, rippleSize, rippleTime]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden w-full h-full z-0"
    />
  );
};
