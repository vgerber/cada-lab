import NumberInput from "@/components/properties/number_input";
import { NumberProperty } from "@/lib/property/types";
import { Box, Typography, useTheme } from "@mui/material";
import { observer } from "mobx-react";

export const NumberPropertyElement = observer(
  ({
    property,
    onPropertyChanged,
  }: {
    property: NumberProperty;
    onPropertyChanged: (arg0: NumberProperty) => void;
  }) => {
    const theme = useTheme();
    function onValueChanged(e: React.ChangeEvent<HTMLInputElement>) {
      let enteredNumber = Number.parseFloat(e.target.value);
      console.log(enteredNumber);
      enteredNumber = Number.isNaN(enteredNumber) ? 0 : enteredNumber;
      property.set(enteredNumber);
      onPropertyChanged(property);
    }

    return (
      <>
        <Typography>{property.getName()}</Typography>
        <Box
          sx={{
            justifySelf: "end",
          }}
        >
          <NumberInput
            type="text"
            defaultValue={property.value().toFixed(2)}
            disabled={property.readonly}
            onChange={onValueChanged}
          />
        </Box>
      </>
    );
  },
);
