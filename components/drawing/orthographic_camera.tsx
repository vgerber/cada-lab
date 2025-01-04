import { OrthographicCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";


export default function OrthographicSketchCamera({ position, sceneMin, sceneMax }: { position: THREE.Vector3, sceneMin: THREE.Vector2, sceneMax: THREE.Vector2 }) {

    let cameraRef = useRef();
    let aspectRatio = 1.0;

    let { viewport } = useThree();

    useEffect(() => {
        if (cameraRef.current) {
            aspectRatio = viewport.aspect;
            updateCamera(cameraRef.current);
        }
    })

    function updateCamera(camera: THREE.OrthographicCamera) {
        camera.position.set(position.x, position.y, position.z);
        camera.zoom = 1;

        // keep aspect ration
        let requestedSize = sceneMax.clone().sub(sceneMin);
        let requestedAspect = requestedSize.x / requestedSize.y;

        let size = new THREE.Vector2(0, 0);
        if (requestedAspect < aspectRatio) {
            size = new THREE.Vector2(aspectRatio * requestedSize.y, requestedSize.y);
        } else {
            size = new THREE.Vector2(requestedSize.x, (1 / aspectRatio) * requestedSize.x);
        }

        camera.left = -0.5 * size.x;
        camera.right = 0.5 * size.x;
        camera.bottom = -0.5 * size.y;
        camera.top = 0.5 * size.y;

        camera.up.set(0, 1, 0);
        camera.updateProjectionMatrix();
    }

    return (<OrthographicCamera name="OrthographicSheetCamera" manual makeDefault ref={cameraRef} />);
}