import { ReactNode } from "react";
import CircleShape2d from "./shape/2d/circle";

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
      // line: {
      //   name: "Line",
      //   component: <LineShape2d />,
      // },
    },
  },
};
