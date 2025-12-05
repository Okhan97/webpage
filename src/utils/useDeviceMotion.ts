import { useEffect, useState, useCallback } from "react";

export const useDeviceMotion = () => {
  const [acceleration, setAcceleration] = useState<{
    x: number;
    y: number;
    z: number;
  } | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const requestPermission = useCallback(async () => {
    if (typeof DeviceMotionEvent === "undefined") {
      return false;
    }

    const DeviceMotionEventiOS = DeviceMotionEvent as unknown as {
      requestPermission?: () => Promise<"granted" | "denied">;
    };

    if (typeof DeviceMotionEventiOS.requestPermission === "function") {
      // iOS 13+ - need explicit permission
      try {
        const permission = await DeviceMotionEventiOS.requestPermission();
        const granted = permission === "granted";
        setPermissionGranted(granted);
        return granted;
      } catch (error) {
        console.error("Error requesting device motion permission:", error);
        return false;
      }
    } else {
      // Non-iOS or older iOS - permission not needed
      setPermissionGranted(true);
      return true;
    }
  }, []);

  useEffect(() => {
    const handleMotion = (event: DeviceMotionEvent) => {
      const acc = event.accelerationIncludingGravity;
      if (acc) {
        setAcceleration({
          x: acc.x ?? 0,
          y: acc.y ?? 0,
          z: acc.z ?? 0,
        });
      }
    };

    if (permissionGranted) {
      window.addEventListener("devicemotion", handleMotion);

      return () => {
        window.removeEventListener("devicemotion", handleMotion);
      };
    }
  }, [permissionGranted]);

  // Auto-request permission for non-iOS devices
  useEffect(() => {
    if (typeof DeviceMotionEvent !== "undefined") {
      const DeviceMotionEventiOS = DeviceMotionEvent as unknown as {
        requestPermission?: () => Promise<"granted" | "denied">;
      };

      if (typeof DeviceMotionEventiOS.requestPermission !== "function") {
        // Not iOS - grant permission automatically
        setPermissionGranted(true);
      }
    }
  }, []);

  return { acceleration, permissionGranted, requestPermission };
};
