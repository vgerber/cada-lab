import Sidebar from "@/components/Sidebar";
import { Box, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import theme from "./components/theme";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <html style={{ width: "100%", height: "100%" }}>
      <body
        style={{
          width: "100%",
          height: "100%",
          margin: 0,
          background: "#262b30",
        }}
      >
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "min-content 1fr",
              height: "100%",
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            <Sidebar />
            <Box sx={{ minHeight: 0, overflow: "hidden" }}>{children}</Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
