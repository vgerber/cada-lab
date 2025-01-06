import { OrthographicCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function OrthographicSketchCamera({
  position,
  sceneMin,
  sceneMax,
}: {
  position: THREE.Vector3;
  sceneMin: THREE.Vector2;
  sceneMax: THREE.Vector2;
}) {
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const aspectRatio = useRef(1.0);

  const { viewport } = useThree();

  useEffect(() => {
    if (cameraRef.current) {
      aspectRatio.current = viewport.aspect;
      updateCamera(cameraRef.current);
    }
  });

  function updateCamera(camera: THREE.OrthographicCamera) {
    camera.position.set(position.x, position.y, position.z);
    camera.zoom = 1;

    // keep aspect ration
    const requestedSize = sceneMax.clone().sub(sceneMin);
    const requestedAspect = requestedSize.x / requestedSize.y;

    let size = new THREE.Vector2(0, 0);
    if (requestedAspect < aspectRatio.current) {
      size = new THREE.Vector2(
        aspectRatio.current * requestedSize.y,
        requestedSize.y,
      );
    } else {
      size = new THREE.Vector2(
        requestedSize.x,
        (1 / aspectRatio.current) * requestedSize.x,
      );
    }

    camera.left = -0.5 * size.x;
    camera.right = 0.5 * size.x;
    camera.bottom = -0.5 * size.y;
    camera.top = 0.5 * size.y;

    camera.up.set(0, 1, 0);
    camera.updateProjectionMatrix();
  }

  return (
    <OrthographicCamera
      name="OrthographicSheetCamera"
      manual
      makeDefault
      ref={cameraRef}
    />
  );
}
