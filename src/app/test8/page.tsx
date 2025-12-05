"use client";

import { useDeviceOrientation } from "@/utils/useDeviceOrientation";

const Test8 = () => {
  const { alpha, beta, gamma, permissionGranted, requestPermission } =
    useDeviceOrientation();

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8">
      {!permissionGranted && (
        <button
          onClick={requestPermission}
          className="mb-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold"
        >
          Enable Motion Sensors
        </button>
      )}

      <h1 className="text-4xl font-bold mb-8">Motion Sensors</h1>

      <div className="space-y-6 text-center">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg min-w-[300px]">
          <h2 className="text-xl font-semibold mb-2">Alpha (Z-axis)</h2>
          <p className="text-3xl font-mono">{alpha?.toFixed(1) ?? "—"}°</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Rotation around Z-axis (0-360)
          </p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg min-w-[300px]">
          <h2 className="text-xl font-semibold mb-2">Beta (X-axis)</h2>
          <p className="text-3xl font-mono">{beta?.toFixed(1) ?? "—"}°</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Front-to-back tilt (-180 to 180)
          </p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg min-w-[300px]">
          <h2 className="text-xl font-semibold mb-2">Gamma (Y-axis)</h2>
          <p className="text-3xl font-mono">{gamma?.toFixed(1) ?? "—"}°</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Left-to-right tilt (-90 to 90)
          </p>
        </div>
      </div>

      <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        Tilt your device to see the motion sensors in action
      </p>
    </div>
  );
};

export default Test8;
