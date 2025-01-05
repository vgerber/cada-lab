import SketchBook from "../../../components/drawing/sketchbook";
import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";
import { Line } from "../../../lib/drawing/shape/2d/line";
import { Sketch } from "../../../lib/drawing/sketch/sketch";
import styles from "./line.module.scss";
import * as THREE from "three";
import { Point } from "../../../lib/drawing/shape/2d/point";
import { Property } from "../../../lib/property/types";
import { useReducer, useState } from "react";
import { DragPoint } from "../../../lib/drawing/sketch/interaction";
import { SketchShape } from "../../../lib/drawing/sketch/sketch_shape";

export default function LineShape2d() {
  let [sketch, setSketch] = useState(setupSketch());

  return <SketchBook sketch={sketch} onPropertyChanged={() => {}} />;
}

function setupSketch(): Sketch {
  let line = new Line(
    "Line 1",
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 1, 0),
  );
  let lineADrag = new DragPoint(
    line,
    (l) => l.a,
    (l, position) => l.a.set(position.x, position.y, 0),
  );
  let lineBDrag = new DragPoint(
    line,
    (l) => l.b,
    (l, position) => l.b.set(position.x, position.y, 0),
  );
  let sketchLine = new SketchShape(line);
  sketchLine.addInteractable(lineADrag);
  sketchLine.addInteractable(lineBDrag);
  console.log(sketchLine);
  return new Sketch([sketchLine]);
}
