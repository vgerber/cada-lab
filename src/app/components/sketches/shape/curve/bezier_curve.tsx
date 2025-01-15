"use client";
import { SketchBook } from "@/components/sketches/sketchbook";
import { Line } from "@/lib/drawing/shape/2d/line";
import { LineStrip } from "@/lib/drawing/shape/2d/line_strip";
import { Point } from "@/lib/drawing/shape/2d/point";
import { DragPoint } from "@/lib/drawing/sketch/interaction";
import { Sketch } from "@/lib/drawing/sketch/sketch";
import { SketchShape } from "@/lib/drawing/sketch/sketch_shape";
import { NumberRangeProperty, PropertyGroup } from "@/lib/property/types";
import { autorun, runInAction } from "mobx";
import { useLocalObservable } from "mobx-react";
import * as THREE from "three";

export const BezierCurveSketch = () => {
  const state = useLocalObservable(() => ({
    splineStep: 0.5,

    changeSplineStep(step: number) {
      this.splineStep = step;
    },
  }));

  const controlPoint1 = new Line(
    "Control P1",
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 1, 0),
    {
      construction: true,
    },
  );
  const controlPoint2 = new Line(
    "Control P2",
    new THREE.Vector3(6, 1, 0),
    new THREE.Vector3(5, 2, 0),
    {
      construction: true,
    },
  );

  const splineStepLine = new Line(
    "Spline step line",
    controlPoint1.a,
    controlPoint2.b,
    {
      construction: true,
    },
  );

  const splineStepPoint = new Point("Step Position", splineStepLine.a);
  const splineStrip = new LineStrip("Spline", []);

  const controlPoint1Sketch = new SketchShape(controlPoint1, [
    new DragPoint(
      controlPoint1,
      (l) => l.a,
      (l, p) => runInAction(() => (l.a = new THREE.Vector3(p.x, p.y, 0))),
    ),
    new DragPoint(
      controlPoint1,
      (l) => l.b,
      (l, p) => runInAction(() => (l.b = new THREE.Vector3(p.x, p.y, 0))),
    ),
  ]);
  const controlPoint2Sketch = new SketchShape(controlPoint2, [
    new DragPoint(
      controlPoint2,
      (l) => l.a,
      (l, p) => runInAction(() => (l.a = new THREE.Vector3(p.x, p.y, 0))),
    ),
    new DragPoint(
      controlPoint2,
      (l) => l.b,
      (l, p) => runInAction(() => (l.b = new THREE.Vector3(p.x, p.y, 0))),
    ),
  ]);
  const splineStepLineSketch = new SketchShape(splineStepLine, []);
  const splineStepPointSketch = new SketchShape(splineStepPoint, []);
  const splineStripSketch = new SketchShape(splineStrip, []);

  autorun(() => {
    const newA = controlPoint1.a
      .clone()
      .add(
        controlPoint1
          .dirNormalized()
          .multiplyScalar(state.splineStep * controlPoint1.length()),
      );
    const newB = controlPoint2.b
      .clone()
      .add(
        controlPoint2
          .dirNormalized()
          .multiplyScalar(-state.splineStep * controlPoint2.length()),
      );

    const newLineVector = newB.clone().sub(newA);
    const newSplinePoint = newA.clone().add(
      newLineVector
        .clone()
        .normalize()
        .multiplyScalar(newLineVector.length() * state.splineStep),
    );

    const splinePoints = generateSplinePoints(
      controlPoint1,
      controlPoint2,
      state.splineStep,
      100,
    );

    runInAction(() => {
      splineStepLine.a = newA;
      splineStepLine.b = newB;
      splineStepPoint.position = newSplinePoint;
      splineStrip.setPoints(splinePoints);
    });
  });

  return (
    <SketchBook
      sketch={
        new Sketch(
          [
            controlPoint1Sketch,
            controlPoint2Sketch,
            splineStepLineSketch,
            splineStepPointSketch,
            splineStripSketch,
          ],
          new PropertyGroup("B-Spline", [
            new NumberRangeProperty(
              "Step",
              (step) => state.changeSplineStep(step),
              () => state.splineStep,
              0,
              1.0,
              0.01,
            ),
          ]),
        )
      }
    />
  );
};

function generateSplinePoints(
  controlPointA: Line,
  controlPointB: Line,
  step: number,
  points: number,
) {
  const stepSize = 1.0 / points;
  const splinPoints = new Array<THREE.Vector3>();

  for (let currentStep = 0.0; currentStep <= step; currentStep += stepSize) {
    const newA = controlPointA.a
      .clone()
      .add(
        controlPointA
          .dirNormalized()
          .multiplyScalar(currentStep * controlPointA.length()),
      );
    const newB = controlPointB.b
      .clone()
      .add(
        controlPointB
          .dirNormalized()
          .multiplyScalar(-currentStep * controlPointB.length()),
      );

    const newLineVector = newB.clone().sub(newA);
    splinPoints.push(
      newA.clone().add(
        newLineVector
          .clone()
          .normalize()
          .multiplyScalar(newLineVector.length() * currentStep),
      ),
    );
  }
  return splinPoints;
}
