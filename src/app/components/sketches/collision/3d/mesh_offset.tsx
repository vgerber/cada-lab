import { SketchBook } from "@/components/sketches/sketchbook";
import { useState } from "react";
import * as THREE from "three";
import { MathUtils } from "three";
import {
  DashedLineProperties,
  Line,
} from "../../../../lib/drawing/shape/2d/line";
import { Point } from "../../../../lib/drawing/shape/2d/point";
import { Shape } from "../../../../lib/drawing/shape/shape";
import { DragPoint } from "../../../../lib/drawing/sketch/interaction";
import { AnySketchShape, Sketch } from "../../../../lib/drawing/sketch/sketch";
import { SketchShape } from "../../../../lib/drawing/sketch/sketch_shape";

export default function LinePointDistance() {
  const [lineA, setLineA] = useState(
    new Line("Line A", new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 1, 0)),
  );
  const [lineB, setLineB] = useState(
    new Line("Line B", new THREE.Vector3(0, 0, 0), new THREE.Vector3(-1, 1, 0)),
  );

  const meshOffset = 0.3;

  const lineAADrag = new DragPoint(
    lineA,
    (l) => l.a,
    (l, position) => l.a.set(position.x, position.y, 0),
  );
  const lineABDrag = new DragPoint(
    lineA,
    (l) => l.b,
    (l, position) => l.b.set(position.x, position.y, 0),
  );
  const sketchLineA = new SketchShape(lineA);
  sketchLineA.addInteractable(lineAADrag);
  sketchLineA.addInteractable(lineABDrag);

  lineB.a = lineA.a;
  const lineBBDrag = new DragPoint(
    lineB,
    (l) => l.b,
    (l, position) => l.b.set(position.x, position.y, 0),
  );
  const sketchLineB = new SketchShape(lineB);
  sketchLineB.addInteractable(lineBBDrag);

  const normalA = sketchLineA.shape
    .dirNormalized()
    .cross(new THREE.Vector3(0, 0, 1))
    .multiplyScalar(-1);
  const normalB = sketchLineB.shape
    .dirNormalized()
    .cross(new THREE.Vector3(0, 0, 1));

  const normalLineA = new Line(
    "Normal A",
    lineA.a,
    lineA.a.clone().add(normalA.clone().multiplyScalar(meshOffset)),
  );
  normalLineA.properties.dashedProperties = new DashedLineProperties();
  const normalLineB = new Line(
    "Normal B",
    lineA.a,
    lineA.a.clone().add(normalB.clone().multiplyScalar(meshOffset)),
  );
  normalLineB.properties.dashedProperties = new DashedLineProperties();

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
  const offsetPosition = lineA.a
    .clone()
    .add(meanNormalVector.clone().multiplyScalar(offsetLength));
  const shiftLine = new Line("Shift Line", lineA.a, offsetPosition);
  shiftLine.properties.dashedProperties = new DashedLineProperties();

  const offsetPoint = new Point("Shift Offset", offsetPosition);

  const lineAOpposite = new Line(
    "A Opposite",
    offsetPosition,
    lineA.a.clone().add(normalA.clone().multiplyScalar(meshOffset)),
  );
  lineAOpposite.properties.dashedProperties = new DashedLineProperties();
  const lineBOpposite = new Line(
    "B Opposite",
    offsetPosition,
    lineB.a.clone().add(normalB.clone().multiplyScalar(meshOffset)),
  );
  lineBOpposite.properties.dashedProperties = new DashedLineProperties();

  const lineAOffset = new Line(
    "Line A (Offset)",
    offsetPosition,
    lineA.b.clone().add(normalA.clone().multiplyScalar(meshOffset)),
  );
  const lineBOffset = new Line(
    "Line B (Offset)",
    offsetPosition,
    lineB.b.clone().add(normalB.clone().multiplyScalar(meshOffset)),
  );

  function onUpdateShape(sketchShape: AnySketchShape) {
    const updatedShapeName = (sketchShape.shape as Shape).getName();
    if (updatedShapeName === lineA.getName()) {
      setLineA(sketchShape.getShape().clone());
    }
    if (updatedShapeName === lineB.getName()) {
      setLineB(sketchShape.getShape().clone());
    }
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
      onPropertyChanged={() => {}}
      onUpdate={(sketchShape) => onUpdateShape(sketchShape)}
    />
  );
}
