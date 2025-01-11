"use client";
import { Stack, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { registeredSketches } from "./sketches/registered_sketches";

export default function Sidebar() {
  const theme = useTheme();
  const [activeHref, setActiveHref] = useState("");

  useEffect(() => setActiveHref(window.location.pathname), []);

  return (
    <Stack
      sx={{
        background: theme.paletteExt.backgroundElevation[0],
        minWidth: "230px",
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
        cada Lab
      </Typography>
      <Stack m={2} ml={4}>
        {Object.keys(registeredSketches).map((groupPath) => {
          const group = registeredSketches[groupPath];
          return (
            <>
              <Typography
                key={groupPath}
                variant="body1"
                sx={{ marginTop: "0.4rem" }}
              >
                {group.name}
              </Typography>
              {Object.keys(group.registrations).map((sketchPath) => {
                const sketch = group.registrations[sketchPath];
                const href = `/explorer/${groupPath}/${sketchPath}`;
                return (
                  <Link
                    key={href}
                    href={href}
                    style={{ textDecoration: "none", marginTop: "0.4rem" }}
                    onClick={() => setActiveHref(href)}
                  >
                    <Typography
                      sx={{
                        color:
                          href === activeHref
                            ? theme.palette.primary.main
                            : theme.palette.text.secondary,
                        paddingLeft: "0.4rem",
                        ":hover": {
                          paddingLeft: "0.5rem",
                        },
                        whiteSpace: "nowrap",
                      }}
                    >
                      {sketch.name}
                    </Typography>
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
