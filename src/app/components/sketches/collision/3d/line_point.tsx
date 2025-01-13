import { SketchBook } from "@/components/sketches/sketchbook";
import { Line } from "@/lib/drawing/shape/2d/line";
import { Point } from "@/lib/drawing/shape/2d/point";
import { Shape } from "@/lib/drawing/shape/shape";
import { DragPoint } from "@/lib/drawing/sketch/interaction";
import { AnySketchShape, Sketch } from "@/lib/drawing/sketch/sketch";
import { SketchShape } from "@/lib/drawing/sketch/sketch_shape";
import { useState } from "react";
import * as THREE from "three";

export default function LinePointDistance() {
  const [line, setLine] = useState(
    new Line("Line", new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 1, 0)),
  );
  const [point, setPoint] = useState(
    new Point("Point", new THREE.Vector3(-1, 1, 0)),
  );
  const closestPoint = new Point(
    "Closest Point",
    line.closestPoint(point.position),
  );
  const closestPointLine = new Line(
    "Point Line",
    closestPoint.position,
    point.position,
  );

  const lineADrag = new DragPoint(
    line,
    (l) => l.a,
    (l, position) => l.a.set(position.x, position.y, 0),
  );
  const lineBDrag = new DragPoint(
    line,
    (l) => l.b,
    (l, position) => l.b.set(position.x, position.y, 0),
  );
  const sketchLine = new SketchShape(line);
  sketchLine.addInteractable(lineADrag);
  sketchLine.addInteractable(lineBDrag);

  const sketchPoint = new SketchShape(point);
  sketchPoint.addInteractable(
    new DragPoint(
      point,
      (p) => p.position,
      (p, position) => p.position.set(position.x, position.y, 0),
    ),
  );

  function onUpdateShape(sketchShape: AnySketchShape) {
    const updatedShapeName = (sketchShape.shape as Shape).getName();
    if (updatedShapeName === line.getName()) {
      setLine(sketchShape.getShape().clone());
    }
    if (updatedShapeName === point.getName()) {
      setPoint(sketchShape.getShape().clone());
    }
  }

  return (
    <SketchBook
      sketch={
        new Sketch([
          sketchLine,
          sketchPoint,
          new SketchShape(closestPoint),
          new SketchShape(closestPointLine),
        ])
      }
      onUpdate={(sketchShape) => onUpdateShape(sketchShape)}
    />
  );
}
