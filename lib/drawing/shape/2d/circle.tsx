import * as THREE from "three";
import {
  BooleanProperty,
  NumberProperty,
  Property,
  PropertyGroup,
  Vector3Property,
} from "../../../property/types";
import { BoundingBox, Shape } from "../shape";

export class Circle implements Shape {
  name: string;
  resolution: number;
  circleStart: number;
  circleEnd: number;
  position: THREE.Vector3;
  radius: number;
  boundingBox: BoundingBox;
  drawPoints: boolean = true;

  constructor(
    name: string,
    position: THREE.Vector3,
    radius: number,
    circleStart: number = 0,
    circleEnd: number = Math.PI * 2,
    resolution: number = 100,
  ) {
    this.name = name;
    this.position = position;
    this.radius = radius;
    this.circleStart = circleStart;
    this.circleEnd = circleEnd;
    this.resolution = resolution;
    this.boundingBox = new BoundingBox(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
    );
  }

  clone(): Circle {
    return new Circle(
      this.name,
      this.position.clone(),
      this.radius,
      this.circleStart,
      this.circleEnd,
      this.resolution,
    );
  }

  getName(): string {
    return this.name;
  }

  getProperties(): PropertyGroup {
    return new PropertyGroup(this.name, [
      new BooleanProperty(
        "Points",
        (e) => {
          this.drawPoints = e;
        },
        () => {
          return this.drawPoints;
        },
      ),
      new NumberProperty(
        "Start",
        (e) => {
          this.setCircleStart(e, true);
        },
        () => THREE.MathUtils.radToDeg(this.circleStart),
        0,
        360,
      ),
      new NumberProperty(
        "End",
        (e) => {
          this.setCircleEnd(e, true);
        },
        () => THREE.MathUtils.radToDeg(this.circleEnd),
        0,
        360,
      ),
      new NumberProperty(
        "Radius",
        (e) => {
          this.radius = e;
        },
        () => this.radius,
        0,
        Number.MAX_VALUE,
      ),
      new NumberProperty(
        "Resolution",
        (e) => {
          this.resolution = e;
        },
        () => this.resolution,
        3,
        Number.MAX_VALUE,
      ),
      new Vector3Property(
        "Position",
        (p) => {
          this.position = p;
        },
        () => this.position,
      ),
      new Vector3Property(
        "AABB Max",
        (p) => {},
        () => this.boundingBox.max,
      ),
      new Vector3Property(
        "AABB Min",
        (p) => {},
        () => this.boundingBox.min,
      ),
    ]);
  }

  setCircleStart(circleStart: number, inDegree = false) {
    this.circleStart = inDegree
      ? THREE.MathUtils.degToRad(circleStart)
      : circleStart;
  }

  setCircleEnd(circleEnd: number, inDegree = false) {
    this.circleEnd = inDegree ? THREE.MathUtils.degToRad(circleEnd) : circleEnd;
  }

  getBoundingBox(): BoundingBox {
    let radiusVec = new THREE.Vector3(this.radius, this.radius, this.radius);
    let min = this.position.clone().sub(radiusVec);
    let max = this.position.clone().add(radiusVec);
    return new BoundingBox(min, max);
  }
}
