import { Line } from "../../../lib/drawing/shape/2d/line";
import * as THREE from "three";
import { extend, ReactThreeFiber } from "@react-three/fiber";

extend({ Line_: THREE.Line })

declare global {
    namespace JSX {
        interface IntrinsicElements {
            line_: ReactThreeFiber.Object3DNode<THREE.Line, typeof THREE.Line>
        }
    }
}

export default function LineShapeElement({ line }: { line: Line }) {
    let geometry = new THREE.BufferGeometry().setFromPoints([line.a, line.b]);

    if (line.properties.dashedProperties) {
        let dashProps = line.properties.dashedProperties;
        return (
            <group>
                <line_ geometry={geometry} onUpdate={(line) => line.computeLineDistances()}>
                    <lineDashedMaterial attach="material" color={"#333"} linewidth={1} gapSize={dashProps.gapSize} dashSize={dashProps.dashSize} />
                </line_>
            </group>
        )
    } else {
        return (
            <group>
                <line_ geometry={geometry}>
                    <lineBasicMaterial attach="material" color={"#333"} linewidth={1} />
                </line_>
            </group>
        )
    }
}