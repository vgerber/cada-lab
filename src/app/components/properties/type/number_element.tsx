import NumberInput from "@/components/properties/NumberInput";
import { NumberProperty } from "@/lib/property/types";
import { Box, Typography, useTheme } from "@mui/material";

export default function NumberPropertyElement({
  property,
  onPropertyChanged,
}: {
  property: NumberProperty;
  onPropertyChanged: (arg0: NumberProperty) => void;
}) {
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
        <NumberInput type="text" disabled defaultValue={property.value()} />
      </Box>
    </>
  );
}
