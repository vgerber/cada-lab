"use client";
import { Circle } from "@/lib/drawing/shape/2d/circle";
import { DragPoint } from "@/lib/drawing/sketch/interaction";
import { Sketch } from "@/lib/drawing/sketch/sketch";
import { SketchShape } from "@/lib/drawing/sketch/sketch_shape";
import { Property } from "@/lib/property/types";
import { runInAction } from "mobx";
import * as THREE from "three";
import { SketchBook } from "../../sketchbook";

export default function CircleShape2d() {
  const circle1 = new Circle(
    "Circle 1",
    new THREE.Vector3(1, 1, 0),
    1,
    0,
    Math.PI * 2,
    50,
  );
  const circle2 = new Circle(
    "Circle 2",
    new THREE.Vector3(1, 1, 0),
    1,
    0,
    Math.PI * 2,
    50,
  );

  function onPropertyChanged(property: Property) {}

  const sketchCircle1 = new SketchShape(circle1);
  sketchCircle1.addInteractable(
    new DragPoint(
      circle1,
      (target) => target.position,
      (target, position) =>
        runInAction(
          () =>
            (target.position = new THREE.Vector3(position.x, position.y, 0)),
        ),
    ),
  );

  const sketch = new Sketch([sketchCircle1, new SketchShape(circle2)]);

  return <SketchBook sketch={sketch} onPropertyChanged={onPropertyChanged} />;
}
