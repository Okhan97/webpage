"use client";

import { useEffect } from "react";

const LocationLogger = () => {
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Latitude:", position.coords.latitude);
          console.log("Longitude:", position.coords.longitude);
        },
        (error) => {
          console.error("Geolocation error:", error.message);
        }
      );
    } else {
      console.warn("Geolocation not supported");
    }
  }, []);

  return null;
};

export default LocationLogger;
