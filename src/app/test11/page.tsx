"use client";

import { useEffect, useRef } from "react";
import { EffectPipeline } from "./effects";
import { ParticleEffect } from "./effects/ParticleEffect";
import { PARTICLE_COUNT } from "./constants";

const Test11 = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const pipeline = new EffectPipeline();
    pipeline.add(new ParticleEffect(PARTICLE_COUNT));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0c0f14";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      pipeline.update(canvas.width, canvas.height);
      pipeline.render(ctx);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      pipeline.cleanup();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
};

export default Test11;
