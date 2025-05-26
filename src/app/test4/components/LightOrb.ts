import {
  Mesh,
  MeshBasicMaterial,
  PointLight,
  SphereGeometry,
  Object3D,
} from "three";

export const createLightOrb = (color: number, intensity: number): Object3D => {
  // Create the glowing orb
  const lightOrbGeometry = new SphereGeometry(0.05, 16, 16); // Small sphere
  const lightOrbMaterial = new MeshBasicMaterial({ color }); // Glowing material with specified color
  const lightOrb = new Mesh(lightOrbGeometry, lightOrbMaterial);

  // Add a strong PointLight to the orb
  const lightOrbLight = new PointLight(color, intensity, 100); // Use intensity parameter
  lightOrb.add(lightOrbLight); // Attach the light to the orb

  return lightOrb;
};
