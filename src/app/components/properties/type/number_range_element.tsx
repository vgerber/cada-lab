import { NumberRangeProperty } from "@/lib/property/types";
import { Box, Slider, Typography } from "@mui/material";
import { observer } from "mobx-react";

export const NumberRangePropertyElement = observer(
  ({ property }: { property: NumberRangeProperty }) => {
    const precision = getPrecision();

    function getPrecision(): number {
      const decimal = property.step.toString().split(".")[1];
      if (!decimal) {
        return 0;
      }
      return decimal.length;
    }
    return (
      <>
        <Typography>{property.getName()}</Typography>
        <Box
          sx={{
            justifySelf: "end",
            width: "180px",
            padding: "5px",
          }}
        >
          <Typography textAlign={"center"}>
            {property.value().toFixed(precision)}
          </Typography>
          <Slider
            color="secondary"
            value={property.value()}
            min={property.min}
            max={property.max}
            step={property.step}
            onChange={(e, value) => property.set(value as number)}
          />
        </Box>
      </>
    );
  },
);
