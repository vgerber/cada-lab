import { BoundingBox } from "@/lib/drawing/shape/shape";
import { animated, Globals, useSpring } from "@react-spring/three";
import { OrthographicCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { autorun } from "mobx";
import { observer } from "mobx-react";
import { useRef } from "react";
import * as THREE from "three";

const AnimatedOrhtographicCamera = animated(OrthographicCamera);

Globals.assign({
  frameLoop: "always",
});

// suppress this bug caused by react-spring global assign frameLoop always
const consoleWarn = console.warn;
const SUPPRESSED_WARNINGS = [
  "Cannot call the manual advancement of rafz whilst frameLoop is not set as demand",
];

console.warn = function filterWarnings(msg, ...args) {
  if (!SUPPRESSED_WARNINGS.some((entry) => msg.includes(entry))) {
    consoleWarn(msg, ...args);
  }
};

export const OrthographicSketchCamera = observer(
  ({ sketchBounds }: { sketchBounds: BoundingBox }) => {
    const { viewport, invalidate } = useThree();
    const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
    const aspectRatio = viewport.aspect;
    const position = sketchBounds.center().add(new THREE.Vector3(0, 0, 3));
    const sceneMin = new THREE.Vector2(sketchBounds.min.x, sketchBounds.min.y);
    const sceneMax = new THREE.Vector2(sketchBounds.max.x, sketchBounds.max.y);

    const cameraBounds = getCameraBounds();

    const [props, api] = useSpring(() => ({
      from: cameraBounds,
      onChange: (result) => {
        if (!cameraRef.current) {
          return;
        }
        cameraRef.current.left = result.value.left;
        cameraRef.current.right = result.value.right;
        cameraRef.current.bottom = result.value.bottom;
        cameraRef.current.top = result.value.top;
        cameraRef.current.position.set(
          result.value.x,
          result.value.y,
          position.z,
        );
        cameraRef.current.up.set(0, 1, 0);
        cameraRef.current.updateProjectionMatrix();
        invalidate();
      },
    }));

    autorun(() => {
      if (!cameraRef.current) {
        return;
      }
      const previousBounds = {
        left: cameraRef.current.left,
        right: cameraRef.current.right,
        top: cameraRef.current.top,
        bottom: cameraRef.current.bottom,
        x: cameraRef.current.position.x,
        y: cameraRef.current.position.y,
      };

      api.start({
        from: previousBounds,
        to: cameraBounds,
      });
    });

    function getCameraBounds() {
      // keep aspect ration
      const requestedSize = sceneMax.clone().sub(sceneMin);
      const requestedAspect = requestedSize.x / requestedSize.y;

      let size = new THREE.Vector2(0, 0);
      if (requestedAspect < aspectRatio) {
        size = new THREE.Vector2(
          aspectRatio * requestedSize.y,
          requestedSize.y,
        );
      } else {
        size = new THREE.Vector2(
          requestedSize.x,
          (1 / aspectRatio) * requestedSize.x,
        );
      }

      return {
        left: -0.5 * size.x,
        right: 0.5 * size.x,
        bottom: -0.5 * size.y,
        top: 0.5 * size.y,
        x: position.x,
        y: position.y,
      };
    }

    function onCameraMount(camera: THREE.OrthographicCamera) {
      if (!camera) {
        return;
      }

      console.log(cameraRef.current);
      if (!cameraRef.current) {
        api.start({
          left: camera.left,
          right: camera.right,
          top: camera.top,
          bottom: camera.bottom,
          x: position.x,
          y: position.y,
          immediate: true,
        });
        invalidate();
      }
      cameraRef.current = camera;
    }

    return (
      <AnimatedOrhtographicCamera
        name="OrthographicSheetCamera"
        manual
        makeDefault
        position={position}
        {...cameraBounds}
        // {...props}
        ref={cameraRef}
        matrixWorldNeedsUpdate
      />
    );
  },
);
