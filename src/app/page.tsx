"use client";

import { Button, Typography } from "@mui/material";
import { useState } from "react";

export default function AppPage() {
  const [x, setX] = useState(0);

  return (
    <>
      <Typography>{x}</Typography>
      <Button onClick={() => setX(x + 1)}>Count</Button>
    </>
  );
}
