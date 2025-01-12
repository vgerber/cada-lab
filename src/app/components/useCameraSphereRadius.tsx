import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export function useCameraSphereRadius(): number {
  const { camera } = useThree();

  let sphereRadius = 0.005;
  if (camera instanceof THREE.OrthographicCamera) {
    const width = camera.right - camera.left;
    const height = camera.top - camera.bottom;
    const maxViewportSize = Math.max(width, height);
    sphereRadius = 0.005 * maxViewportSize;
  }

  return sphereRadius;
}
