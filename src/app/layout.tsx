import Sidebar from "@/components/Sidebar";
import { Box } from "@mui/material";
import { ReactNode } from "react";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <html>
      <body>
        <Box sx={{ display: "grid", gridTemplateColumns: "min-content 1fr" }}>
          <Sidebar />
          {children}
        </Box>
      </body>
    </html>
  );
}
