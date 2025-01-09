import * as THREE from "three";

export interface Property {
  getName(): string;
}

export class PropertyGroup implements Property {
  readonly name: string;
  readonly properties: Property[];

  constructor(name: string, properties: Property[]) {
    this.name = name;
    this.properties = properties;
  }

  getName(): string {
    return this.name;
  }
}

export class BasicTypeProperty<BasicType> implements Property {
  protected name: string;
  protected setter: ((arg0: BasicType) => void) | undefined;
  protected getter: () => BasicType;

  constructor(
    name: string,
    setter: ((arg0: BasicType) => void) | undefined,
    getter: () => BasicType,
  ) {
    this.name = name;
    this.setter = setter;
    this.getter = getter;
  }

  getName(): string {
    return this.name;
  }

  value(): BasicType {
    return this.getter();
  }

  get readonly() {
    return this.setter === undefined;
  }

  set(value: BasicType): void {
    if (!this.setter) {
      console.warn(`${this.name} is readonly`);
      return;
    }
    return this.setter(value);
  }
}

export class BooleanProperty extends BasicTypeProperty<boolean> {}

export class NumberProperty extends BasicTypeProperty<number> {
  min: number;
  max: number;

  constructor(
    name: string,
    setter: ((arg0: number) => void) | undefined,
    getter: () => number,
    min: number,
    max: number,
  ) {
    super(name, setter, getter);
    this.min = min;
    this.max = max;
  }

  set(value: number): void {
    if (!this.setter) {
      console.warn(`${this.name} is readonly`);
      return;
    }

    value = Math.min(this.max, Math.max(this.min, value));
    this.setter(value);
  }
}

export type VectorProperty = Vector2Property | Vector3Property;

export class Vector3Property extends BasicTypeProperty<THREE.Vector3> {}

export class Vector2Property extends BasicTypeProperty<THREE.Vector2> {}
