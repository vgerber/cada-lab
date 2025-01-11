import * as THREE from "three";
import { PropertyGroup } from "../../property/types";

export class BoundingBox {
  readonly min: THREE.Vector3;
  readonly max: THREE.Vector3;

  constructor(min: THREE.Vector3, max: THREE.Vector3) {
    this.min = min;
    this.max = max;
  }

  size(): THREE.Vector3 {
    return this.max.clone().sub(this.min);
  }

  center() {
    return this.size().multiplyScalar(0.5).add(this.min);
  }
}

export interface Shape {
  getBoundingBox(): BoundingBox;

  getProperties(): PropertyGroup;

  getName(): string;

  clone(): Shape;

  getSceneElement(): JSX.Element;
}
