import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useState } from "react";
import { useDrag, useHover } from "../../util";


export default function DragSphere({ position, onDrag, onDragEnd }: { position: THREE.Vector3, onDrag: (arg0: THREE.Vector3) => void, onDragEnd: () => void }) {

    let [dragPosition, setDragPosition] = useState(position.clone());

    let dragBindings = useDrag(
        (newPosition) => {
            setDragPosition(newPosition.clone());
            onDrag(newPosition);
        }, () => onDragEnd()
    )

    let circleRadius = getSphereRadius();

    let hoverProps = useHover()

    return (
        <mesh position={dragPosition} {...dragBindings} {...hoverProps.bindings} scale={hoverProps.isHovered ? 2 : 1}>
            <sphereBufferGeometry args={[circleRadius, 16, 16]} onUpdate={(self) => {
                self.computeBoundingSphere();
            }} />
            <meshBasicMaterial transparent opacity={hoverProps.isHovered ? 1 : 1} color={'black'} />
        </mesh>
    )
}

function getSphereRadius(): number {
    let { camera } = useThree();

    let sphereRadius = 0.005;
    if (camera instanceof THREE.OrthographicCamera) {
        let width = camera.right - camera.left;
        let height = camera.top - camera.bottom;
        let maxViewportSize = Math.max(width, height);
        sphereRadius = 0.005 * maxViewportSize;
    }

    return sphereRadius;
}