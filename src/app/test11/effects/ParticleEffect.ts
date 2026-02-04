import { Effect } from "./index";
import { Particle } from "../types";
import { createParticle } from "../helpers";

export class ParticleEffect implements Effect {
  private particles: Particle[];
  private particleCount: number;

  constructor(particleCount: number) {
    this.particleCount = particleCount;
    this.particles = [];
  }

  setParticleCount(count: number): void {
    this.particleCount = count;
  }

  private initParticles(width: number, height: number): void {
    this.particles = Array.from({ length: this.particleCount }, () =>
      createParticle(width, height)
    );
  }

  update(width: number, height: number): void {
    // Adjust particle array size to match target count
    while (this.particles.length < this.particleCount) {
      this.particles.push(createParticle(width, height));
    }
    while (this.particles.length > this.particleCount) {
      this.particles.pop();
    }

    for (let i = 0; i < this.particles.length; i += 1) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life += 1;

      if (p.life >= p.ttl) {
        this.particles[i] = createParticle(width, height);
      }
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    for (const p of this.particles) {
      const alpha = Math.max(0, 1 - p.life / p.ttl);
      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${alpha})`;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
