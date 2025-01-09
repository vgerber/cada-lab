import { makeAutoObservable } from "mobx";
import * as THREE from "three";
import { PropertyGroup, Vector3Property } from "../../../property/types";
import { BoundingBox, Shape } from "../shape";

export class DashedLineProperties {
  gapSize = 0.01;
  dashSize = 0.01;
}

export class LineProperties {
  dashedProperties: DashedLineProperties | null = null;
}

export class Line implements Shape {
  name: string;
  a: THREE.Vector3;
  b: THREE.Vector3;
  properties = new LineProperties();

  constructor(name: string, a: THREE.Vector3, b: THREE.Vector3) {
    this.name = name;
    this.a = a;
    this.b = b;
    makeAutoObservable(this);
  }

  clone(): Line {
    const line = new Line(this.name, this.a.clone(), this.b.clone());
    line.properties = this.properties;
    return line;
  }

  getName(): string {
    return this.name;
  }

  length(): number {
    return this.a.distanceTo(this.b);
  }

  dirNormalized(): THREE.Vector3 {
    return this.b.clone().sub(this.a).normalize();
  }

  closestPoint(p: THREE.Vector3): THREE.Vector3 {
    const pa = p.clone().sub(this.a);

    const lineLength = this.length();
    const dir = this.dirNormalized();

    const lineMin = Math.min(0, lineLength);
    const lineMax = Math.max(0, lineLength);
    const t = Math.min(lineMax, Math.max(lineMin, pa.dot(dir)));

    return this.a.clone().add(dir.multiplyScalar(t));
  }

  getProperties(): PropertyGroup {
    return new PropertyGroup(this.name, [
      new Vector3Property(
        "A",
        (p) => (this.a = p),
        () => this.a,
      ),
      new Vector3Property(
        "B",
        (p) => (this.b = p),
        () => this.b,
      ),
    ]);
  }

  getBoundingBox(): BoundingBox {
    return new BoundingBox(
      this.a.clone().min(this.b),
      this.a.clone().max(this.b),
    );
  }
}
