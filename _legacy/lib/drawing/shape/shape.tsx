import * as THREE from "three";
import { PropertyGroup } from "../../property/types";

export class BoundingBox {
  readonly min: THREE.Vector3;
  readonly max: THREE.Vector3;

  constructor(min: THREE.Vector3, max: THREE.Vector3) {
    this.min = min;
    this.max = max;
  }
}

export interface Shape {
  getBoundingBox(): BoundingBox;

  getProperties(): PropertyGroup;

  getName(): string;

  clone(): Shape;
}
