import NumberInput from "@/components/properties/number_input";
import {
  Vector2Property,
  Vector3Property,
  VectorProperty,
} from "@/lib/property/types";
import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react";
import React from "react";

export default function VectorElement({
  property,
}: {
  property: VectorProperty;
}) {
  if (property instanceof Vector2Property) {
    return <Vector2Element property={property} />;
  } else if (property instanceof Vector3Property) {
    return <Vector3Element property={property} />;
  }
  return <span>Unknown vector type</span>;
}

function parseFloat(number: string): number {
  const parsedNumber = Number.parseFloat(number);
  return Number.isNaN(parsedNumber) ? 0 : parsedNumber;
}

export const Vector3Element = observer(
  ({ property }: { property: Vector3Property }) => {
    function onXChanged(e: React.ChangeEvent<HTMLInputElement>) {
      property.set(property.value().clone().setX(parseFloat(e.target.value)));
    }

    function onYChanged(e: React.ChangeEvent<HTMLInputElement>) {
      property.set(property.value().clone().setY(parseFloat(e.target.value)));
    }

    function onZChanged(e: React.ChangeEvent<HTMLInputElement>) {
      property.set(property.value().clone().setZ(parseFloat(e.target.value)));
    }

    return (
      <>
        <Typography>{property.getName()}</Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "min-content 1fr",
            gap: "4px 20px",
          }}
        >
          <Typography>X</Typography>
          <NumberInput
            onChange={onXChanged}
            value={property.value().x.toFixed(2)}
            disabled={property.readonly}
          />
          <Typography>Y</Typography>
          <NumberInput
            onChange={onYChanged}
            value={property.value().y.toFixed(2)}
            disabled={property.readonly}
          />
          <Typography>Z</Typography>
          <NumberInput
            onChange={onZChanged}
            value={property.value().z.toFixed(2)}
            disabled={property.readonly}
          />
        </Box>
      </>
    );
  },
);

export const Vector2Element = observer(
  ({ property }: { property: Vector2Property }) => {
    function onXChanged(e: React.ChangeEvent<HTMLInputElement>) {
      property.set(property.value().setX(parseFloat(e.target.value)));
    }

    function onYChanged(e: React.ChangeEvent<HTMLInputElement>) {
      property.set(property.value().setY(parseFloat(e.target.value)));
    }

    return (
      <>
        <Typography>{property.getName()}</Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "min-content 1fr",
            gap: "4px 20px",
          }}
        >
          <Typography>X</Typography>
          <NumberInput
            onChange={onXChanged}
            value={property.value().x.toFixed(2)}
            disabled={property.readonly}
          />
          <Typography>Y</Typography>
          <NumberInput
            onChange={onYChanged}
            value={property.value().y.toFixed(2)}
            disabled={property.readonly}
          />
        </Box>
      </>
    );
  },
);
