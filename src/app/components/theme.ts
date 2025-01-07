"use client";
import { createTheme, Theme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    paletteExt: {
      backgroundElevation: {
        0: string;
        1: string;
        2: string;
      };
    };
    canvas: {
      line: {
        default: string;
      };
    };
  }
  // allow configuration using `createTheme()`
  interface ThemeOptions {
    paletteExt: {
      backgroundElevation: {
        0: string;
        1: string;
        2: string;
      };
    };
    canvas: {
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
    paletteExt: {
      backgroundElevation: {
        0: "#121212",
        1: "#161616",
        2: "#1D1D1D",
      },
    },
    canvas: {
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
