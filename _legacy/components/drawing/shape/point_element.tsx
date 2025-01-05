import * as THREE from "three";
import { Point } from "../../../lib/drawing/shape/2d/point";

export default function PointShapeElement({ point }: { point: Point }) {
  let geometry = new THREE.BufferGeometry().setFromPoints([point.position]);

  return (
    <group>
      <points geometry={geometry}>
        <pointsMaterial size={5} color={"#333"} />
      </points>
    </group>
  );
}
