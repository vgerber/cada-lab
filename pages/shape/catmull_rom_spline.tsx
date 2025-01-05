import { useState } from "react";
import * as THREE from "three";
import {
  DashedLineProperties,
  Line,
  LineProperties,
} from "../../lib/drawing/shape/2d/line";
import { Point } from "../../lib/drawing/shape/2d/point";
import SketchBook from "../../components/drawing/sketchbook";
import { DragPoint } from "../../lib/drawing/sketch/interaction";
import { AnySketchShape, Sketch } from "../../lib/drawing/sketch/sketch";
import { SketchShape } from "../../lib/drawing/sketch/sketch_shape";
import { Shape } from "../../lib/drawing/shape/shape";
import { CatmullRomSpline } from "../../lib/drawing/shape/curve/catmull_rom_spline";

export default function ShapeCatmullRomSpline() {
  let [spline, setSpline] = useState(
    new CatmullRomSpline("CRS", [
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(3, 0, 0),
      new THREE.Vector3(4, 1, 0),
      new THREE.Vector3(5, 1, 0),
      new THREE.Vector3(6, 1, 0),
    ]),
  );

  let lineP0Drag = new DragPoint(
    spline.points[0],
    (p) => p,
    (p, position) => p.set(position.x, position.y, 0),
  );
  let lineP1Drag = new DragPoint(
    spline.points[1],
    (p) => p,
    (p, position) => p.set(position.x, position.y, 0),
  );
  let lineP2Drag = new DragPoint(
    spline.points[2],
    (p) => p,
    (p, position) => p.set(position.x, position.y, 0),
  );
  let lineP3Drag = new DragPoint(
    spline.points[3],
    (p) => p,
    (p, position) => p.set(position.x, position.y, 0),
  );
  let lineP4Drag = new DragPoint(
    spline.points[4],
    (p) => p,
    (p, position) => p.set(position.x, position.y, 0),
  );
  let lineP5Drag = new DragPoint(
    spline.points[5],
    (p) => p,
    (p, position) => p.set(position.x, position.y, 0),
  );

  let sketchLine = new SketchShape(spline);
  sketchLine.addInteractable(lineP0Drag);
  sketchLine.addInteractable(lineP1Drag);
  sketchLine.addInteractable(lineP2Drag);
  sketchLine.addInteractable(lineP3Drag);
  sketchLine.addInteractable(lineP4Drag);
  sketchLine.addInteractable(lineP5Drag);

  let line0 = new Line("P0", spline.points[0], spline.points[1]);
  line0.properties.dashedProperties = new DashedLineProperties();
  let line1 = new Line(
    "P1",
    spline.points[spline.points.length - 2],
    spline.points[spline.points.length - 1],
  );
  line1.properties.dashedProperties = new DashedLineProperties();

  function onUpdateShape(sketchShape: AnySketchShape) {
    setSpline(sketchShape.getShape().clone());
  }

  return (
    <SketchBook
      sketch={
        new Sketch([sketchLine, new SketchShape(line0), new SketchShape(line1)])
      }
      onPropertyChanged={() => {}}
      onUpdate={(sketchShape) => onUpdateShape(sketchShape)}
    />
  );
}
