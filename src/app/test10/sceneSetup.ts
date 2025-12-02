import * as THREE from "three";

export const createRubiksCube = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const materials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Right - Red
    new THREE.MeshBasicMaterial({ color: 0xff8800 }), // Left - Orange
    new THREE.MeshBasicMaterial({ color: 0xffffff }), // Top - White
    new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Bottom - Yellow
    new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Front - Blue
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Back - Green
  ];
  const cube = new THREE.Mesh(geometry, materials);

  // Add edges
  const edges = new THREE.EdgesGeometry(geometry);
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
  const wireframe = new THREE.LineSegments(edges, lineMaterial);
  cube.add(wireframe);

  return cube;
};

export const setupScene = (canvas: HTMLCanvasElement) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1a1a);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  const cube = createRubiksCube();
  scene.add(cube);

  return { scene, camera, renderer, cube };
};
