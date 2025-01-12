import { CatmullRomSpline } from "@/lib/drawing/shape/curve/catmull_rom_spline";
import * as THREE from "three";

export default function CatmullRomSplineElement({
  spline,
}: {
  spline: CatmullRomSpline;
}) {
  const geometry = new THREE.BufferGeometry().setFromPoints(
    spline.getCurvePoints(),
  );

  return (
    <group>
      <line_ geometry={geometry}>
        <lineBasicMaterial attach="material" color={"#333"} linewidth={1} />
      </line_>
    </group>
  );
}
