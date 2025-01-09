"use client";
import { Stack, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { registeredSketches } from "./sketches/registered_sketches";

export default function Sidebar() {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        background: theme.paletteExt.backgroundElevation[0],
        minWidth: "300px",
        minHeight: 0,
        overflow: "hidden",
      }}
    >
      <Typography
        key={"title"}
        variant="h4"
        color="secondary"
        sx={{ whiteSpace: "nowrap", p: 2 }}
      >
        cadle-lab
      </Typography>
      <Stack m={2}>
        {Object.keys(registeredSketches).map((groupPath) => {
          const group = registeredSketches[groupPath];
          return (
            <>
              <Typography key={groupPath}>{group.name}</Typography>
              {Object.keys(group.registrations).map((sketchPath) => {
                const sketch = group.registrations[sketchPath];
                const href = `/explorer/${groupPath}/${sketchPath}`;
                return (
                  <Link key={href} href={href}>
                    {sketch.name}
                  </Link>
                );
              })}
            </>
          );
        })}
      </Stack>
    </Stack>
  );
}
