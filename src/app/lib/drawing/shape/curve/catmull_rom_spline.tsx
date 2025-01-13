import { useTheme } from "@mui/material";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
import * as THREE from "three";
import { PropertyGroup } from "../../../property/types";
import { BoundingBox, Shape } from "../shape";

export class CatmullRomSpline implements Shape {
  name: string;
  private points: THREE.Vector3[] = [];
  alpha: number = 0.5;
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

  clone(): CatmullRomSpline {
    const spline = new CatmullRomSpline(
      this.name,
      this.points.map((p) => p.clone()),
    );
    spline.alpha = this.alpha;
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
    this.bakedPoints = new THREE.BufferGeometry().setFromPoints(
      generateCurve(this.points, this.alpha),
    );
    this.bakedPoints.computeBoundingBox();

    // update bounding box
    const min = this.points[0].clone();
    const max = this.points[0].clone();
    this.points.forEach((p) => {
      min.min(p);
      max.max(p);
    });

    this.bakedBoundingBox = new BoundingBox(min, max);
  }

  getProperties(): PropertyGroup {
    return new PropertyGroup(this.name, []);
  }

  getBoundingBox(): BoundingBox {
    const min = this.points[0].clone();
    const max = this.points[0].clone();
    this.points.forEach((p) => {
      min.min(p);
      max.max(p);
    });
    return new BoundingBox(min, max);
  }

  getCurvePoints(): THREE.Vector3[] {
    return generateCurve(this.points, this.alpha);
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

function generateCurve(
  points: THREE.Vector3[],
  alpha: number,
  sectionPoints = 10,
) {
  const distancesT: number[] = [];
  points.forEach((point, pointIndex) => {
    if (pointIndex === 0) {
      distancesT.push(0);
    } else {
      distancesT.push(
        Math.pow(point.distanceTo(points[pointIndex - 1]), alpha) +
          distancesT[pointIndex - 1],
      );
    }
  });

  const curvePoints: THREE.Vector3[] = [];

  if (points.length > 3) {
    points.forEach((point, pointIndex) => {
      // first / last point are only support points and are not considered
      //  t0    t1   t-> t2    t3
      //     P0 --- P1 ---- P2 --- P3
      if (pointIndex > 1 && pointIndex < points.length - 1) {
        const distanceT0 = distancesT[pointIndex - 2];
        const distanceT1 = distancesT[pointIndex - 1];
        const distanceT2 = distancesT[pointIndex];
        const distanceT3 = distancesT[pointIndex + 1];
        const p0 = points[pointIndex - 2];
        const p1 = points[pointIndex - 1];
        const p2 = points[pointIndex];
        const p3 = points[pointIndex + 1];

        const tSteps = (distanceT2 - distanceT1) / (sectionPoints - 1);
        let distanceT = distanceT1;
        for (let cIndex = 0; cIndex < sectionPoints; cIndex++) {
          const a1 = p0
            .clone()
            .multiplyScalar(
              (distanceT1 - distanceT) / (distanceT1 - distanceT0),
            );
          a1.add(
            p1
              .clone()
              .multiplyScalar(
                (distanceT - distanceT0) / (distanceT1 - distanceT0),
              ),
          );
          const a2 = p1
            .clone()
            .multiplyScalar(
              (distanceT2 - distanceT) / (distanceT2 - distanceT1),
            );
          a2.add(
            p2
              .clone()
              .multiplyScalar(
                (distanceT - distanceT1) / (distanceT2 - distanceT1),
              ),
          );
          const a3 = p2
            .clone()
            .multiplyScalar(
              (distanceT3 - distanceT) / (distanceT3 - distanceT2),
            );
          a3.add(
            p3
              .clone()
              .multiplyScalar(
                (distanceT - distanceT2) / (distanceT3 - distanceT2),
              ),
          );

          const b1 = a1
            .clone()
            .multiplyScalar(
              (distanceT2 - distanceT) / (distanceT2 - distanceT0),
            );
          b1.add(
            a2
              .clone()
              .multiplyScalar(
                (distanceT - distanceT0) / (distanceT2 - distanceT0),
              ),
          );
          const b2 = a2
            .clone()
            .multiplyScalar(
              (distanceT3 - distanceT) / (distanceT3 - distanceT1),
            );
          b2.add(
            a3
              .clone()
              .multiplyScalar(
                (distanceT - distanceT1) / (distanceT3 - distanceT1),
              ),
          );

          const c = b1
            .clone()
            .multiplyScalar(
              (distanceT2 - distanceT) / (distanceT2 - distanceT1),
            );
          c.add(
            b2
              .clone()
              .multiplyScalar(
                (distanceT - distanceT1) / (distanceT2 - distanceT1),
              ),
          );

          curvePoints.push(c);
          distanceT += tSteps;
        }
      }
    });
  }

  return curvePoints;
}
