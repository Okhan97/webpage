"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useDeviceOrientation } from "@/utils/useDeviceOrientation";
import { setupScene } from "./sceneSetup";

const Test9 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRefs = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    cube: THREE.Mesh;
  } | null>(null);

  const { alpha, beta, gamma } = useDeviceOrientation();

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;

    const refs = setupScene(canvasRef.current);
    sceneRefs.current = refs;

    // Initial render
    refs.renderer.render(refs.scene, refs.camera);

    // Handle resize
    const handleResize = () => {
      refs.camera.aspect = window.innerWidth / window.innerHeight;
      refs.camera.updateProjectionMatrix();
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.renderer.render(refs.scene, refs.camera);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      refs.renderer.dispose();
    };
  }, []);

  // Update cube rotation based on device orientation
  useEffect(() => {
    if (!sceneRefs.current) return;

    const { cube, renderer, scene, camera } = sceneRefs.current;

    if (beta !== null) {
      cube.rotation.x = (beta * Math.PI) / 180;
    }
    if (gamma !== null) {
      cube.rotation.y = (gamma * Math.PI) / 180;
    }
    if (alpha !== null) {
      cube.rotation.z = (alpha * Math.PI) / 180;
    }

    renderer.render(scene, camera);
  }, [alpha, beta, gamma]);

  return (
    <div className="flex flex-1 flex-col">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Test9;
