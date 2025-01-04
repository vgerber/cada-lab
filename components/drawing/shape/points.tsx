import { Point } from "../../../lib/drawing/shape/2d/point";
import * as THREE from "three";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

export default function Points({ points }: { points: Point[] }) {
    let geometry = new THREE.BufferGeometry().setFromPoints(points.map(p => p.position));


    return (
        <group>
            <points geometry={geometry}>
                <pointsMaterial size={5} color={"#333"} />
            </points>
        </group>
    )
}