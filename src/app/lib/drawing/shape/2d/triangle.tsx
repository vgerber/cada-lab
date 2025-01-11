import { LineShapeElement } from "@/components/drawing/shape/line_element";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
import * as THREE from "three";
import { PropertyGroup, Vector3Property } from "../../../property/types";
import { BoundingBox, Shape } from "../shape";
import { Line } from "./line";
import { Point } from "./point";

export class Triangle implements Shape {
  name: string;
  a: THREE.Vector3;
  b: THREE.Vector3;
  c: THREE.Vector3;

  constructor(
    name: string,
    a: THREE.Vector3,
    b: THREE.Vector3,
    c: THREE.Vector3,
  ) {
    this.name = name;
    this.a = a;
    this.b = b;
    this.c = c;

    makeAutoObservable(this);
  }

  clone(): Triangle {
    return new Triangle(
      this.name,
      this.a.clone(),
      this.b.clone(),
      this.c.clone(),
    );
  }

  getName(): string {
    return this.name;
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
      new Vector3Property(
        "C",
        (p) => (this.c = p),
        () => this.c,
      ),
    ]);
  }

  getBoundingBox(): BoundingBox {
    return new BoundingBox(
      this.a.clone().min(this.b.clone().min(this.c)),
      this.a.clone().max(this.b.clone().max(this.c)),
    );
  }

  getPoints(): Point[] {
    return [
      new Point("A", this.a),
      new Point("B", this.b),
      new Point("C", this.c),
    ];
  }

  getLines(): Line[] {
    return [
      new Line("AB", this.a, this.b),
      new Line("BC", this.b, this.c),
      new Line("CA", this.c, this.a),
    ];
  }

  getGeometry(): THREE.BufferGeometry {
    return new THREE.BufferGeometry().setFromPoints([
      this.a,
      this.b,
      this.b,
      this.c,
      this.c,
      this.a,
    ]);
  }

  getSceneElement(): JSX.Element {
    const ElementObserver = observer(() => {
      return (
        <group>
          <LineShapeElement line={new Line("A", this.a, this.b)} />
          <LineShapeElement line={new Line("B", this.b, this.c)} />
          <LineShapeElement line={new Line("C", this.c, this.a)} />
        </group>
      );
    });
    return <ElementObserver />;
  }
}
