import { BooleanProperty } from "@/lib/property/types";
import { Box, Checkbox, Typography } from "@mui/material";
import { observer } from "mobx-react";

export const BooleanPropertyElement = observer(
  ({ property }: { property: BooleanProperty }) => {
    function onCheckboxChanged(e: React.ChangeEvent<HTMLInputElement>) {
      property.set(e.target.checked);
    }

    return (
      <>
        <Typography alignContent={"center"}>{property.getName()}</Typography>
        <Box
          sx={{
            width: "180px",
            justifySelf: "end",
            display: "flex",
            justifyContent: "center",
            padding: "5px",
          }}
        >
          <Checkbox onChange={onCheckboxChanged} checked={property.value()} />
        </Box>
      </>
    );
  },
);
