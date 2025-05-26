"use client";
import { useEffect, useRef } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  MeshStandardMaterial,
  Mesh,
  DirectionalLight,
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

const BASE_COLOR = "#b9b9b9";

const ORBIT_SPEED_WHITE = 0.006;
const ORBIT_SPEED_ORANGE = 0.004;
const CUBE_ROTATION_SPEED = 0.002;
const ORBIT_RADIUS_WHITE = 3;
const ORBIT_RADIUS_ORANGE = 5;

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

    // Add edges to the dodecahedron
    const edges = new EdgesGeometry(geometry);
    const edgeMaterial = new LineBasicMaterial({ color: 0xffffff });
    const edgeLines = new LineSegments(edges, edgeMaterial);
    dodecahedron.add(edgeLines); // Attach edges to the dodecahedron

    // Add a small light at each vertex of the icosahedron
    const vertices = geometry.attributes.position.array;
    // 20% chance to execute
    for (let i = 0; i < vertices.length; i += 3) {
      if (Math.random() <= 0.05) {
        const x = vertices[i];
        const y = vertices[i + 1];
        const z = vertices[i + 2];

        const vertexLight = new PointLight("#3185FC", 0.2); // Small light with low intensity and range
        vertexLight.position.set(x, y, z);
        dodecahedron.add(vertexLight);
      }
    }

    const movingLightWhite = new DirectionalLight(0xffffff, 1);
    movingLightWhite.position.set(5, 0, 3);
    scene.add(movingLightWhite);

    const movingLightOrange = new DirectionalLight(0xffaa00, 1);
    movingLightOrange.position.set(-5, 0, 3);
    scene.add(movingLightOrange);

    const lightOrbWhite = createLightOrb(0xffffff, 15); // White orb with stronger bloom
    lightOrbWhite.position.copy(movingLightWhite.position);
    scene.add(lightOrbWhite);

    const lightOrbOrange = createLightOrb(0xffaa00, 10); // Orange orb with much stronger bloom
    lightOrbOrange.position.copy(movingLightOrange.position);
    scene.add(lightOrbOrange);

    let angleWhite = 0;
    let angleOrange = 0;
    let tiltAngle = 0;

    let frameId: number;
    const animate = () => {
      dodecahedron.rotation.x += CUBE_ROTATION_SPEED;
      dodecahedron.rotation.y += CUBE_ROTATION_SPEED;

      angleWhite += ORBIT_SPEED_WHITE;
      angleOrange += ORBIT_SPEED_ORANGE;
      tiltAngle += 0.0005;

      movingLightWhite.position.x = Math.cos(angleWhite) * ORBIT_RADIUS_WHITE;
      movingLightWhite.position.y =
        Math.sin(tiltAngle) * ORBIT_RADIUS_WHITE * 0.5;
      movingLightWhite.position.z = Math.sin(angleWhite) * ORBIT_RADIUS_WHITE;

      lightOrbWhite.position.copy(movingLightWhite.position);

      movingLightOrange.position.x =
        Math.cos(-angleOrange) * ORBIT_RADIUS_ORANGE;
      movingLightOrange.position.y =
        Math.sin(-tiltAngle) * ORBIT_RADIUS_ORANGE * 0.5;
      movingLightOrange.position.z =
        Math.sin(-angleOrange) * ORBIT_RADIUS_ORANGE;

      lightOrbOrange.position.copy(movingLightOrange.position);

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
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={mountRef} className="flex-1 w-full h-full" />;
};

export default Test4;
