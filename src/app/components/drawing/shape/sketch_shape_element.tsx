import { Shape } from "@/lib/drawing/shape/shape";
import { AnySketchShape } from "@/lib/drawing/sketch/sketch";
import { SketchShape } from "@/lib/drawing/sketch/sketch_shape";
import * as THREE from "three";
import InteractableElement from "./interaction/interactable_element";

export default function SketchShapeElement({
  sketchShape,
  onUpdate,
  onUpdateEnd,
}: {
  sketchShape: AnySketchShape;
  onUpdate?: (shape: SketchShape<any & Shape>) => void;
  onUpdateEnd?: (shape: AnySketchShape) => void;
}) {
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
      {sketchShape.getInteractables().map((interactable, index) => (
        <InteractableElement
          key={index}
          interactable={interactable}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
        />
      ))}
      {(sketchShape.shape as Shape).getSceneElement()}
    </>
  );
}
