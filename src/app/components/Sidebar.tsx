import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import { registeredSketches } from "./sketches/registered_sketches";

export default function Sidebar() {
  console.log(registeredSketches);
  return (
    <Stack sx={{ background: "#1b2024", minWidth: "300px" }}>
      <Typography
        variant="h4"
        color="secondary"
        sx={{ whiteSpace: "nowrap", p: 2 }}
      >
        cadle-lab
      </Typography>
      <Stack>
        {Object.keys(registeredSketches).map((groupPath) => {
          const group = registeredSketches[groupPath];
          return (
            <>
              <Typography>{group.name}</Typography>
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
