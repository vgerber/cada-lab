import { Circle } from "@/lib/drawing/shape/2d/circle";
import { Line } from "@/lib/drawing/shape/2d/line";
import { Point } from "@/lib/drawing/shape/2d/point";
import { CatmullRomSpline } from "@/lib/drawing/shape/curve/catmull_rom_spline";
import { Shape } from "@/lib/drawing/shape/shape";
import { CircleShapeElement } from "./circle_element";
import CatmullRomSplineElement from "./curve/cutmull_rom_spline_element";
import { LineShapeElement } from "./line_element";
import PointShapeElement from "./point_element";

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
