import { SketchShape } from "../../../lib/drawing/sketch/sketch_shape";
import InteractableElement from "./interaction/interactable_element";
import ShapeElement from "./shape_element";
import * as THREE from "three";
import { useState } from "react";
import { Shape } from "../../../lib/drawing/shape/shape";
import { AnySketchShape } from "../../../lib/drawing/sketch/sketch";

export default function SketchShapeElement({ sketchShape, onUpdate, onUpdateEnd }: { sketchShape: AnySketchShape, onUpdate?: (shape: SketchShape<any & Shape>) => void, onUpdateEnd?: (shape: AnySketchShape) => void }) {

    function onDrag(target: any, position: THREE.Vector3) {
        if (onUpdate) {
            onUpdate(sketchShape);
        }
    }

    function onDragEnd(target: any) {
        if (onUpdateEnd) {
            onUpdateEnd(sketchShape);
        }
    }

    return (
        <>
            {sketchShape.getInteractables().map((interactable, index) => <InteractableElement key={index} interactable={interactable} onDrag={onDrag} onDragEnd={onDragEnd} />)}
            <ShapeElement shape={sketchShape.shape} />
        </>
    )
}