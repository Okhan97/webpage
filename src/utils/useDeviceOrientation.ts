import { useEffect, useState } from "react";

export const useDeviceOrientation = () => {
  const [alpha, setAlpha] = useState<number | null>(null);
  const [beta, setBeta] = useState<number | null>(null);
  const [gamma, setGamma] = useState<number | null>(null);

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      setAlpha(event.alpha);
      setBeta(event.beta);
      setGamma(event.gamma);
    };

    window.addEventListener("deviceorientation", handleOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  return { alpha, beta, gamma };
};
