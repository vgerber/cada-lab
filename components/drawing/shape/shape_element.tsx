import { Shape } from "../../../lib/drawing/shape/shape";
import LineSegments from "./circle_element";
import Points from "./points";
import * as THREE from "three";
import { useCallback, useEffect, useRef, useState } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { useDrag } from "../util";
import { Line } from "../../../lib/drawing/shape/2d/line";
import LineShapeElement from "./line_element";
import { Point } from "../../../lib/drawing/shape/2d/point";
import PointShapeElement from "./point_element";
import { Circle } from "../../../lib/drawing/shape/2d/circle";
import CircleShapeElement from "./circle_element";
import { CatmullRomSpline } from "../../../lib/drawing/shape/curve/catmull_rom_spline";
import CatmullRomSplineElement from "./curve/cutmull_rom_spline_element";

export default function ShapeElement({ shape }: { shape: Shape }) {
  if (shape instanceof Line) {
    return <LineShapeElement line={shape} />;
  } else if (shape instanceof Point) {
    return <PointShapeElement point={shape} />;
  } else if (shape instanceof Circle) {
    return <CircleShapeElement circle={shape} />;
  } else if (shape instanceof CatmullRomSpline) {
    return <CatmullRomSplineElement spline={shape} />;
  } else {
    return <></>;
  }
}
