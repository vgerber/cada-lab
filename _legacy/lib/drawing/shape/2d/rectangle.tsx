import * as THREE from "three";
import {
  Property,
  PropertyGroup,
  Vector2Property,
  Vector3Property,
} from "../../../property/types";
import { BoundingBox, Shape } from "../shape";
import { Line } from "./line";
import { Point } from "./point";

export class Rectangle implements Shape {
  name: string;
  size: THREE.Vector2;
  position: THREE.Vector3;
  points: THREE.Vector3[];
  boundingBox: BoundingBox;

  constructor(name: string, position: THREE.Vector3, size: THREE.Vector2) {
    this.name = name;
    this.position = position;
    this.size = size;
    this.boundingBox = new BoundingBox(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
    );
    this.points = [];
    this.generate();
  }

  clone(): Rectangle {
    return new Rectangle(this.name, this.position.clone(), this.size.clone());
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
          this.generate();
        },
        () => this.position,
      ),
      new Vector2Property(
        "Size",
        (s) => {
          this.size = s;
          this.generate();
        },
        () => this.size,
      ),
    ]);
  }

  getPoints(): Point[] {
    return this.points.map((p, pIndex) => new Point(pIndex.toString(), p));
  }

  getBoundingBox(): BoundingBox {
    return this.boundingBox;
  }

  getLines(): Line[] {
    return this.points.map(
      (p, pIndex) =>
        new Line(
          `Line${pIndex}`,
          p,
          this.points[(pIndex + 1) % this.points.length],
        ),
    );
  }

  private generate() {
    this.points = [
      new THREE.Vector3(-0.5 * this.size.x, -0.5 * this.size.y, 0),
      new THREE.Vector3(-0.5 * this.size.x, 0.5 * this.size.y, 0),
      new THREE.Vector3(0.5 * this.size.x, 0.5 * this.size.y, 0),
      new THREE.Vector3(0.5 * this.size.x, -0.5 * this.size.y, 0),
    ];
    this.points.forEach((p) => p.add(this.position));
    this.boundingBox = new BoundingBox(
      new THREE.Vector3(-0.5 * this.size.x, -0.5 * this.size.y, 0),
      new THREE.Vector3(0.5 * this.size.x, 0.5 * this.size.y, 0),
    );
    this.boundingBox.min.add(this.position);
    this.boundingBox.max.add(this.position);
  }
}
