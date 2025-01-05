import { useState } from "react";
import {
  BooleanProperty,
  NumberProperty,
  Property,
  PropertyGroup,
  Vector2Property,
  Vector3Property,
  VectorProperty,
} from "../../lib/property/types";
import BooleanPropertyElement from "./type/boolean_element";
import NumberPropertyElement from "./type/number_element";
import VectorElement from "./type/vector_element";
import styles from "./editor.module.scss";

function PropertyElement({
  property,
  onPropertyChanged,
}: {
  property: Property;
  onPropertyChanged: (arg0: Property) => void;
}) {
  if (property instanceof PropertyGroup) {
    return (
      <PropertyGroupElement
        property={property}
        onPropertyChanged={onPropertyChanged}
      />
    );
  } else if (property instanceof BooleanProperty) {
    return (
      <BooleanPropertyElement
        property={property}
        onPropertyChanged={onPropertyChanged}
      />
    );
  } else if (property instanceof NumberProperty) {
    return (
      <NumberPropertyElement
        property={property}
        onPropertyChanged={onPropertyChanged}
      />
    );
  } else if (
    property instanceof Vector2Property ||
    property instanceof Vector3Property
  ) {
    return (
      <VectorElement
        property={property}
        onPropertyChanged={onPropertyChanged}
      />
    );
  }

  // default
  return <span>Unknonw property</span>;
}

function PropertyGroupElement({
  property,
  onPropertyChanged,
}: {
  property: PropertyGroup;
  onPropertyChanged: (arg0: Property) => void;
}) {
  return (
    <>
      <span className={styles.title}>{property.getName()}</span>
      {property.properties.map((prop, propIndex) => (
        <PropertyElement
          key={propIndex}
          property={prop}
          onPropertyChanged={onPropertyChanged}
        />
      ))}
    </>
  );
}

export default function PropertiesEditor({
  property,
  onPropertyChanged,
}: {
  property: Property;
  onPropertyChanged: (arg0: Property) => void;
}) {
  return (
    <div className={styles.editor}>
      <PropertyElement
        property={property}
        onPropertyChanged={onPropertyChanged}
      />
    </div>
  );
}
