"use client";
import { useEffect, useRef } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  MeshStandardMaterial,
  Mesh,
  Vector2,
  EdgesGeometry,
  LineSegments,
  LineBasicMaterial,
  IcosahedronGeometry,
  PointLight,
} from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { createLightOrb } from "./components/LightOrb";

const BASE_COLOR = "#c4c4c4";

const ORBIT_SPEED_WHITE = 0.006;
const ORBIT_SPEED_ORANGE = 0.004;
const CUBE_ROTATION_SPEED = 0.002;
const ORBIT_RADIUS_WHITE = 3;
const ORBIT_RADIUS_ORANGE = 5;

const CAMERA_ROTATION_SPEED = 0.005;

const Test4 = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new Vector2(mount.clientWidth, mount.clientHeight),
      1.5,
      0.4,
      0.85
    );
    composer.addPass(bloomPass);

    const geometry = new IcosahedronGeometry(1, 2);
    const material = new MeshStandardMaterial({
      color: BASE_COLOR,
      emissive: 0x000000,
      emissiveIntensity: 0.1,
    });
    const dodecahedron = new Mesh(geometry, material);
    scene.add(dodecahedron);

    const edges = new EdgesGeometry(geometry);
    const edgeMaterial = new LineBasicMaterial({ color: 0xffffff });
    const edgeLines = new LineSegments(edges, edgeMaterial);
    dodecahedron.add(edgeLines);

    const vertices = geometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      if (Math.random() <= 0.05) {
        const x = vertices[i];
        const y = vertices[i + 1];
        const z = vertices[i + 2];

        const vertexLight = new PointLight("#3185FC", 0.2);
        vertexLight.position.set(x, y, z);
        dodecahedron.add(vertexLight);
      }
    }

    const lightOrbWhite = createLightOrb(0xffffff, 15);
    const lightOrbOrange = createLightOrb(0xffaa00, 10);
    scene.add(lightOrbWhite);
    scene.add(lightOrbOrange);

    let angleWhite = 0;
    let angleOrange = 0;
    let tiltAngle = 0;

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const cameraRotation = { x: 0, y: 0 };

    const onMouseDown = (event: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: event.clientX, y: event.clientY };
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = event.clientX - previousMousePosition.x;
      const deltaY = event.clientY - previousMousePosition.y;

      cameraRotation.x -= deltaY * CAMERA_ROTATION_SPEED;
      cameraRotation.y -= deltaX * CAMERA_ROTATION_SPEED;

      previousMousePosition = { x: event.clientX, y: event.clientY };
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    mount.addEventListener("mousedown", onMouseDown);
    mount.addEventListener("mousemove", onMouseMove);
    mount.addEventListener("mouseup", onMouseUp);

    let frameId: number;
    const animate = () => {
      dodecahedron.rotation.x += CUBE_ROTATION_SPEED;
      dodecahedron.rotation.y += CUBE_ROTATION_SPEED;

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
      camera.position.x = Math.sin(cameraRotation.y) * 5;
      camera.position.y = Math.sin(cameraRotation.x) * 5;
      camera.position.z = Math.cos(cameraRotation.y) * 5;
      camera.lookAt(0, 0, 0);

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
      mount.removeEventListener("mousedown", onMouseDown);
      mount.removeEventListener("mousemove", onMouseMove);
      mount.removeEventListener("mouseup", onMouseUp);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={mountRef} className="flex-1 w-full h-full" />;
};

export default Test4;
