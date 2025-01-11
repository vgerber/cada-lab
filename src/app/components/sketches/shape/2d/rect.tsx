"use client";
import { SketchBook } from "@/components/sketches/sketchbook";
import { Rectangle } from "@/lib/drawing/shape/2d/rectangle";
import { DragPoint } from "@/lib/drawing/sketch/interaction";
import { Sketch } from "@/lib/drawing/sketch/sketch";
import { SketchShape } from "@/lib/drawing/sketch/sketch_shape";
import { runInAction } from "mobx";
import * as THREE from "three";

export default function RectangleShape2d() {
  const rect = new Rectangle(
    "Rect 1",
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector2(3, 5),
  );

  const rectADrag = new DragPoint(
    rect,
    (rect) =>
      new THREE.Vector3(rect.size.x, rect.size.y, 0)
        .multiplyScalar(0.5)
        .add(rect.position),
    (rect, position) =>
      runInAction(() => {
        rect.setSize(
          new THREE.Vector2(Math.abs(position.x), Math.abs(position.y))
            .multiplyScalar(2)
            .sub(rect.position),
        );
      }),
  );

  const rectSketchShape = new SketchShape(rect);
  rectSketchShape.addInteractable(rectADrag);

  const sketch = new Sketch([rectSketchShape]);

  return <SketchBook sketch={sketch} onPropertyChanged={() => {}} />;
}
