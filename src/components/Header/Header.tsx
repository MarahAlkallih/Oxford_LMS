import { useState } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import { clearAuthSession } from "../../features/admin/auth/authStorage";
import { useLogoutUserMutation } from "../../services/auth/authService";
import { toast } from "react-toastify";
import { ErrorHandler } from "../../utils/ErrorHandler";
interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header = ({ onMenuToggle }: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [logoutUser] = useLogoutUserMutation();
  const role=localStorage.getItem("role");
  role?.toUpperCase()
  const navigate=useNavigate();
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
const handleLogout = async () => {
  try {

    await logoutUser(undefined).unwrap();
     toast.success("Logged out successfully")
  } catch (err) {
   ErrorHandler.show(err)
  } finally {
    clearAuthSession();
    navigate("/login", { replace: true });
  }
};
  const handleMenuClose = () => {
    if(role?.toLowerCase()=== "trainer"){
      navigate("/trainer/profile")
    }
   
  };
  
  return (
    <Box
      sx={{
        width: "100%",
        height: "50px",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, md: 4 },
       // borderBottom: "1px solid #e5e7eb",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      
      <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <Box component="h1" sx={{ fontSize: "24px", fontWeight: 500, color: "#646464", m: 0 }}>
          Welcome {role}
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: "#334155" }}
            onClick={onMenuToggle}
            aria-label="open menu"
          >
            <MenuIcon />
          </IconButton>

        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}>
          <Box
            component="button"
            aria-label="notifications"
            sx={{
              border: "none",
              cursor: "pointer",
              height: 30,
              minWidth: 28,
              px: 2,
              borderRadius: "999px",
              background: "linear-gradient(135deg, #b8c7b4 0%, #95a792 100%)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.75,
              boxShadow: "0 10px 24px rgba(15, 23, 42, 0.14)",
            }}
          >
            <NotificationsIcon sx={{ fontSize: 20 }} />
            <Box component="span" sx={{ fontSize: 14, fontWeight: 500, lineHeight: 1 }}>
              15
            </Box>
          </Box>

          <IconButton
            sx={{ color: "#334155" }}
            onClick={handleMenuOpen}
          >
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "#f1f5f9",
                border: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "bold",
                color: "#334155",
              }}
            >
              A
            </Box>
          </IconButton>
        </Box>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} >
          {role?.toLowerCase() !== "admin"?
         <MenuItem onClick={handleMenuClose}>Profile</MenuItem> :
         null}
         <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

