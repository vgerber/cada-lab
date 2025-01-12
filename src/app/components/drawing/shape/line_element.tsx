import { useCameraSphereRadius } from "@/components/useCameraSphereRadius";
import { Line } from "@/lib/drawing/shape/2d/line";
import { useTheme } from "@mui/material";
import { extend, ReactThreeFiber } from "@react-three/fiber";
import { observer } from "mobx-react";
import * as THREE from "three";

extend({ Line_: THREE.Line });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      line_: ReactThreeFiber.Object3DNode<THREE.Line, typeof THREE.Line>;
    }
  }
}

export const LineShapeElement = observer(({ line }: { line: Line }) => {
  const theme = useTheme();
  const geometry = new THREE.BufferGeometry().setFromPoints([line.a, line.b]);
  const circleRadius = useCameraSphereRadius();

  if (line.properties.construction) {
    return (
      <line_
        geometry={geometry}
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
    );
  }

  return (
    <group>
      <line_ geometry={geometry}>
        <lineBasicMaterial
          attach="material"
          color={theme.canvas.line.default}
          linewidth={1}
        />
      </line_>
    </group>
  );
});
