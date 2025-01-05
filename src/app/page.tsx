"use client";

import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function AppPage() {
  const [x, setX] = useState(0);

  return (
    <Stack justifyContent="center" alignItems="center" height="100%" gap={3}>
      <Typography>{x}</Typography>
      <Button variant="contained" onClick={() => setX(x + 1)}>
        Count
      </Button>
    </Stack>
  );
}
