import { Point } from "@/lib/drawing/shape/2d/point";
import { useTheme } from "@mui/material";
import * as THREE from "three";

export default function PointShapeElement({ point }: { point: Point }) {
  const theme = useTheme();
  const geometry = new THREE.BufferGeometry().setFromPoints([point.position]);

  return (
    <group>
      <points geometry={geometry}>
        <pointsMaterial size={5} color={theme.canvas.line.default} />
      </points>
    </group>
  );
}
