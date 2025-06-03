import { Mesh, MeshStandardMaterial, PointLight, SphereGeometry } from "three";

export type LightOrb = Mesh & {
  updatePosition?: (x: number, y: number, z: number) => void;
};

export const createLightOrb = (color: number, intensity: number): LightOrb => {
  const geometry = new SphereGeometry(0.05, 16, 16);
  const material = new MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 2,
  });
  const orb = new Mesh(geometry, material) as LightOrb;

  const light = new PointLight(color, intensity, 100);
  orb.add(light);

  orb.updatePosition = (x, y, z) => {
    orb.position.set(x, y, z);
  };

  return orb;
};
