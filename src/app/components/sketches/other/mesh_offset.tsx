"use client";
import { SketchBook } from "@/components/sketches/sketchbook";
import { runInAction } from "mobx";
import { observer, useLocalObservable } from "mobx-react";
import * as THREE from "three";
import { MathUtils } from "three";
import { Line } from "../../../lib/drawing/shape/2d/line";
import { Point } from "../../../lib/drawing/shape/2d/point";
import { DragPoint } from "../../../lib/drawing/sketch/interaction";
import { AnySketchShape, Sketch } from "../../../lib/drawing/sketch/sketch";
import { SketchShape } from "../../../lib/drawing/sketch/sketch_shape";

export const MeshOffset = observer(() => {
  const state = useLocalObservable(() => ({
    lineA: new Line(
      "Line A",
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1, 1, 0),
    ),
    lineB: new Line(
      "Line B",
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-1, 1, 0),
    ),
  }));

  const meshOffset = 0.3;

  const lineAADrag = new DragPoint(
    state.lineA,
    (l) => l.b,
    (l, position) =>
      runInAction(() => (l.b = new THREE.Vector3(position.x, position.y, 0))),
  );
  const lineABDrag = new DragPoint(
    state.lineA,
    (l) => state.lineA.a,
    (l, position) =>
      runInAction(() => {
        state.lineA.a = new THREE.Vector3(position.x, position.y, 0);
        state.lineB.a = new THREE.Vector3(position.x, position.y, 0);
      }),
  );
  const sketchLineA = new SketchShape(state.lineA, [lineABDrag, lineAADrag]);

  const lineBBDrag = new DragPoint(
    state.lineB,
    (l) => l.b,
    (l, position) =>
      runInAction(() => (l.b = new THREE.Vector3(position.x, position.y, 0))),
  );
  const sketchLineB = new SketchShape(state.lineB, [lineBBDrag]);

  const normalA = sketchLineA.shape
    .dirNormalized()
    .cross(new THREE.Vector3(0, 0, 1))
    .multiplyScalar(-1);
  const normalB = sketchLineB.shape
    .dirNormalized()
    .cross(new THREE.Vector3(0, 0, 1));

  const normalLineA = new Line(
    "Normal A",
    state.lineA.a,
    state.lineA.a.clone().add(normalA.clone().multiplyScalar(meshOffset)),
    { construction: true },
  );
  const normalLineB = new Line(
    "Normal B",
    state.lineA.a,
    state.lineA.a.clone().add(normalB.clone().multiplyScalar(meshOffset)),
    { construction: true },
  );

  const alpha = Math.acos(
    normalA.dot(normalB) / (normalA.length() * normalB.length()),
  );
  console.log(MathUtils.radToDeg(alpha).toFixed(0));

  const offsetLength = Math.abs(meshOffset) / Math.cos(alpha / 2);

  const meanNormalVector = normalLineA
    .dirNormalized()
    .clone()
    .add(normalLineB.dirNormalized())
    .normalize();
  const offsetPosition = state.lineA.a
    .clone()
    .add(meanNormalVector.clone().multiplyScalar(offsetLength));
  const shiftLine = new Line("Shift Line", state.lineA.a, offsetPosition, {
    construction: true,
  });

  const offsetPoint = new Point("Shift Offset", offsetPosition);

  const lineAOpposite = new Line(
    "A Opposite",
    offsetPosition,
    state.lineA.a.clone().add(normalA.clone().multiplyScalar(meshOffset)),
    { construction: true },
  );
  const lineBOpposite = new Line(
    "B Opposite",
    offsetPosition,
    state.lineB.a.clone().add(normalB.clone().multiplyScalar(meshOffset)),
    { construction: true },
  );

  const lineAOffset = new Line(
    "Line A (Offset)",
    offsetPosition,
    state.lineA.b.clone().add(normalA.clone().multiplyScalar(meshOffset)),
  );
  const lineBOffset = new Line(
    "Line B (Offset)",
    offsetPosition,
    state.lineB.b.clone().add(normalB.clone().multiplyScalar(meshOffset)),
  );

  function onUpdateShape(sketchShape: AnySketchShape) {
    // const updatedShapeName = (sketchShape.shape as Shape).getName();
    // if (updatedShapeName === lineA.getName()) {
    //   setLineA(sketchShape.getShape().clone());
    // }
    // if (updatedShapeName === lineB.getName()) {
    //   setLineB(sketchShape.getShape().clone());
    // }
  }

  const shapes = [
    sketchLineA,
    sketchLineB,
    new SketchShape(normalLineA),
    new SketchShape(normalLineB),
    new SketchShape(shiftLine),
    new SketchShape(offsetPoint),
    new SketchShape(lineAOffset),
    new SketchShape(lineBOffset),
    new SketchShape(lineAOpposite),
    new SketchShape(lineBOpposite),
  ];

  return (
    <SketchBook
      sketch={new Sketch(shapes)}
      onUpdate={(sketchShape) => onUpdateShape(sketchShape)}
    />
  );
});
