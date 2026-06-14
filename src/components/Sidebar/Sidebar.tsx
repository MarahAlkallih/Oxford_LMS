import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { menuItems } from "./menuitems";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../../assets/logo.png";
import type { SidebarProps } from "../../types/Sidebar";
import type { MenuItem } from "../../types/MenuItem";

export const Sidebar = ({ open = true, onClose }: SidebarProps) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navigate = useNavigate();
 const role = localStorage.getItem("role") || "";
const adminRole = localStorage.getItem("adminRoles") || "";

const hasPermission = (item: MenuItem) => {
  if (item.role && item.role === role) {
    return true;
  }

  if (
    item.adminRoles?.length &&
    item.adminRoles.includes(adminRole)
  ) {
    return true;
  }

  if (!item.role && !item.adminRoles?.length) {
    return false;
  }

  return false;
};
const filteredMenu = menuItems
  .map((item) => ({
    ...item,
    children: item.children?.filter(hasPermission),
  }))
  .filter(
    (item) =>
      hasPermission(item) ||
      (item.children && item.children.length > 0)
  );
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static left-0 top-0 h-screen w-64 bg-white text-[#1f2937] 
        flex flex-col border-r border-slate-200 shadow-sm transition-all duration-300 z-50
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-4">
          <div className="flex justify-center flex-1">
            <img
              src={logo}
              alt="Logo"
              className="w-[70%] h-auto transition-transform duration-300 hover:scale-110 hover:-rotate-1"
            />
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"
          >
            <CloseIcon />
          </button>
        </div>

        {/* MENU */}
        <div className="flex-1 overflow-y-auto pr-1 scrollbar-hide space-y-2">
          {filteredMenu.map((item) => {
            const Icon = item.icon;
            const isOpen = openMenu === item.label;

            return (
              <div key={item.label}>
                {/* MAIN ITEM */}
                <div
                  className="flex items-center justify-between cursor-pointer p-3 rounded-lg
                  transition-all duration-200 hover:bg-slate-100 active:scale-95"
                  onClick={() => {
                    if (item.children) {
                      setOpenMenu(isOpen ? null : item.label);
                    } else if (item.path) {
                      navigate(item.path);
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-[#4B5945]" />
                    <span className="font-medium">{item.label}</span>
                  </div>

                  {item.children && (
                    <ExpandMoreIcon
                      className={`transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>

                {/* CHILDREN */}
                {item.children && (
                  <div
                    className={`ml-4 overflow-hidden transition-all duration-300 scrollbar-hide
                    ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <div className="space-y-1 mt-2 max-h-60 overflow-y-auto pr-1 scrollbar-hide">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon;

                        return (
                          <div
                            key={child.label}
                            className="flex items-center gap-3 p-2 text-sm rounded-md cursor-pointer
                            transition-all duration-200 hover:bg-slate-100 hover:translate-x-1"
                            onClick={() => {
                              if (child.path) {
                                navigate(child.path);
                              }
                            }}
                          >
                            <ChildIcon
                              size={16}
                              className="text-[#4B5945]"
                            />
                            <span>{child.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};