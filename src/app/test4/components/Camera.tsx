import { PerspectiveCamera } from "three";

export const CAMERA_ROTATION_SPEED = 0.005;
const CAMERA_DISTANCE = 5; // Fixed distance from the planet

export const createCamera = (
  aspectRatio: number,
  initialPosition: { x: number; y: number; z: number }
): PerspectiveCamera => {
  const camera = new PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  camera.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
  return camera;
};

export const setupCameraControls = (
  camera: PerspectiveCamera,
  mount: HTMLElement
) => {
  let isDragging = false;
  let previousPosition = { x: 0, y: 0 };
  const cameraRotation = { x: 0, y: 0 };
  let cameraDistance = CAMERA_DISTANCE; // Make camera distance adjustable

  const onMouseDown = (event: MouseEvent) => {
    isDragging = true;
    previousPosition = { x: event.clientX, y: event.clientY };
  };

  const onMouseMove = (event: MouseEvent) => {
    if (!isDragging) return;

    const deltaX = event.clientX - previousPosition.x;
    const deltaY = event.clientY - previousPosition.y;

    cameraRotation.x -= deltaY * CAMERA_ROTATION_SPEED;
    cameraRotation.y -= deltaX * CAMERA_ROTATION_SPEED;
    // Clamp the vertical rotation to avoid flipping the camera
    cameraRotation.x = Math.max(
      -Math.PI / 2,
      Math.min(Math.PI / 2, cameraRotation.x)
    );

    previousPosition = { x: event.clientX, y: event.clientY };
  };

  const onMouseUp = () => {
    isDragging = false;
  };

  // Touch Events
  const onTouchStart = (event: TouchEvent) => {
    if (event.touches.length === 1) {
      isDragging = true;
      previousPosition = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
    }
  };

  const onTouchMove = (event: TouchEvent) => {
    if (!isDragging || event.touches.length !== 1) return;

    const deltaX = event.touches[0].clientX - previousPosition.x;
    const deltaY = event.touches[0].clientY - previousPosition.y;

    cameraRotation.x -= deltaY * CAMERA_ROTATION_SPEED;
    cameraRotation.y -= deltaX * CAMERA_ROTATION_SPEED;

    // Clamp the vertical rotation to avoid flipping the camera
    cameraRotation.x = Math.max(
      -Math.PI / 2,
      Math.min(Math.PI / 2, cameraRotation.x)
    );

    previousPosition = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  };

  const onTouchEnd = () => {
    isDragging = false;
  };

  const onWheel = (event: WheelEvent) => {
    cameraDistance += event.deltaY * 0.01; // Adjust zoom sensitivity
    cameraDistance = Math.max(2, Math.min(10, cameraDistance)); // Clamp zoom range
  };

  mount.addEventListener("mousedown", onMouseDown);
  mount.addEventListener("mousemove", onMouseMove);
  mount.addEventListener("mouseup", onMouseUp);

  mount.addEventListener("touchstart", onTouchStart);
  mount.addEventListener("touchmove", onTouchMove);
  mount.addEventListener("touchend", onTouchEnd);

  mount.addEventListener("wheel", onWheel); // Add wheel event listener

  const updateCameraPosition = () => {
    // Calculate the camera's position based on spherical coordinates
    const x =
      cameraDistance * Math.sin(cameraRotation.y) * Math.cos(cameraRotation.x);
    const y = cameraDistance * Math.sin(cameraRotation.x);
    const z =
      cameraDistance * Math.cos(cameraRotation.y) * Math.cos(cameraRotation.x);

    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0); // Always look at the planet's center
  };

  const cleanup = () => {
    mount.removeEventListener("mousedown", onMouseDown);
    mount.removeEventListener("mousemove", onMouseMove);
    mount.removeEventListener("mouseup", onMouseUp);

    mount.removeEventListener("touchstart", onTouchStart);
    mount.removeEventListener("touchmove", onTouchMove);
    mount.removeEventListener("touchend", onTouchEnd);

    mount.removeEventListener("wheel", onWheel); // Remove wheel event listener
  };

  return { updateCameraPosition, cleanup };
};
