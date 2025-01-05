import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import * as THREE from "three";
import { getTopics } from "../../lib/drawing/shape/util";
import {
  AnySketchShape,
  BoundingBox,
  Sketch,
} from "../../lib/drawing/sketch/sketch";
import { Property, PropertyGroup } from "../../lib/property/types";
import Navbar from "../navbar";
import PropertiesEditor from "../properties/editor";
import Sidebar from "../sidebar";
import OrthographicSketchCamera from "./orthographic_camera";
import SketchShapeElement from "./shape/sketch_shape_element";
import styles from "./sketchbook.module.scss";

function getBoundingBox(sketch: Sketch, oversize = 0.1): BoundingBox {
  const sketchBoundingBox = sketch.getBoundingBox();
  const size = sketchBoundingBox.size().multiplyScalar(oversize);
  //console.log(size);
  return new BoundingBox(
    sketchBoundingBox.min.clone().sub(size),
    sketchBoundingBox.max.clone().add(size),
  );
}

export default function SketchBook({
  sketch,
  onPropertyChanged,
  onUpdate,
  onUpdateEnd,
}: {
  sketch: Sketch;
  onPropertyChanged: (arg0: Property) => void;
  onUpdate?: (shape: AnySketchShape) => void;
  onUpdateEnd?: (shape: AnySketchShape) => void;
}) {
  const [sketchBounds, setSketchBounds] = useState(getBoundingBox(sketch, 0.1));

  function getProperties(): PropertyGroup {
    return new PropertyGroup(
      "Sketch",
      sketch.shapes.map((shape) => shape.getShape().getProperties()),
    );
  }

  function onShapeUpdateEnd(sketchShape: AnySketchShape) {
    onUpdateEnd ? onUpdateEnd(sketchShape) : {};
    sketch.updateBoundingBox();
    const newBounds = getBoundingBox(sketch, 0.1);
    setSketchBounds(newBounds);
  }

  function onSketchUpdate(sketchShape: AnySketchShape) {
    onUpdate ? onUpdate(sketchShape) : {};
  }

  return (
    <>
      <div className={styles.grid_layout}>
        <div className={styles.navbar}>
          <Navbar />
        </div>
        <div className={styles.sidebar}>
          <Sidebar rootSubTopic={getTopics()} />
        </div>
        <div className={styles.body}>
          <div className={styles.sketch}>
            <div className={styles.canvas}>
              <Canvas frameloop="demand">
                <OrthographicSketchCamera
                  position={sketchBounds
                    .center()
                    .add(new THREE.Vector3(0, 0, 3))}
                  sceneMin={
                    new THREE.Vector2(sketchBounds.min.x, sketchBounds.min.y)
                  }
                  sceneMax={
                    new THREE.Vector2(sketchBounds.max.x, sketchBounds.max.y)
                  }
                />
                <ambientLight intensity={0.7} />
                {sketch.shapes.map((shape, shapeIndex) => (
                  <SketchShapeElement
                    key={shapeIndex}
                    sketchShape={shape}
                    onUpdate={onSketchUpdate}
                    onUpdateEnd={onShapeUpdateEnd}
                  />
                ))}
              </Canvas>
            </div>
            <div className={styles.properties}>
              <PropertiesEditor
                property={getProperties()}
                onPropertyChanged={onPropertyChanged}
              />
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
                    html, body {
                        margin: 0px;
                        height: 100%;
                    }
                    #__next {
                        height: 100%;
                    }
                `}
      </style>
    </>
  );
}

function timeout(delay: number): Promise<unknown> {
  return new Promise((res) => setTimeout(res, delay));
}
