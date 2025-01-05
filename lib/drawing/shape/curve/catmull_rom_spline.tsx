import * as THREE from "three";
import { PropertyGroup, Vector3Property } from "../../../property/types";
import { BoundingBox, Shape } from "../shape";
import { LineProperties } from "../2d/line";

export class CatmullRomSpline implements Shape {
  name: string;
  points: THREE.Vector3[] = [];
  alpha: number = 0.5;
  properties: LineProperties = new LineProperties();

  constructor(name: string, points: THREE.Vector3[]) {
    this.name = name;
    this.points = points;
  }

  clone(): CatmullRomSpline {
    let spline = new CatmullRomSpline(
      this.name,
      this.points.map((p) => p.clone()),
    );
    spline.alpha = this.alpha;
    return spline;
  }

  getName(): string {
    return this.name;
  }

  length(): number {
    return 0;
  }

  closestPoint(p: THREE.Vector3): THREE.Vector3 {
    return new THREE.Vector3(0, 0, 0);
  }

  getProperties(): PropertyGroup {
    return new PropertyGroup(this.name, []);
  }

  getBoundingBox(): BoundingBox {
    let min = this.points[0].clone();
    let max = this.points[0].clone();
    this.points.forEach((p) => {
      min.min(p);
      max.max(p);
    });
    return new BoundingBox(min, max);
  }

  getCurvePoints(): THREE.Vector3[] {
    return generateCurve(this.points, this.alpha);
  }
}

function generateCurve(
  points: THREE.Vector3[],
  alpha: number,
  sectionPoints = 10,
) {
  let distancesT: number[] = [];
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

  let curvePoints: THREE.Vector3[] = [];

  if (points.length > 3) {
    points.forEach((point, pointIndex) => {
      // first / last point are only support points and are not considered
      //  t0    t1   t-> t2    t3
      //     P0 --- P1 ---- P2 --- P3
      if (pointIndex > 1 && pointIndex < points.length - 1) {
        let distanceT0 = distancesT[pointIndex - 2];
        let distanceT1 = distancesT[pointIndex - 1];
        let distanceT2 = distancesT[pointIndex];
        let distanceT3 = distancesT[pointIndex + 1];
        let p0 = points[pointIndex - 2];
        let p1 = points[pointIndex - 1];
        let p2 = points[pointIndex];
        let p3 = points[pointIndex + 1];

        let tSteps = (distanceT2 - distanceT1) / (sectionPoints - 1);
        let distanceT = distanceT1;
        for (let cIndex = 0; cIndex < sectionPoints; cIndex++) {
          let a1 = p0
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
          let a2 = p1
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
          let a3 = p2
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

          let b1 = a1
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
          let b2 = a2
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

          let c = b1
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
