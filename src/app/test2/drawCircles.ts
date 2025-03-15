import { Circle } from "@/types";
import { getSimilarRandomColor } from "@/utils/colors";
import { RefObject } from "react";

type DrawCirclesProps = {
  canvas: HTMLCanvasElement;
  circlesRefList: RefObject<Circle[]>[];
  color: string;
};
export const drawCircles = ({
  canvas,
  circlesRefList,
  color,
}: DrawCirclesProps): void => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circlesRefList.forEach((ref) => {
    ref.current.forEach(({ x, y, r }, i) => {
      let usedColor = color;
      if (i % 2) usedColor = getSimilarRandomColor(color, 50);
      //   if (i % 2) usedColor = getOppositeColor(color);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 4);
      ctx.fillStyle = usedColor;
      ctx.fill();
      ctx.closePath();
    });
  });
};
