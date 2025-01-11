import { Shape } from "../shape/shape";
import { SketchInteractable } from "./interaction";

export class SketchShapeProperties {
  isConstruction = false;

  clone() {
    const properties = new SketchShapeProperties();
    properties.isConstruction = this.isConstruction;
    return properties;
  }
}

export class SketchShape<ShapeType extends Shape> {
  shape: ShapeType;
  sketchInteractables: SketchInteractable<any>[] = [];
  properties = new SketchShapeProperties();

  constructor(shape: ShapeType, interactables?: SketchInteractable<any>[]) {
    this.shape = shape;
    if (interactables) {
      this.sketchInteractables = interactables;
    }
  }

  clone(): SketchShape<ShapeType> {
    const clone = new SketchShape(this.shape.clone() as ShapeType);
    clone.sketchInteractables = this.sketchInteractables.map((interactable) =>
      interactable.clone(this.shape),
    );
    clone.properties = this.properties.clone();
    return clone;
  }

  getProperties(): SketchShapeProperties {
    return this.properties;
  }

  getShape(): ShapeType {
    return this.shape;
  }

  addInteractable(sketchInteractable: SketchInteractable<any>) {
    this.sketchInteractables.push(sketchInteractable);
  }

  getInteractables(): SketchInteractable<any>[] {
    return this.sketchInteractables;
  }
}
