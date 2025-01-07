"use client";
import { createTheme, Theme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    canvas: {
      background: string;
      line: {
        default: string;
      };
    };
  }
  // allow configuration using `createTheme()`
  interface ThemeOptions {
    canvas: {
      background: string;
      line: {
        default: string;
      };
    };
  }
}

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
    canvas: {
      background: "#111",
      line: { default: "#eee" },
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
