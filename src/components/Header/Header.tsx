import { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Popover } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import { clearAuthSession } from "../../features/admin/auth/authStorage";
import { useLogoutUserMutation } from "../../services/auth/authService";
import { useGetUnreadCountQuery } from "../../services/notifications/notificationQuery"; // استبدل المسار بحسب مكان الملف لديك
import { NotificationsList } from "../../pages/Notifications/NotificationsList"; // استبدل المسار بحسب مكان الملف لديك
import { toast } from "react-toastify";
import { ErrorHandler } from "../../utils/ErrorHandler";

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header = ({ onMenuToggle }: HeaderProps) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  // فصل الـ State الخاص بقائمة البروفايل عن قائمة الإشعارات
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState<null | HTMLElement>(null);

  const [logoutUser] = useLogoutUserMutation();
  const { data: unreadData } = useGetUnreadCountQuery();

  const unreadCount = unreadData?.unreadCount ?? 0;

  // ------------------ التحكم بقائمة البروفايل ------------------
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleProfileNavigate = () => {
    handleProfileMenuClose();
    if (role?.toLowerCase() === "trainer") {
      navigate("/trainer/profile");
    }
  };

  const handleLogout = async () => {
    handleProfileMenuClose();
    try {
      await logoutUser(undefined).unwrap();
      toast.success("Logged out successfully");
    } catch (err) {
      ErrorHandler.show(err);
    } finally {
      clearAuthSession();
      navigate("/login", { replace: true });
    }
  };

  // ------------------ التحكم بقائمة الإشعارات ------------------
  const handleNotifOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleNotifClose = () => {
    setNotifAnchorEl(null);
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
          {/* زر الإشعارات */}
          <Box
            component="button"
            onClick={handleNotifOpen}
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
              {unreadCount}
            </Box>
          </Box>

          {/* زر الملف الشخصي */}
          <IconButton sx={{ color: "#334155" }} onClick={handleProfileMenuOpen}>
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

        {/* Popover لعرض مكون NotificationsList عند النقر على الأيقونة */}
        <Popover
          open={Boolean(notifAnchorEl)}
          anchorEl={notifAnchorEl}
          onClose={handleNotifClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          slotProps={{
            paper: {
              sx: {
                mt: 1.5,
                width: { xs: "320px", sm: "400px" },
                borderRadius: "24px",
                boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.08)",
                border: "none",
                overflow: "hidden",
              },
            },
          }}
        >
          <NotificationsList />
        </Popover>

        {/* قائمة الملف الشخصي والـ Logout */}
        <Menu
          anchorEl={profileAnchorEl}
          open={Boolean(profileAnchorEl)}
          onClose={handleProfileMenuClose}
        >
          {role?.toLowerCase() !== "admin" && (
            <MenuItem onClick={handleProfileNavigate}>Profile</MenuItem>
          )}
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};