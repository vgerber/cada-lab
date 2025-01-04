import { AnySketchShape, BoundingBox, Sketch } from "../../lib/drawing/sketch/sketch";
import { SubTopic } from "../../lib/routing/sub_topic";
import Navbar from "../navbar";
import Sidebar from "../sidebar";
import Camera from "./orthographic_camera";
import styles from "./sketchbook.module.scss";
import Viewport from "./viewport";
import * as THREE from "three";
import Points from "./shape/points";
import LineSegments from "./shape/circle_element";
import { Canvas, createRoot, events, ThreeEvent } from "@react-three/fiber";
import { getTopics } from "../../lib/drawing/shape/util";
import PropertiesEditor from "../properties/editor";
import { Property, PropertyGroup } from "../../lib/property/types";
import { useEffect, useRef, useState } from "react";
import ShapeElement from "./shape/shape_element";
import { OrthographicCamera } from "@react-three/drei";
import OrthographicSketchCamera from "./orthographic_camera";
import { Shape } from "../../lib/drawing/shape/shape";
import InteractableElement from "./shape/interaction/interactable_element";
import SketchShapeElement from "./shape/sketch_shape_element";
import { SketchShape } from "../../lib/drawing/sketch/sketch_shape";


function getBoundingBox(sketch: Sketch, oversize = 0.1): BoundingBox {
    let sketchBoundingBox = sketch.getBoundingBox();
    let size = sketchBoundingBox.size().multiplyScalar(oversize);
    //console.log(size);
    return new BoundingBox(sketchBoundingBox.min.clone().sub(size), sketchBoundingBox.max.clone().add(size));
}

export default function SketchBook({ sketch, onPropertyChanged, onUpdate, onUpdateEnd }: { sketch: Sketch, onPropertyChanged: (arg0: Property) => void, onUpdate?: (shape: AnySketchShape) => void, onUpdateEnd?: (shape: AnySketchShape) => void }) {
    let [sketchBounds, setSketchBounds] = useState(getBoundingBox(sketch, 0.1));

    function getProperties(): PropertyGroup {
        return new PropertyGroup("Sketch", sketch.shapes.map(shape => shape.getShape().getProperties()));
    }

    function onShapeUpdateEnd(sketchShape: AnySketchShape) {
        onUpdateEnd ? onUpdateEnd(sketchShape) : {};
        sketch.updateBoundingBox();
        let newBounds = getBoundingBox(sketch, 0.1);
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
                                    position={sketchBounds.center().add(new THREE.Vector3(0, 0, 3))}
                                    sceneMin={new THREE.Vector2(sketchBounds.min.x, sketchBounds.min.y)}
                                    sceneMax={new THREE.Vector2(sketchBounds.max.x, sketchBounds.max.y)} />
                                <ambientLight intensity={0.7} />
                                {sketch.shapes.map((shape, shapeIndex) => <SketchShapeElement key={shapeIndex} sketchShape={shape} onUpdate={onSketchUpdate} onUpdateEnd={onShapeUpdateEnd} />)}
                            </Canvas>
                        </div>
                        <div className={styles.properties}>
                            <PropertiesEditor property={getProperties()} onPropertyChanged={onPropertyChanged} />
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
    return new Promise(res => setTimeout(res, delay));
}