import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
import { useTheme } from "styled-components";
import * as THREE from "three";
import { PropertyGroup } from "../../../property/types";
import { BoundingBox, Shape } from "../shape";

export class LineStrip implements Shape {
  name: string;
  private points: THREE.Vector3[] = [];
  bakedPoints: THREE.BufferGeometry = new THREE.BufferGeometry();
  bakedBoundingBox: BoundingBox = new BoundingBox(
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, 0),
  );

  constructor(name: string, points: THREE.Vector3[]) {
    this.name = name;
    this.points = points;
    this.bake();
    makeAutoObservable(this);
  }

  clone(): LineStrip {
    const spline = new LineStrip(
      this.name,
      this.points.map((p) => p.clone()),
    );
    return spline;
  }

  getName(): string {
    return this.name;
  }

  setPoint(pointIndex: number, point: THREE.Vector3) {
    this.points[pointIndex] = point;
    this.bake();
  }

  getPoint(pointIndex: number): THREE.Vector3 | undefined {
    return this.points[pointIndex];
  }

  get pointCount() {
    return this.points.length;
  }

  bake() {
    this.bakedPoints = new THREE.BufferGeometry().setFromPoints(this.points);
    this.bakedPoints.computeBoundingBox();

    // update bounding box
    const min = this.points[0].clone();
    const max = this.points[0].clone();
    this.points.forEach((p) => {
      min.min(p);
      max.max(p);
    });

    if (!this.bakedPoints.boundingBox) {
      return;
    }

    this.bakedBoundingBox = new BoundingBox(
      this.bakedPoints.boundingBox.min,
      this.bakedPoints.boundingBox.max,
    );
  }

  getProperties(): PropertyGroup {
    return new PropertyGroup(this.name, []);
  }

  getBoundingBox(): BoundingBox {
    return this.bakedBoundingBox;
  }

  getSceneElement(): JSX.Element {
    const ElementObserver = observer(() => {
      const theme = useTheme();

      return (
        <group>
          <line_
            geometry={this.bakedPoints}
            onUpdate={(line) => line.computeLineDistances()}
          >
            <lineDashedMaterial
              attach="material"
              color={theme.canvas.line.default}
              linewidth={1}
              gapSize={0}
              dashSize={0}
            />
          </line_>
        </group>
      );
    });
    return <ElementObserver />;
  }
}
