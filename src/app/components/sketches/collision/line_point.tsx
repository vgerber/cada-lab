"use client";
import { SketchBook } from "@/components/sketches/sketchbook";
import { Line } from "@/lib/drawing/shape/2d/line";
import { DragPoint } from "@/lib/drawing/sketch/interaction";
import { Sketch } from "@/lib/drawing/sketch/sketch";
import { SketchShape } from "@/lib/drawing/sketch/sketch_shape";
import { runInAction } from "mobx";
import * as THREE from "three";

export default function LinePointDistanceSketch() {
  const line = new Line(
    "Line",
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 1, 0),
  );

  const closestPointLine = new Line(
    "Point Line",
    new THREE.Vector3(-2, 1, 0),
    line.closestPoint(new THREE.Vector3(-2, 1, 0)),
    { construction: true },
  );

  const lineClosestPointDrag = new DragPoint(
    closestPointLine,
    (l) => l.a,
    (l, position) =>
      runInAction(() => {
        l.a = new THREE.Vector3(position.x, position.y, 0);
        updateClosesPoint();
      }),
  );

  const lineADrag = new DragPoint(
    line,
    (l) => l.a,
    (l, position) =>
      runInAction(() => {
        l.a = new THREE.Vector3(position.x, position.y, 0);
        updateClosesPoint();
      }),
  );
  const lineBDrag = new DragPoint(
    line,
    (l) => l.b,
    (l, position) =>
      runInAction(() => {
        l.b = new THREE.Vector3(position.x, position.y, 0);
        updateClosesPoint();
      }),
  );
  const sketchLine = new SketchShape(line, [lineADrag, lineBDrag]);

  function updateClosesPoint() {
    const closesLinePoint = line.closestPoint(closestPointLine.a);
    closestPointLine.b = closesLinePoint;
  }

  return (
    <SketchBook
      sketch={
        new Sketch([
          sketchLine,
          new SketchShape(closestPointLine, [lineClosestPointDrag]),
        ])
      }
    />
  );
}
