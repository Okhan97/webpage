import { useEffect, useState, useCallback } from "react";

export const useDeviceOrientation = () => {
  const [alpha, setAlpha] = useState<number | null>(null);
  const [beta, setBeta] = useState<number | null>(null);
  const [gamma, setGamma] = useState<number | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const requestPermission = useCallback(async () => {
    if (typeof DeviceOrientationEvent === "undefined") {
      return false;
    }

    const DeviceOrientationEventiOS = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<"granted" | "denied">;
    };

    if (typeof DeviceOrientationEventiOS.requestPermission === "function") {
      // iOS 13+ - need explicit permission
      try {
        const permission = await DeviceOrientationEventiOS.requestPermission();
        const granted = permission === "granted";
        setPermissionGranted(granted);
        return granted;
      } catch (error) {
        console.error("Error requesting device orientation permission:", error);
        return false;
      }
    } else {
      // Non-iOS or older iOS - permission not needed
      setPermissionGranted(true);
      return true;
    }
  }, []);

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      setAlpha(event.alpha);
      setBeta(event.beta);
      setGamma(event.gamma);
    };

    if (permissionGranted) {
      window.addEventListener("deviceorientation", handleOrientation);

      return () => {
        window.removeEventListener("deviceorientation", handleOrientation);
      };
    }
  }, [permissionGranted]);

  // Auto-request permission for non-iOS devices
  useEffect(() => {
    if (typeof DeviceOrientationEvent !== "undefined") {
      const DeviceOrientationEventiOS = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<"granted" | "denied">;
      };

      if (typeof DeviceOrientationEventiOS.requestPermission !== "function") {
        // Not iOS - grant permission automatically
        setPermissionGranted(true);
      }
    }
  }, []);

  return { alpha, beta, gamma, permissionGranted, requestPermission };
};
