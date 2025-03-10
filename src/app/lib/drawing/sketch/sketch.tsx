import { PropertyGroup } from "@/lib/property/types";
import { makeAutoObservable } from "mobx";
import * as THREE from "three";
import { SketchShape } from "./sketch_shape";

export class BoundingBox {
  readonly min: THREE.Vector3;
  readonly max: THREE.Vector3;

  constructor(min: THREE.Vector3, max: THREE.Vector3) {
    this.min = min;
    this.max = max;
  }

  center(): THREE.Vector3 {
    return this.min.clone().add(this.size().multiplyScalar(0.5));
  }

  size(): THREE.Vector3 {
    return this.max.clone().sub(this.min);
  }
}

export type AnySketchShape = SketchShape<any>;

export class Sketch {
  shapes: AnySketchShape[];
  properties: PropertyGroup;
  private cachedBoundingBox: BoundingBox;

  constructor(shapes: AnySketchShape[], properties?: PropertyGroup) {
    this.shapes = shapes;
    this.cachedBoundingBox = this.updateBoundingBox();

    if (properties) {
      this.properties = new PropertyGroup(properties.name, [
        ...properties.properties,
        ...shapes.map((shape) => shape.getShape().getProperties()),
      ]);
    } else {
      this.properties = new PropertyGroup(
        "Sketch",
        shapes.map((shape) => shape.getShape().getProperties()),
      );
    }
    makeAutoObservable(this);
  }

  clone(): Sketch {
    return new Sketch(this.shapes.map((shape) => shape.clone()));
  }

  getBoundingBox(): BoundingBox {
    return this.cachedBoundingBox;
  }

  updateBoundingBox(): BoundingBox {
    let boundingBox = new BoundingBox(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
    );
    this.shapes.forEach((shape, shapeIndex) => {
      const shapeBB = shape.getShape().getBoundingBox();
      if (shapeIndex === 0) {
        boundingBox = new BoundingBox(shapeBB.min.clone(), shapeBB.max.clone());
      } else {
        boundingBox.min.min(shapeBB.min);
        boundingBox.max.max(shapeBB.max);
      }
    });
    this.cachedBoundingBox = boundingBox;
    return boundingBox;
  }
}
