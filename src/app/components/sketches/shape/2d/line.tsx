import { Line } from "@/lib/drawing/shape/2d/line";
import { DragPoint } from "@/lib/drawing/sketch/interaction";
import { Sketch } from "@/lib/drawing/sketch/sketch";
import { SketchShape } from "@/lib/drawing/sketch/sketch_shape";
import * as THREE from "three";
import SketchBook from "../../sketchbook";

export default function LineShape2d() {
  return <SketchBook sketch={setupSketch()} onPropertyChanged={() => {}} />;
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
  console.log(sketchLine);
  return new Sketch([sketchLine]);
}
