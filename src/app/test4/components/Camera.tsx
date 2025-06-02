import { PerspectiveCamera } from "three";

export const CAMERA_ROTATION_SPEED = 0.005;

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

    previousPosition = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  };

  const onTouchEnd = () => {
    isDragging = false;
  };

  mount.addEventListener("mousedown", onMouseDown);
  mount.addEventListener("mousemove", onMouseMove);
  mount.addEventListener("mouseup", onMouseUp);

  mount.addEventListener("touchstart", onTouchStart);
  mount.addEventListener("touchmove", onTouchMove);
  mount.addEventListener("touchend", onTouchEnd);

  const updateCameraPosition = () => {
    camera.position.x = Math.sin(cameraRotation.y) * 5;
    camera.position.y = Math.sin(cameraRotation.x) * 5;
    camera.position.z = Math.cos(cameraRotation.y) * 5;
    camera.lookAt(0, 0, 0);
  };

  const cleanup = () => {
    mount.removeEventListener("mousedown", onMouseDown);
    mount.removeEventListener("mousemove", onMouseMove);
    mount.removeEventListener("mouseup", onMouseUp);

    mount.removeEventListener("touchstart", onTouchStart);
    mount.removeEventListener("touchmove", onTouchMove);
    mount.removeEventListener("touchend", onTouchEnd);
  };

  return { updateCameraPosition, cleanup };
};
