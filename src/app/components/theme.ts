"use client";
import { createTheme, Theme } from "@mui/material";

function createAppTheme(): Theme {
  return createTheme({
    palette: {
      primary: {
        main: "#219c75",
      },
      secondary: { main: "#fff" },
      text: {
        primary: "#fff",
        secondary: "#adb0b3",
        disabled: "#333",
      },
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            color: "#fff",
          },
        },
      },
    },
  });
}

const theme = createAppTheme();
export default theme;
