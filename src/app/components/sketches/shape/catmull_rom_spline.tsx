import SketchBook from "@/components/sketches/sketchbook";
import { DashedLineProperties, Line } from "@/lib/drawing/shape/2d/line";
import { CatmullRomSpline } from "@/lib/drawing/shape/curve/catmull_rom_spline";
import { DragPoint } from "@/lib/drawing/sketch/interaction";
import { AnySketchShape, Sketch } from "@/lib/drawing/sketch/sketch";
import { SketchShape } from "@/lib/drawing/sketch/sketch_shape";
import { useState } from "react";
import * as THREE from "three";

export default function ShapeCatmullRomSpline() {
  const [spline, setSpline] = useState(
    new CatmullRomSpline("CRS", [
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(3, 0, 0),
      new THREE.Vector3(4, 1, 0),
      new THREE.Vector3(5, 1, 0),
      new THREE.Vector3(6, 1, 0),
    ]),
  );

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

  const sketchLine = new SketchShape(spline);
  sketchLine.addInteractable(lineP0Drag);
  sketchLine.addInteractable(lineP1Drag);
  sketchLine.addInteractable(lineP2Drag);
  sketchLine.addInteractable(lineP3Drag);
  sketchLine.addInteractable(lineP4Drag);
  sketchLine.addInteractable(lineP5Drag);

  const line0 = new Line("P0", spline.points[0], spline.points[1]);
  line0.properties.dashedProperties = new DashedLineProperties();
  const line1 = new Line(
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
