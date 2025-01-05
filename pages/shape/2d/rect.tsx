import SketchBook from "../../../components/drawing/sketchbook";
import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";
import { Line } from "../../../lib/drawing/shape/2d/line";
import { Sketch } from "../../../lib/drawing/sketch/sketch";
import styles from "./line.module.scss";
import * as THREE from "three";
import { Point } from "../../../lib/drawing/shape/2d/point";
import { Circle } from "../../../lib/drawing/shape/2d/circle";
import { useState } from "react";
import { Property } from "../../../lib/property/types";
import { Rectangle } from "../../../lib/drawing/shape/2d/rectangle";

export default function RectanglePage() {
  let [rect, setRectangle] = useState(
    new Rectangle(
      "Rect 1",
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector2(3, 5),
    ),
  );
  let [sketch, setSketch] = useState(new Sketch([rect]));

  function onPropertyChanged(property: Property) {
    setRectangle(rect);
    setSketch(new Sketch([rect]));
  }

  return <SketchBook sketch={sketch} onPropertyChanged={onPropertyChanged} />;
}
