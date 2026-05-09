
import type { MenuItem } from "../../types/MenuItem"
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Circle as CircleIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  Language as LanguageIcon
} from "@mui/icons-material"

export const menuItems: MenuItem[] = [
  { icon: DashboardIcon, label: "Dashboard", path: "/" },
   { icon: PeopleIcon, label: "Users", path: "/users",
    children:[
      {icon:LanguageIcon,label:"Language",path:"/users/languages"}
    ]
   },
   {
     icon: SchoolIcon,
     label: "Courses",
     children: [
       {
         icon: CircleIcon,
         label: "Current Courses",
         path: "/courses/current",
       },
       {
         icon: CircleIcon,
         label: "Finished Courses",
         path: "/courses/finished",
       },
     ],
     path: ""
   },
  
  { icon: AssignmentIcon, label: "Assignments", path: "/assignments" },
 
  { icon: SettingsIcon, label: "Settings", path: "/settings" },
]