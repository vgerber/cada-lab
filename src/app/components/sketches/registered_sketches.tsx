import CircleShape2d from "@/components/sketches/shape/2d/circle";
import LineShape2d from "@/components/sketches/shape/2d/line";
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
      circle: {
        name: "Circle",
        component: <CircleShape2d />,
      },
      line: {
        name: "Line",
        component: <LineShape2d />,
      },
    },
  },
};
