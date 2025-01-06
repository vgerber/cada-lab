"use client";
import { Circle } from "@/lib/drawing/shape/2d/circle";
import { Line } from "@/lib/drawing/shape/2d/line";
import { DragPoint } from "@/lib/drawing/sketch/interaction";
import { Sketch } from "@/lib/drawing/sketch/sketch";
import { SketchShape } from "@/lib/drawing/sketch/sketch_shape";
import { Property } from "@/lib/property/types";
import * as THREE from "three";
import SketchBook from "../../sketchbook";

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

  const sketchCircle2 = new SketchShape(circle2);
  sketchCircle2.addInteractable(
    new DragPoint(
      circle2,
      (target) => target.position,
      (target, position) => target.position.set(position.x, position.y, 0),
    ),
  );

  const sketchLine = new SketchShape(
    new Line("Test", new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)),
  );

  const sketch = new Sketch([
    new SketchShape(circle1),
    sketchCircle2,
    sketchLine,
  ]);

  return <SketchBook sketch={sketch} onPropertyChanged={onPropertyChanged} />;
}
