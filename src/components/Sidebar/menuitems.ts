
import type { MenuItem } from "../../types/MenuItem"
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Circle as CircleIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  Language as LanguageIcon,
  EventNote as EventNoteIcon
} from "@mui/icons-material"

export const menuItems: MenuItem[] = [
  { icon: DashboardIcon, label: "Dashboard", path: "/" },
   { icon: PeopleIcon, label: "Users", path: "/users",
    children:[
       {icon:PeopleIcon,label:"Trainer",path:"/users/trainer"},
      {icon:LanguageIcon,label:"Language",path:"/users/languages"},
      {icon:AdminPanelSettingsIcon,label:"Users",path:"/users/display"},
    ]
   },
   {
     icon: SchoolIcon,
     label: "Courses",
     children: [
       {
         icon: EventNoteIcon,
         label: "Training Plan",
         path: "/courses/training-plan",
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