"use client";

import { useEffect, useRef, useState } from "react";
import { EffectPipeline } from "./effects";
import { ParticleEffect } from "./effects/ParticleEffect";
import { PARTICLE_COUNT } from "./constants";

const MAX_PARTICLES = 400;

const Test11 = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const [particleCount, setParticleCount] = useState(PARTICLE_COUNT);
  const particleEffectRef = useRef<ParticleEffect | null>(null);

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
    const particleEffect = new ParticleEffect(particleCount);
    particleEffectRef.current = particleEffect;
    pipeline.add(particleEffect);

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
  }, [particleCount]);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/20">
        <label className="flex flex-col gap-2 text-white/90 text-sm">
          <span>Particles: {particleCount}</span>
          <input
            type="range"
            min="0"
            max={MAX_PARTICLES}
            value={particleCount}
            onChange={(e) => setParticleCount(Number(e.target.value))}
            className="w-48 cursor-pointer"
          />
        </label>
      </div>
    </>
  );
};

export default Test11;
