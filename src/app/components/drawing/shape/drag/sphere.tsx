import { useThree } from "@react-three/fiber";
import { useState } from "react";
import * as THREE from "three";
import { useDrag, useHover } from "../../util";

export default function DragSphere({
  position,
  onDrag,
  onDragEnd,
}: {
  position: THREE.Vector3;
  onDrag: (arg0: THREE.Vector3) => void;
  onDragEnd: () => void;
}) {
  const [dragPosition, setDragPosition] = useState(position.clone());

  const dragBindings = useDrag(
    (newPosition) => {
      setDragPosition(newPosition.clone());
      onDrag(newPosition);
    },
    () => onDragEnd(),
  );

  const circleRadius = useCameraSphereRadius();

  const hoverProps = useHover();

  return (
    <mesh
      position={dragPosition}
      {...dragBindings}
      {...hoverProps.bindings}
      scale={hoverProps.isHovered ? 2 : 1}
    >
      <sphereGeometry
        args={[circleRadius, 16, 16]}
        onUpdate={(self: any) => {
          self.computeBoundingSphere();
        }}
      />
      <meshBasicMaterial
        transparent
        opacity={hoverProps.isHovered ? 1 : 1}
        color={"black"}
      />
    </mesh>
  );
}

function useCameraSphereRadius(): number {
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
