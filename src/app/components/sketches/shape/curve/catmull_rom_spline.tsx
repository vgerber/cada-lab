"use client";
import { SketchBook } from "@/components/sketches/sketchbook";
import { Line } from "@/lib/drawing/shape/2d/line";
import { CatmullRomSpline } from "@/lib/drawing/shape/curve/catmull_rom_spline";
import { DragPoint } from "@/lib/drawing/sketch/interaction";
import { Sketch } from "@/lib/drawing/sketch/sketch";
import { SketchShape } from "@/lib/drawing/sketch/sketch_shape";
import { autorun, runInAction } from "mobx";
import * as THREE from "three";

export const CatmullRomSplineSketch = () => {
  const spline = new CatmullRomSpline("CRS", [
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(3, 0, 0),
    new THREE.Vector3(4, 1, 0),
    new THREE.Vector3(5, 1, 0),
    new THREE.Vector3(6, 1, 0),
  ]);

  const dragPoints = Array.from(Array(spline.pointCount).keys()).map(
    (pointIndex) =>
      new DragPoint(
        spline.getPoint(pointIndex)!,
        (p) => p,
        (p, position) =>
          runInAction(() =>
            spline.setPoint(
              pointIndex,
              new THREE.Vector3(position.x, position.y, 0),
            ),
          ),
      ),
  );

  const sketchLine = new SketchShape(spline, dragPoints);

  const line0 = new Line("P0", spline.getPoint(0)!, spline.getPoint(1)!, {
    construction: true,
  });
  const line1 = new Line(
    "P1",
    spline.getPoint(spline.pointCount - 2)!,
    spline.getPoint(spline.pointCount - 1)!,
    { construction: true },
  );

  autorun(() => {
    const a = spline.getPoint(0);
    const b = spline.getPoint(1);

    runInAction(() => {
      line0.a = a!;
      line0.b = b!;
    });
  });

  autorun(() => {
    const a = spline.getPoint(spline.pointCount - 2);
    const b = spline.getPoint(spline.pointCount - 1);

    runInAction(() => {
      line1.a = a!;
      line1.b = b!;
    });
  });

  return (
    <SketchBook
      sketch={
        new Sketch([sketchLine, new SketchShape(line0), new SketchShape(line1)])
      }
    />
  );
};
