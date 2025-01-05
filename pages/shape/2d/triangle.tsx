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
import { Triangle } from "../../../lib/drawing/shape/2d/triangle";

export default function RectanglePage() {
  let [triangle, setTriangle] = useState(
    new Triangle(
      "Tri 1",
      new THREE.Vector3(-1, -1, 0),
      new THREE.Vector3(1, -1, 0),
      new THREE.Vector3(0, 1, 0),
    ),
  );
  let [sketch, setSketch] = useState(new Sketch([triangle]));

  function onPropertyChanged(property: Property) {
    setTriangle(triangle);
    setSketch(new Sketch([triangle]));
  }

  return <SketchBook sketch={sketch} onPropertyChanged={onPropertyChanged} />;
}
