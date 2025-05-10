"use client";

import { Button, Checkbox, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { ChromePicker } from "react-color";

const DEFAULT_INTERVAL_MS = 1000;
const DEFAULT_CIRCLE_RADIUS = 1;

type ControllerBarProps = {
  intervalMs: {
    get: number;
    set: Dispatch<SetStateAction<number>>;
  };
  circleRadius: {
    get: number;
    set: Dispatch<SetStateAction<number>>;
  };
  color: {
    get: string;
    set: Dispatch<SetStateAction<string>>;
  };
  iterateRandom: {
    get: boolean;
    set: Dispatch<SetStateAction<boolean>>;
  };
  nCircles: {
    get: number;
    set: Dispatch<SetStateAction<number>>;
  };
};

const ControllerBar = ({
  intervalMs,
  circleRadius,
  color,
  iterateRandom,
}: ControllerBarProps) => {
  const [openColorPicker, setOpenColorPicker] = useState(false);

  return (
    <div className="flex gap-4 px-8 py-4 relative z-10 bg-neutral-600">
      <div className="flex items-center">
        <Checkbox
          title="wena"
          checked={iterateRandom.get}
          onChange={() => iterateRandom.set(!iterateRandom.get)}
        />
        <div>Iterate random color</div>
      </div>
      <TextField
        disabled={!iterateRandom.get}
        label="Interval (ms)"
        type="number"
        value={isNaN(intervalMs.get) ? "" : intervalMs.get}
        onChange={(e) => {
          if (e.target.value === "") {
            intervalMs.set(NaN);
            return;
          }
          const newValue = parseInt(e.target.value);
          if (!isNaN(newValue)) intervalMs.set(newValue);
        }}
        onBlur={() => {
          if (isNaN(intervalMs.get)) intervalMs.set(DEFAULT_INTERVAL_MS);
        }}
      />
      <TextField
        label="Circle Radius (px)"
        type="number"
        value={isNaN(circleRadius.get) ? "" : circleRadius.get}
        onChange={(e) => {
          if (e.target.value === "") {
            circleRadius.set(NaN);
            return;
          }
          const newValue = parseInt(e.target.value);
          if (!isNaN(newValue)) circleRadius.set(newValue);
        }}
        onBlur={() => {
          if (isNaN(circleRadius.get)) circleRadius.set(DEFAULT_CIRCLE_RADIUS);
        }}
      />
      <div className="relative">
        <Button onClick={() => setOpenColorPicker(!openColorPicker)}>
          Pick color
        </Button>
        {openColorPicker && (
          <ChromePicker
            className="absolute"
            color={color.get}
            onChange={(e) => color.set(e.hex)}
          />
        )}
      </div>
    </div>
  );
};

export default ControllerBar;
