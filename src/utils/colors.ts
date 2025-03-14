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

  let r = parseInt(baseColor.slice(1, 3), 16);
  let g = parseInt(baseColor.slice(3, 5), 16);
  let b = parseInt(baseColor.slice(5, 7), 16);
  r = Math.max(0, Math.min(255, r + (Math.random() * 2 - 1) * variation));
  g = Math.max(0, Math.min(255, g + (Math.random() * 2 - 1) * variation));
  b = Math.max(0, Math.min(255, b + (Math.random() * 2 - 1) * variation));
  const hex = (c: number) => Math.round(c).toString(16).padStart(2, "0");

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
