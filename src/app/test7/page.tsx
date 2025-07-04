"use client";
import { useEffect, useRef, useState } from "react";

const COLLISION_THRESHOLD = 10; // Distance to consider a collision

const Page = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [redDotPosition, setRedDotPosition] = useState({ x: 0, y: 0 });
  const [blueDotPosition, setBlueDotPosition] = useState({ x: 0, y: 0 });
  const [centralDotColor, setCentralDotColor] = useState("black");
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBlueDotPosition({
        x: window.innerWidth,
        y: window.innerHeight,
      });
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const animateDots = () => {
      const moveDot = (
        dotPosition: { x: number; y: number },
        targetPosition: { x: number; y: number }
      ) => {
        const dx = targetPosition.x - dotPosition.x;
        const dy = targetPosition.y - dotPosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 1) {
          const speed = 2; // Constant speed
          const angle = Math.atan2(dy, dx);
          return {
            x: dotPosition.x + Math.cos(angle) * speed,
            y: dotPosition.y + Math.sin(angle) * speed,
          };
        }
        return dotPosition;
      };

      const checkCollision = () => {
        const dx = redDotPosition.x - blueDotPosition.x;
        const dy = redDotPosition.y - blueDotPosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < 4; // Collision threshold (dot size)
      };

      if (checkCollision()) {
        setRedDotPosition({ x: 0, y: 0 });
        if (typeof window !== "undefined") {
          setBlueDotPosition({ x: window.innerWidth, y: window.innerHeight });
        }
      } else {
        setRedDotPosition((prev) => moveDot(prev, cursorPosition));
        setBlueDotPosition((prev) => moveDot(prev, cursorPosition));
      }

      animationRef.current = requestAnimationFrame(animateDots);
    };

    animationRef.current = requestAnimationFrame(animateDots);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [cursorPosition, redDotPosition, blueDotPosition]);

  useEffect(() => {
    const checkCursorTouch = () => {
      const isTouching = (dotPosition: { x: number; y: number }) => {
        const dx = cursorPosition.x - dotPosition.x;
        const dy = cursorPosition.y - dotPosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < COLLISION_THRESHOLD; // Collision threshold (dot size)
      };

      if (isTouching(redDotPosition)) {
        setCentralDotColor("bg-red-500");
      } else if (isTouching(blueDotPosition)) {
        setCentralDotColor("bg-blue-500");
      } else {
        setCentralDotColor("bg-black");
      }
    };

    checkCursorTouch();
  }, [cursorPosition, redDotPosition, blueDotPosition]);

  return (
    <main className="flex min-h-screen items-center justify-center relative">
      <div className={`w-16 h-16 rounded-full ${centralDotColor}`} />
      <div
        className="w-4 h-4 bg-red-500 fixed rounded-full pointer-events-none"
        style={{ left: redDotPosition.x, top: redDotPosition.y }}
      />
      <div
        className="w-4 h-4 bg-blue-500 fixed rounded-full pointer-events-none"
        style={{ left: blueDotPosition.x, top: blueDotPosition.y }}
      />
    </main>
  );
};

export default Page;
