"use client";
import { useEffect, useRef } from "react";
import { Scene, WebGLRenderer, Vector2 } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { createLightOrb } from "./components/LightOrb";
import { createCamera, setupCameraControls } from "./components/Camera";
import { createPlanet } from "./components/Planet";

let ORBIT_SPEED_WHITE = 0.006;
let ORBIT_SPEED_ORANGE = 0.004;
let PLANET_ROTATION_SPEED = 0.002;

const ORBIT_RADIUS_WHITE = 3;
const ORBIT_RADIUS_ORANGE = 5;

const Test4 = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);

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

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        ORBIT_SPEED_WHITE *= 1.2;
        ORBIT_SPEED_ORANGE *= 1.2;
        PLANET_ROTATION_SPEED *= 1.2;
      } else if (event.key === "ArrowDown") {
        ORBIT_SPEED_WHITE *= 0.8;
        ORBIT_SPEED_ORANGE *= 0.8;
        PLANET_ROTATION_SPEED *= 0.8;
      }

      ORBIT_SPEED_WHITE = Math.min(ORBIT_SPEED_WHITE, 0.06);
      ORBIT_SPEED_ORANGE = Math.min(ORBIT_SPEED_ORANGE, 0.04);
      PLANET_ROTATION_SPEED = Math.min(PLANET_ROTATION_SPEED, 0.02);
    };

    window.addEventListener("keydown", handleKeyDown);

    let frameId: number;
    const animate = () => {
      dodecahedron.rotation.x += PLANET_ROTATION_SPEED;
      dodecahedron.rotation.y += PLANET_ROTATION_SPEED;

      angleWhite += ORBIT_SPEED_WHITE;
      angleOrange += ORBIT_SPEED_ORANGE;
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

      // Update camera position
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
