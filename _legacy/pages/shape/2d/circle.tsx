import SketchBook from "../../../components/drawing/sketchbook";
import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";
import { Line } from "../../../lib/drawing/shape/2d/line";
import { Sketch } from "../../../lib/drawing/sketch/sketch";
import styles from "./line.module.scss";
import * as THREE from "three";
import { Circle } from "../../../lib/drawing/shape/2d/circle";
import { Property } from "../../../lib/property/types";
import { SketchShape } from "../../../lib/drawing/sketch/sketch_shape";
import { DragPoint } from "../../../lib/drawing/sketch/interaction";

export default function CirclePage() {
  let circle1 = new Circle(
    "Circle 1",
    new THREE.Vector3(1, 1, 0),
    1,
    0,
    Math.PI * 2,
    50,
  );
  let circle2 = new Circle(
    "Circle 2",
    new THREE.Vector3(1, 1, 0),
    1,
    0,
    Math.PI * 2,
    50,
  );

  function onPropertyChanged(property: Property) {}

  let sketchCircle2 = new SketchShape(circle2);
  sketchCircle2.addInteractable(
    new DragPoint(
      circle2,
      (target) => target.position,
      (target, position) => target.position.set(position.x, position.y, 0),
    ),
  );

  let sketchLine = new SketchShape(
    new Line("Test", new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)),
  );

  let sketch = new Sketch([
    new SketchShape(circle1),
    sketchCircle2,
    sketchLine,
  ]);

  return <SketchBook sketch={sketch} onPropertyChanged={onPropertyChanged} />;
}
