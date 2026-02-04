import { Particle } from "./types";

export const createParticle = (width: number, height: number): Particle => {
  const speed = 0.4 + Math.random() * 1.2;
  const angle = Math.random() * Math.PI * 2;
  return {
    x: width / 2,
    y: height / 2,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 0,
    ttl: 120 + Math.random() * 120,
    size: 1 + Math.random() * 2.5,
    hue: 190 + Math.random() * 80,
  };
};
