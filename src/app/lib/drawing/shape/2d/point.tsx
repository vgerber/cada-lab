import { useTheme } from "@mui/material";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
import * as THREE from "three";
import { PropertyGroup, Vector3Property } from "../../../property/types";
import { BoundingBox, Shape } from "../shape";

export class Point implements Shape {
  readonly name: string;
  position: THREE.Vector3;

  constructor(name: string, position: THREE.Vector3) {
    this.name = name;
    this.position = position;
    makeAutoObservable(this);
  }

  clone(): Point {
    return new Point(this.name, this.position.clone());
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
        },
        () => this.position,
      ),
    ]);
  }

  getBoundingBox(): BoundingBox {
    return new BoundingBox(this.position.clone(), this.position.clone());
  }

  getGeometry(): THREE.BufferGeometry {
    return new THREE.BufferGeometry().setFromPoints([this.position]);
  }

  getSceneElement(): JSX.Element {
    const ElementObserver = observer(() => {
      const theme = useTheme();
      return (
        <group>
          <points geometry={this.getGeometry()}>
            <pointsMaterial size={5} color={theme.canvas.line.default} />
          </points>
        </group>
      );
    });
    return <ElementObserver />;
  }
}
