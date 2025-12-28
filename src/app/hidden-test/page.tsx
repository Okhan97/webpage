"use client";

import { useEffect, useState } from "react";
import {
  detectBrowser,
  detectDeviceType,
  detectLanguage,
  detectOS,
  detectScreenDimensions,
} from "@/utils/deviceDetection";

const HiddenTestPage = () => {
  const [deviceType, setDeviceType] = useState<string>("Detecting...");
  const [osInfo, setOsInfo] = useState<string>("Detecting...");
  const [browserInfo, setBrowserInfo] = useState<string>("Detecting...");
  const [language, setLanguage] = useState<string>("Detecting...");
  const [screenDimensions, setScreenDimensions] =
    useState<string>("Detecting...");

  useEffect(() => {
    const userAgent = navigator.userAgent;

    setDeviceType(detectDeviceType(userAgent));
    setOsInfo(detectOS(userAgent));
    setBrowserInfo(detectBrowser(userAgent));
    setLanguage(detectLanguage());
    setScreenDimensions(detectScreenDimensions());
  }, []);

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Device Detection</h1>
        <div className="space-y-4">
          <p className="text-2xl text-gray-600 dark:text-gray-400">
            Device Type:{" "}
            <span className="font-bold text-gray-900 dark:text-white">
              {deviceType}
            </span>
          </p>
          <p className="text-2xl text-gray-600 dark:text-gray-400">
            Operating System:{" "}
            <span className="font-bold text-gray-900 dark:text-white">
              {osInfo}
            </span>
          </p>
          <p className="text-2xl text-gray-600 dark:text-gray-400">
            Browser:{" "}
            <span className="font-bold text-gray-900 dark:text-white">
              {browserInfo}
            </span>
          </p>
          <p className="text-2xl text-gray-600 dark:text-gray-400">
            You speak{" "}
            <span className="font-bold text-gray-900 dark:text-white">
              {language}
            </span>
          </p>
          <p className="text-2xl text-gray-600 dark:text-gray-400">
            Screen:{" "}
            <span className="font-bold text-gray-900 dark:text-white">
              {screenDimensions}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HiddenTestPage;
