import { Stack, Typography } from "@mui/material";

export default function Sidebar() {
  return (
    <Stack sx={{ background: "#1b2024", minWidth: "300px" }}>
      <Typography
        variant="h4"
        color="secondary"
        sx={{ whiteSpace: "nowrap", p: 2 }}
      >
        cadle-lab
      </Typography>
    </Stack>
  );
}
