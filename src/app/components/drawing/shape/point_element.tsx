import { Point } from "@/lib/drawing/shape/2d/point";
import * as THREE from "three";

export default function PointShapeElement({ point }: { point: Point }) {
  const geometry = new THREE.BufferGeometry().setFromPoints([point.position]);

  return (
    <group>
      <points geometry={geometry}>
        <pointsMaterial size={5} color={"#333"} />
      </points>
    </group>
  );
}
