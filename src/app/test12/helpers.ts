export const drawCheckerboard = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cellSize: number = 1
): void => {
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      const cellX = Math.floor(x / cellSize);
      const cellY = Math.floor(y / cellSize);
      const isWhite = (cellX + cellY) % 2 === 0;
      const color = isWhite ? 255 : 0;

      data[index] = color; // R
      data[index + 1] = color; // G
      data[index + 2] = color; // B
      data[index + 3] = 255; // A
    }
  }

  ctx.putImageData(imageData, 0, 0);
};
