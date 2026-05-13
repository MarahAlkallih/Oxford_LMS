import { useState } from "react";
import { Box } from "@mui/material";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#eef1f4", position: "relative" }}>
      <Box sx={{ display: { xs: "none", lg: "block" }, flexShrink: 0, position: "relative", zIndex: 0 }}>
        <Sidebar open={true} onClose={() => setSidebarOpen(false)} />
      </Box>
      <Box sx={{ display: { xs: "block", lg: "none" } }}>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minWidth: 0,
          width: { xs: "100%", lg: "auto" },
          background: "#ffffff",
          borderTopLeftRadius: { lg: "24px" },
          borderBottomLeftRadius: { lg: "24px" },
          boxShadow: { lg: "0 12px 32px rgba(15, 23, 42, 0.14)" },
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
          ml: { lg: "-18px" },
        }}
      >
      
        <Header onMenuToggle={() => setSidebarOpen(true)} />
        <Box
          component="main"
          sx={{
            flex: 1,
            p: { xs: 2, md: 4 },
            overflow: "auto",
            background: "#ffffff",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
