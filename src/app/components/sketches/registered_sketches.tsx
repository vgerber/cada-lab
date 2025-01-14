import LinePointDistanceSketch from "@/components/sketches/collision/line_point";
import { MeshOffset } from "@/components/sketches/other/mesh_offset";
import CircleShape2d from "@/components/sketches/shape/2d/circle";
import LineShape2d from "@/components/sketches/shape/2d/line";
import RectangleShape2d from "@/components/sketches/shape/2d/rect";
import TriangleShape2d from "@/components/sketches/shape/2d/triangle";
import { CatmullRomSplineSketch } from "@/components/sketches/shape/catmull_rom_spline";
import { ReactNode } from "react";

export type SketchRegistration = {
  name: string;
  component: ReactNode;
};

export type SketchRegistrationGroup = {
  name: string;
  registrations: Record<string, SketchRegistration>;
};

export const registeredSketches: Record<string, SketchRegistrationGroup> = {
  "shapes/2d": {
    name: "Shapes 2D",
    registrations: {
      line: {
        name: "Line",
        component: <LineShape2d />,
      },
      rectangle: {
        name: "Rectangle",
        component: <RectangleShape2d />,
      },
      triangle: {
        name: "Triangle",
        component: <TriangleShape2d />,
      },
      circle: {
        name: "Circle",
        component: <CircleShape2d />,
      },
    },
  },
  curve: {
    name: "Curve",
    registrations: {
      "catmull-rom-spline": {
        name: "Catmull-Rom-Spline",
        component: <CatmullRomSplineSketch />,
      },
    },
  },
  collision: {
    name: "Collision",
    registrations: {
      "line-point": {
        name: "Line - Point",
        component: <LinePointDistanceSketch />,
      },
    },
  },
  other: {
    name: "Other",
    registrations: {
      "mesh-offset": {
        name: "Mesh Offset",
        component: <MeshOffset />,
      },
    },
  },
};
