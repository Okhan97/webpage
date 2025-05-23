"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export const OverlayFade = () => {
  useEffect(() => {
    const overlay = document.getElementById("entry-overlay");
    if (!overlay) return;

    // Wait for next paint frame before triggering opacity transition
    requestAnimationFrame(() => {
      overlay.classList.remove("opacity-100");
      overlay.classList.add("opacity-0");

      overlay.addEventListener("transitionend", () => {
        overlay.remove();
      });
    });
  }, []);

  return (
    <div
      id="entry-overlay"
      className="fixed inset-0 bg-blue-500 z-50 transition-opacity duration-1000 opacity-100"
    />
  );
};

export const OverlayRipple = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const text = textRef.current;
    if (!overlay || !text) return;

    requestAnimationFrame(() => {
      overlay.classList.remove("scale-[4]");
      overlay.classList.add("scale-0");

      setTimeout(() => {
        text.classList.remove("opacity-100");
        text.classList.add("opacity-0");
      }, 300);

      const onTransitionEnd = () => overlay.remove();
      overlay.addEventListener("transitionend", onTransitionEnd);

      return () =>
        overlay.removeEventListener("transitionend", onTransitionEnd);
    });
  }, []);

  const pathname = usePathname();
  const hideOverlay = pathname.includes("test");

  if (hideOverlay) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden flex items-center justify-center text-center">
      <div
        ref={textRef}
        className="text-4xl lg:text-5xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10 pointer-events-none opacity-100 transition-opacity duration-[200ms] ease-in-out"
      >
        Ignacio Peñafiel
      </div>
      <div
        ref={overlayRef}
        className="absolute top-1/2 left-1/2 w-[100vw] h-[100vw] bg-blue-500 rounded-full transform scale-[4] transition-transform duration-[600ms] ease-in-out -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};
export const OverlayRippleHacky = () => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    el.classList.add("animate-scale-out");

    const handleEnd = () => el.remove();
    el.addEventListener("animationend", handleEnd);
    return () => el.removeEventListener("animationend", handleEnd);
  }, []);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div
        ref={overlayRef}
        className="absolute top-1/2 left-1/2 w-[1px] h-[1px] bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};
