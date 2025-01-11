"use client";
import { SketchBook } from "@/components/sketches/sketchbook";
import { Triangle } from "@/lib/drawing/shape/2d/triangle";
import { DragPoint } from "@/lib/drawing/sketch/interaction";
import { Sketch } from "@/lib/drawing/sketch/sketch";
import { SketchShape } from "@/lib/drawing/sketch/sketch_shape";
import { runInAction } from "mobx";
import * as THREE from "three";

export default function TriangleShape2d() {
  const triangle = new Triangle(
    "Triangle",
    new THREE.Vector3(-1, -1, 0),
    new THREE.Vector3(1, -1, 0),
    new THREE.Vector3(0, 1, 0),
  );

  const triangleADrag = new DragPoint(
    triangle,
    (tri) => tri.a,
    (tri, position) =>
      runInAction(() => (tri.a = new THREE.Vector3(position.x, position.y, 0))),
  );
  const triangleBDrag = new DragPoint(
    triangle,
    (tri) => tri.b,
    (tri, position) =>
      runInAction(() => (tri.b = new THREE.Vector3(position.x, position.y, 0))),
  );
  const triangleCDrag = new DragPoint(
    triangle,
    (tri) => tri.c,
    (tri, position) =>
      runInAction(() => (tri.c = new THREE.Vector3(position.x, position.y, 0))),
  );

  const sketch = new Sketch([
    new SketchShape(triangle, [triangleADrag, triangleBDrag, triangleCDrag]),
  ]);

  return <SketchBook sketch={sketch} onPropertyChanged={() => {}} />;
}
