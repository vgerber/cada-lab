import NumberInput from "@/components/properties/number_input";
import { NumberProperty } from "@/lib/property/types";
import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react";
import { useRef } from "react";

export const NumberPropertyElement = observer(
  ({ property }: { property: NumberProperty }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    function onKeyDown(e: React.KeyboardEvent) {
      if (e.code === "Enter") {
        applyValue();
      }
    }

    function applyValue() {
      if (!inputRef.current) {
        return;
      }
      const enteredNumber = Number.parseFloat(inputRef.current?.value);
      if (Number.isNaN(enteredNumber)) {
        return;
      }
      property.set(enteredNumber);
      inputRef.current.value = property.value().toFixed(2);
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
            ref={inputRef}
            defaultValue={property.value().toFixed(2)}
            disabled={property.readonly}
            onBlur={() => applyValue()}
            onKeyDown={onKeyDown}
          />
        </Box>
      </>
    );
  },
);
