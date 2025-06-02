import { Mesh, MeshBasicMaterial, PointLight, SphereGeometry } from "three";

// Define the LightOrb type
export type LightOrb = Mesh & {
  updatePosition?: (x: number, y: number, z: number) => void;
};

export const createLightOrb = (color: number, intensity: number): LightOrb => {
  // Create the glowing orb
  const geometry = new SphereGeometry(0.05, 16, 16);
  const material = new MeshBasicMaterial({ color });
  const orb = new Mesh(geometry, material) as LightOrb;

  // Add a PointLight to the orb
  const light = new PointLight(color, intensity, 100);
  orb.add(light);

  // Define the position update method
  orb.updatePosition = (x, y, z) => {
    orb.position.set(x, y, z);
  };

  return orb;
};
