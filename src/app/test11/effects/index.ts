export interface Effect {
  update(width: number, height: number): void;
  render(ctx: CanvasRenderingContext2D): void;
  cleanup?(): void;
}

export class EffectPipeline {
  private effects: Effect[] = [];

  add(effect: Effect): void {
    this.effects.push(effect);
  }

  update(width: number, height: number): void {
    this.effects.forEach((effect) => effect.update(width, height));
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.effects.forEach((effect) => effect.render(ctx));
  }

  cleanup(): void {
    this.effects.forEach((effect) => effect.cleanup?.());
    this.effects = [];
  }
}
