import * as THREE from "three";
import { PropertyGroup, Vector3Property } from "../../../property/types";
import { BoundingBox, Shape } from "../shape";
import { Line } from "./line";

export class Point implements Shape {
  readonly name: string;
  position: THREE.Vector3;

  constructor(name: string, position: THREE.Vector3) {
    this.name = name;
    this.position = position;
  }

  clone(): Point {
    return new Point(this.name, this.position.clone());
  }

  getName(): string {
    return this.name;
  }

  getProperties(): PropertyGroup {
    return new PropertyGroup(this.name, [
      new Vector3Property(
        "Position",
        (p) => {
          this.position = p;
        },
        () => this.position,
      ),
    ]);
  }

  getPoints(): Point[] {
    return [this];
  }

  getLines(): Line[] {
    return [];
  }

  getBoundingBox(): BoundingBox {
    return new BoundingBox(this.position.clone(), this.position.clone());
  }
}
