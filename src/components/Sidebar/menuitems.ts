
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
  EventNote as EventNoteIcon,
  Public as PublicIcon,
  LocationOn as  LocationOnIcon ,
 MenuBook as MenuBookIcon,
 Group as GroupIcon
} from "@mui/icons-material"
import CoPresentIcon from "@mui/icons-material/CoPresent";
export const menuItems: MenuItem[] = [
  { icon: DashboardIcon, label: "Dashboard", path: "/", adminRoles:["SUPER"] },
   { icon: PeopleIcon, label: "Users", path: "/users",
    children:[
       {icon:LanguageIcon,label:"Language",path:"/users/languages"},
      {icon:AdminPanelSettingsIcon,label:"Users",path:"/users/display", adminRoles: ["SUPER", "HR"]},
       {icon:CoPresentIcon,label:"Trainer",path:"users/trainer"},
     
      {icon:PeopleIcon,label:"Trainees",path:"users/trainees"},
    ],
    adminRoles:["SUPER"]
   },
   {
     icon: SchoolIcon,
     label: "Courses",
     children: [
       {
         icon: EventNoteIcon,
         label: "Training Plan",
         path: "/courses/training-plan",
        role:"trainer",
  adminRoles: ["SUPER"]
       },
       {
         icon: PublicIcon,
         label: "Venues",
         path: "/courses/venues",
       },
       
       {
         icon: LocationOnIcon,
         label: "Location",
         path: "/courses/location",
       },
       
       {
         icon: MenuBookIcon,
         label: "Category",
         path: "/courses/category",
       },
       {
         icon: CircleIcon,
         label: "Finished Courses",
         path: "/courses/finished",
       },
     ],
     path: ""
   },
  
  { icon: AssignmentIcon, label: "Assignments", path: "/assignments",

    children:[
      {icon: AssignmentIcon, label: "Exam Constants", path: "/assignments/types",}
    ]
   },
 
  { icon: SettingsIcon, label: "Settings", path: "/settings" },
]