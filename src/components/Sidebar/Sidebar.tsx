import { useState } from "react"
import { useNavigate } from "react-router-dom"
import  {  menuItems} from "./menuitems"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import CloseIcon from "@mui/icons-material/Close"
import logo from "../../assets/logo.png"
import type { SidebarProps } from "../../types/Sidebar"

export const Sidebar = ({ open = true, onClose }: SidebarProps) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const navigate = useNavigate()

  return (
    <>
     
      {open && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={onClose}
        />
      )}
      <div className={`fixed lg:static left-0 
      top-0 h-screen w-64 bg-white text-[#1f2937] p-4 flex flex-col 
      transition-all duration-300 z-50 lg:z-0 border-r border-slate-200 shadow-sm ${
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
    
      <div className="flex justify-between items-center mb-6">
        <div className="flex justify-center flex-1">
          <img 
            src={logo} 
            alt="Logo" 
            className="w-[70%] h-auto transition-transform duration-300 hover:scale-110 hover:-rotate-1" 
          />
        </div>

        <button
          onClick={onClose}
          className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-all"
          aria-label="Close sidebar"
        >
          <CloseIcon className="text-slate-700" />
        </button>
      </div>

      <div className="space-y-3 overflow-y-auto flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isOpen = openMenu === item.label

          return (
            <div key={item.label}>
            <div
  className="flex items-center justify-between cursor-pointer p-3 rounded-lg
             transition-all duration-300
             hover:bg-slate-100 hover:shadow-sm hover:scale-[1.02]
             active:scale-95"
  onClick={() => {
    if (item.children) {
      setOpenMenu(isOpen ? null : item.label)
    } else if (item.path) {
      navigate(item.path)
      onClose()
    }
  }}
>
  {/* left side */}
  <div className="flex items-center gap-3">
    <Icon className="w-5 h-5 text-[#4B5945]" />
    <span className="font-medium">{item.label}</span>
  </div>
  <div className="w-5 flex justify-center">
    {item.children && (
      <ExpandMoreIcon
        className={`transition-all duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    )}
  </div>
</div>
              {item.children && (
                <div
                  className={`ml-4 overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="space-y-1 mt-2">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon

                      return (
                        <div
                          key={child.label}
                          className="flex items-center gap-3 p-2 text-sm rounded-md cursor-pointer
                                     transition-all duration-300
                                     hover:bg-slate-100 hover:translate-x-2 hover:shadow-sm
                                     active:scale-95"
                          onClick={() => {
                            if (child.path) {
                              navigate(child.path)
                              onClose()
                            }
                          }}
                        >
                          <ChildIcon size={16} className="transition-transform duration-300 hover:scale-125 text-[#4B5945]" />
                          <span>{child.label}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

            </div>
          )
        })}
      </div>
    </div>
    </>
    )
}