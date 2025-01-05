import * as THREE from "three";
import { CatmullRomSpline } from "../../../../lib/drawing/shape/curve/catmull_rom_spline";

export default function CatmullRomSplineElement({
  spline,
}: {
  spline: CatmullRomSpline;
}) {
  const geometry = new THREE.BufferGeometry().setFromPoints(
    spline.getCurvePoints(),
  );
  console.log(spline.getBoundingBox());
  if (spline.properties.dashedProperties) {
    const dashProps = spline.properties.dashedProperties;
    return (
      <group>
        <line_
          geometry={geometry}
          onUpdate={(line) => line.computeLineDistances()}
        >
          <lineDashedMaterial
            attach="material"
            color={"#333"}
            linewidth={1}
            gapSize={dashProps.gapSize}
            dashSize={dashProps.dashSize}
          />
        </line_>
      </group>
    );
  } else {
    return (
      <group>
        <line_ geometry={geometry}>
          <lineBasicMaterial attach="material" color={"#333"} linewidth={1} />
        </line_>
      </group>
    );
  }
}
