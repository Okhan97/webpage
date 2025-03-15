export const getRandomColor = (): string =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;

export const getSimilarRandomColor = (
  baseColor: string,
  variation: number = 30
): string => {
  if (!/^#([0-9A-F]{3}){1,2}$/i.test(baseColor))
    throw new Error("Invalid base color format. Use a valid hex color.");

  const clamp = (value: number) => Math.max(0, Math.min(255, value));

  let r = parseInt(baseColor.slice(1, 3), 16);
  let g = parseInt(baseColor.slice(3, 5), 16);
  let b = parseInt(baseColor.slice(5, 7), 16);

  r = clamp(r + Math.floor((Math.random() * 2 - 1) * variation));
  g = clamp(g + Math.floor((Math.random() * 2 - 1) * variation));
  b = clamp(b + Math.floor((Math.random() * 2 - 1) * variation));

  const hex = (c: number) => c.toString(16).padStart(2, "0");

  return `#${hex(r)}${hex(g)}${hex(b)}`;
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
