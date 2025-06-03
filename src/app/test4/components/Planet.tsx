import {
  Mesh,
  MeshStandardMaterial,
  IcosahedronGeometry,
  EdgesGeometry,
  LineSegments,
  LineBasicMaterial,
  PointLight,
  Object3D,
} from "three";

const PERCENTAGE_OF_LIGHTS = 0.04;
const BASE_COLOR = "#c4c4c4";

export const createPlanet = (): Object3D => {
  const geometry = new IcosahedronGeometry(1, 2);
  const material = new MeshStandardMaterial({
    color: BASE_COLOR,
    emissive: 0x000000,
    emissiveIntensity: 0.1,
  });
  const dodecahedron = new Mesh(geometry, material);

  const edges = new EdgesGeometry(geometry);
  const edgeMaterial = new LineBasicMaterial({ color: 0xffffff });
  const edgeLines = new LineSegments(edges, edgeMaterial);
  dodecahedron.add(edgeLines);

  const vertices = geometry.attributes.position.array;
  for (let i = 0; i < vertices.length; i += 3) {
    if (Math.random() <= PERCENTAGE_OF_LIGHTS) {
      const x = vertices[i];
      const y = vertices[i + 1];
      const z = vertices[i + 2];

      const vertexLight = new PointLight("#3185FC", 0.2);
      vertexLight.position.set(x, y, z);
      dodecahedron.add(vertexLight);
    }
  }

  return dodecahedron;
};
