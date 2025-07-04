export const coordsToPercentage = (coords: { x: number; y: number }) => {
  const { innerWidth, innerHeight } = window;
  return {
    x: Math.round((coords.x / innerWidth) * 100),
    y: Math.round(((innerHeight - coords.y) / innerHeight) * 100),
  };
};

export const getAngleFromCenter = (x: number, y: number): number => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const deltaX = x - centerX;
  const deltaY = y - centerY;
  const angleRadians = Math.atan2(deltaY, deltaX);
  let angleDegrees = (angleRadians * 180) / Math.PI;
  if (angleDegrees < 0) angleDegrees += 360;
  return angleDegrees;
};
