import {
  BooleanProperty,
  NumberProperty,
  Property,
  PropertyGroup,
  Vector2Property,
  Vector3Property,
} from "@/lib/property/types";
import { Box, Typography } from "@mui/material";
import { BooleanPropertyElement } from "./type/boolean_element";
import { NumberPropertyElement } from "./type/number_element";
import VectorElement from "./type/vector_element";

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
  return <Typography color="error">Unknonw property</Typography>;
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
      <Typography sx={{ gridColumn: "span 2" }}>
        {property.getName()}
      </Typography>
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
    <Box
      sx={{
        padding: "16px",
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        display: "grid",
        gridTemplateColumns: "1fr min-content",
        gap: "10px",
      }}
    >
      <PropertyElement
        property={property}
        onPropertyChanged={onPropertyChanged}
      />
    </Box>
  );
}
