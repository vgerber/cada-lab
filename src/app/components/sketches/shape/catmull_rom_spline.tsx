"use client";
import { SketchBook } from "@/components/sketches/sketchbook";
import { Line } from "@/lib/drawing/shape/2d/line";
import { CatmullRomSpline } from "@/lib/drawing/shape/curve/catmull_rom_spline";
import { DragPoint } from "@/lib/drawing/sketch/interaction";
import { Sketch } from "@/lib/drawing/sketch/sketch";
import { SketchShape } from "@/lib/drawing/sketch/sketch_shape";
import { observer } from "mobx-react";
import * as THREE from "three";

export const CatmullRomSplineSketch = observer(() => {
  const spline = new CatmullRomSpline("CRS", [
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(3, 0, 0),
    new THREE.Vector3(4, 1, 0),
    new THREE.Vector3(5, 1, 0),
    new THREE.Vector3(6, 1, 0),
  ]);

  const lineP0Drag = new DragPoint(
    spline.points[0],
    (p) => p,
    (p, position) => p.set(position.x, position.y, 0),
  );
  const lineP1Drag = new DragPoint(
    spline.points[1],
    (p) => p,
    (p, position) => p.set(position.x, position.y, 0),
  );
  const lineP2Drag = new DragPoint(
    spline.points[2],
    (p) => p,
    (p, position) => p.set(position.x, position.y, 0),
  );
  const lineP3Drag = new DragPoint(
    spline.points[3],
    (p) => p,
    (p, position) => p.set(position.x, position.y, 0),
  );
  const lineP4Drag = new DragPoint(
    spline.points[4],
    (p) => p,
    (p, position) => p.set(position.x, position.y, 0),
  );
  const lineP5Drag = new DragPoint(
    spline.points[5],
    (p) => p,
    (p, position) => p.set(position.x, position.y, 0),
  );

  const sketchLine = new SketchShape(spline, [
    lineP0Drag,
    lineP1Drag,
    lineP2Drag,
    lineP3Drag,
    lineP4Drag,
    lineP5Drag,
  ]);

  const line0 = new Line("P0", spline.points[0], spline.points[1], {
    construction: true,
  });
  const line1 = new Line(
    "P1",
    spline.points[spline.points.length - 2],
    spline.points[spline.points.length - 1],
    { construction: true },
  );

  return (
    <SketchBook
      sketch={
        new Sketch([sketchLine, new SketchShape(line0), new SketchShape(line1)])
      }
    />
  );
});
