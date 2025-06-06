"use client";
import { useEffect, useRef } from "react";
import { Scene, WebGLRenderer, Vector2 } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { createLightOrb, LightOrb } from "./components/LightOrb";
import { createCamera, setupCameraControls } from "./components/Camera";
import { createPlanet } from "./components/Planet";
import {
  MAX_RED_ORBS,
  ORBIT_RADIUS_WHITE,
  ORBIT_RADIUS_ORANGE,
  RED_ORB_ORBIT_SPEED_SLOW,
  RED_ORB_ORBIT_SPEED_FAST,
  RED_ORB_RADIUS,
  WHITE_ORB_STARTING_SPEED,
  ORANGE_ORB_STARTING_SPEED,
  PLANET_ROTATION_STARTING_SPEED,
} from "./constants";

const Test4 = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  let whiteOrbSpeed = WHITE_ORB_STARTING_SPEED;
  let orangeOrbSpeed = ORANGE_ORB_STARTING_SPEED;
  let planetRotationSpeed = PLANET_ROTATION_STARTING_SPEED; // Starting speed for planet rotation

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new Scene();
    const camera = createCamera(mount.clientWidth / mount.clientHeight, {
      x: 0,
      y: 0,
      z: 5,
    });

    const { updateCameraPosition, cleanup: cleanupCameraControls } =
      setupCameraControls(camera, mount);

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new Vector2(mount.clientWidth, mount.clientHeight),
      2,
      0.6,
      0.9
    );
    composer.addPass(bloomPass);

    const dodecahedron = createPlanet();
    scene.add(dodecahedron);

    const lightOrbWhite = createLightOrb(0xffffff, 15);
    const lightOrbOrange = createLightOrb(0xffaa00, 75);
    scene.add(lightOrbWhite);
    scene.add(lightOrbOrange);

    let angleWhite = 0;
    let angleOrange = 0;
    let tiltAngle = 0;
    let isPaused = false;

    const redOrbs: (LightOrb | undefined)[] = [];
    const redOrbRadius = 1.5;
    let redOrbGlobalAngle = 0;
    let redOrbOrbitSpeed = RED_ORB_ORBIT_SPEED_SLOW;
    let redOrbStep = 0;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        whiteOrbSpeed *= 1.2;
        orangeOrbSpeed *= 1.2;
        planetRotationSpeed *= 1.2;
      } else if (event.key === "ArrowDown") {
        whiteOrbSpeed *= 0.8;
        orangeOrbSpeed *= 0.8;
        planetRotationSpeed *= 0.8;
      } else if (event.key === " ") {
        isPaused = !isPaused;
      } else if (event.key === "ArrowRight") {
        if (
          redOrbs.length >= MAX_RED_ORBS &&
          redOrbs.every((orb) => orb !== undefined)
        )
          return;
        for (let i = 0; i < 3; i++) {
          const orbIndex = (redOrbStep + i * 10) % MAX_RED_ORBS;
          if (!redOrbs[orbIndex]) {
            const redOrb = createLightOrb(0xff0000, 0.2, RED_ORB_RADIUS);
            const angleOffset = (orbIndex / MAX_RED_ORBS) * Math.PI * 2;
            redOrb.position.set(
              Math.cos(angleOffset) * redOrbRadius,
              0,
              Math.sin(angleOffset) * redOrbRadius
            );
            redOrb.updatePosition = (x, y, z) => {
              redOrb.position.set(x, y, z);
            };

            redOrbs[orbIndex] = redOrb;
            scene.add(redOrb);
          }
        }
        redOrbStep = (redOrbStep + 1) % 10;

        if (redOrbs.filter(Boolean).length === MAX_RED_ORBS) {
          redOrbOrbitSpeed = RED_ORB_ORBIT_SPEED_FAST;
        }
      } else if (event.key === "ArrowLeft") {
        if (redOrbs.every((orb) => orb === undefined)) return;
        for (let i = 0; i < 3; i++) {
          const orbIndex =
            (redOrbStep - 1 + i * 10 + MAX_RED_ORBS) % MAX_RED_ORBS;
          const redOrb = redOrbs[orbIndex];
          if (redOrb) {
            scene.remove(redOrb);
            redOrbs[orbIndex] = undefined;
          }
        }
        redOrbStep = (redOrbStep - 1 + 10) % 10;

        if (redOrbs.filter(Boolean).length < MAX_RED_ORBS)
          redOrbOrbitSpeed = RED_ORB_ORBIT_SPEED_SLOW;
      }

      whiteOrbSpeed = Math.min(whiteOrbSpeed, 0.06);
      orangeOrbSpeed = Math.min(orangeOrbSpeed, 0.04);
      planetRotationSpeed = Math.min(planetRotationSpeed, 0.02);
    };

    window.addEventListener("keydown", handleKeyDown);

    let frameId: number;
    const animate = () => {
      if (!isPaused) {
        dodecahedron.rotation.x += planetRotationSpeed;
        dodecahedron.rotation.y += planetRotationSpeed;

        angleWhite += whiteOrbSpeed;
        angleOrange += orangeOrbSpeed;
        tiltAngle += 0.0005;

        if (lightOrbWhite?.updatePosition)
          lightOrbWhite.updatePosition(
            Math.cos(angleWhite) * ORBIT_RADIUS_WHITE,
            Math.sin(tiltAngle) * ORBIT_RADIUS_WHITE * 0.5,
            Math.sin(angleWhite) * ORBIT_RADIUS_WHITE
          );

        if (lightOrbOrange?.updatePosition)
          lightOrbOrange.updatePosition(
            Math.cos(-angleOrange) * ORBIT_RADIUS_ORANGE,
            Math.sin(-tiltAngle) * ORBIT_RADIUS_ORANGE * 0.5,
            Math.sin(-angleOrange) * ORBIT_RADIUS_ORANGE
          );

        redOrbGlobalAngle += redOrbOrbitSpeed;
        redOrbs.forEach((redOrb, index) => {
          if (redOrb) {
            const angleOffset = (index / MAX_RED_ORBS) * Math.PI * 2;
            redOrb.updatePosition!(
              Math.cos(redOrbGlobalAngle + angleOffset) * redOrbRadius,
              redOrb.position.y,
              Math.sin(redOrbGlobalAngle + angleOffset) * redOrbRadius
            );
          }
        });
      }

      updateCameraPosition();

      composer.render();
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      composer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      cleanupCameraControls();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="flex-1 w-full h-full" />;
};

export default Test4;
