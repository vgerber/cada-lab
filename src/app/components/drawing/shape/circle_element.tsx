import { Circle } from "@/lib/drawing/shape/2d/circle";
import { useTheme } from "@mui/material";
import * as THREE from "three";

export default function CircleShapeElement({ circle }: { circle: Circle }) {
  const theme = useTheme();
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(
    generateCircleLineStrip(circle),
  );

  return (
    <group position={circle.position}>
      <lineLoop geometry={lineGeometry}>
        <lineBasicMaterial
          attach="material"
          color={theme.canvas.line.default}
          linewidth={1}
        />
      </lineLoop>
    </group>
  );
}

function generateCircleLineStrip(circle: Circle): THREE.Vector3[] {
  if (circle.resolution === 0) {
    return [];
  }

  const points = new Array<THREE.Vector3>(circle.resolution);
  const angleStep = (circle.circleEnd - circle.circleStart) / points.length;
  for (let pIndex = 0; pIndex < circle.resolution + 1; pIndex++) {
    points[pIndex] = new THREE.Vector3(
      circle.radius * Math.cos(circle.circleStart + angleStep * pIndex),
      circle.radius * Math.sin(circle.circleStart + angleStep * pIndex),
      0,
    );
  }

  // center lines
  // do not draw center lines when circle is closed
  const clampedStart = circle.circleStart % (Math.PI * 2);
  const clampedEnd = circle.circleEnd % (Math.PI * 2);
  if (Math.abs(clampedEnd - clampedStart) > 0.001) {
    points.push(circle.position);
  }

  return points;
}
