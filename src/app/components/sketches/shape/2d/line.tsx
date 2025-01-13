"use client";
import { Line } from "@/lib/drawing/shape/2d/line";
import { DragPoint } from "@/lib/drawing/sketch/interaction";
import { Sketch } from "@/lib/drawing/sketch/sketch";
import { SketchShape } from "@/lib/drawing/sketch/sketch_shape";
import { runInAction } from "mobx";
import * as THREE from "three";
import { SketchBook } from "../../sketchbook";

export default function LineShape2d() {
  return <SketchBook sketch={setupSketch()} />;
}

function setupSketch(): Sketch {
  const line = new Line(
    "Line 1",
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 1, 0),
  );
  const lineADrag = new DragPoint(
    line,
    (l) => l.a,
    (l, position) =>
      runInAction(() => (l.a = new THREE.Vector3(position.x, position.y, 0))),
  );
  const lineBDrag = new DragPoint(
    line,
    (l) => l.b,
    (l, position) =>
      runInAction(() => (l.b = new THREE.Vector3(position.x, position.y, 0))),
  );
  const sketchLine = new SketchShape(line);
  sketchLine.addInteractable(lineADrag);
  sketchLine.addInteractable(lineBDrag);
  return new Sketch([sketchLine]);
}
