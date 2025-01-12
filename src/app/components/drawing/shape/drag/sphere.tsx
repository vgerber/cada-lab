import { useCameraSphereRadius } from "@/components/useCameraSphereRadius";
import { useTheme } from "@mui/material";
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
  const theme = useTheme();
  const [dragPosition, setDragPosition] = useState<THREE.Vector3>(position);
  const [dragStartPosition, setDragStartPosition] =
    useState<THREE.Vector3 | null>(null);

  const dragLineGeometry = dragStartPosition
    ? new THREE.BufferGeometry().setFromPoints([
        dragStartPosition,
        dragPosition,
      ])
    : null;

  const dragBindings = useDrag(
    (newPosition) => {
      setDragPosition(newPosition.clone());
      if (!dragStartPosition) {
        setDragStartPosition(newPosition.clone());
      }
      onDrag(newPosition);
    },
    () => {
      setDragStartPosition(null);
      onDragEnd();
    },
  );

  const circleRadius = useCameraSphereRadius();

  const hoverProps = useHover();

  return (
    <group>
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
          color={theme.canvas.line.default}
        />
      </mesh>
      {dragStartPosition && dragLineGeometry && (
        <>
          <mesh position={dragStartPosition} scale={1}>
            <sphereGeometry
              args={[circleRadius * 0.5, 16, 16]}
              onUpdate={(self: any) => {
                self.computeBoundingSphere();
              }}
            />
            <meshBasicMaterial
              transparent
              color={theme.canvas.line.background}
            />
          </mesh>
          <line_
            geometry={dragLineGeometry}
            onUpdate={(line) => line.computeLineDistances()}
          >
            <lineDashedMaterial
              attach="material"
              color={theme.canvas.line.background}
              opacity={0.5}
              linewidth={1}
              gapSize={circleRadius}
              dashSize={circleRadius}
            />
          </line_>
        </>
      )}
    </group>
  );
}
