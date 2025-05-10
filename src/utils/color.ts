export const getRandomColor = (): string =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;

export const getSimilarRandomColor = (
  baseColor: string,
  hueVariation: number = 15,
  satVariation: number = 10,
  lightVariation: number = 10
): string => {
  if (!/^#([0-9A-F]{6})$/i.test(baseColor))
    throw new Error("Invalid base color format. Use a full 6-digit hex color.");

  const r = parseInt(baseColor.slice(1, 3), 16) / 255;
  const g = parseInt(baseColor.slice(3, 5), 16) / 255;
  const b = parseInt(baseColor.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  }

  const clamp = (val: number, min: number, max: number) =>
    Math.max(min, Math.min(max, val));

  h = (h + (Math.random() * 2 - 1) * hueVariation + 360) % 360;
  s = clamp(s * 100 + (Math.random() * 2 - 1) * satVariation, 0, 100);
  l = clamp(l * 100 + (Math.random() * 2 - 1) * lightVariation, 0, 100);

  s /= 100;
  l /= 100;

  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  const rFinal = Math.round(f(0) * 255);
  const gFinal = Math.round(f(8) * 255);
  const bFinal = Math.round(f(4) * 255);

  const hex = (c: number) => c.toString(16).padStart(2, "0");

  return `#${hex(rFinal)}${hex(gFinal)}${hex(bFinal)}`;
};
export const getOppositeColor = (color: string): string => {
  if (!/^#([0-9A-F]{3}){1,2}$/i.test(color))
    throw new Error("Invalid base color format. Use a valid hex color.");

  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  const oppositeR = (255 - r).toString(16).padStart(2, "0");
  const oppositeG = (255 - g).toString(16).padStart(2, "0");
  const oppositeB = (255 - b).toString(16).padStart(2, "0");

  return `#${oppositeR}${oppositeG}${oppositeB}`;
};

type GenerateColorFromSpeedProps = {
  speed: number;
  minSpeed: number;
  maxSpeed: number;
  reverse?: boolean;
};

export const generateColorFromSpeed = ({
  speed,
  minSpeed,
  maxSpeed,
  reverse = false,
}: GenerateColorFromSpeedProps): string => {
  const minColor = [15, 23, 42]; // Darkest blue (#0f172a)
  const maxColor = [96, 165, 250]; // Lightest blue (#60a5fa)

  let normalizedSpeed = (speed - minSpeed) / (maxSpeed - minSpeed);

  // Reverse the normalization if reverse === true
  if (reverse) {
    normalizedSpeed = 1 - normalizedSpeed;
  }

  const r = Math.round(
    minColor[0] + (maxColor[0] - minColor[0]) * normalizedSpeed
  );
  const g = Math.round(
    minColor[1] + (maxColor[1] - minColor[1]) * normalizedSpeed
  );
  const b = Math.round(
    minColor[2] + (maxColor[2] - minColor[2]) * normalizedSpeed
  );

  return `rgb(${r}, ${g}, ${b})`;
};
