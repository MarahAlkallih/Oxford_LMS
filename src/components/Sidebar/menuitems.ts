
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
 MenuBook as MenuBookIcon 
} from "@mui/icons-material"
import CoPresentIcon from "@mui/icons-material/CoPresent";
import FactCheckIcon from '@mui/icons-material/FactCheck'
import QuizIcon from "@mui/icons-material/Quiz";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import DatasetIcon from "@mui/icons-material/Dataset";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
export const menuItems: MenuItem[] = [
  { icon: DashboardIcon, label: "Dashboard", path: "/", adminRoles:["SUPER"] },
   { icon: DatasetIcon, label: "Master Data", path: "/masterData", adminRoles:["SUPER"],

    children:[
      {icon:LanguageIcon,label:"Language",path:"/masterData/languages",  adminRoles: ["SUPER"]},
       {
         icon: PublicIcon,
         label: "Venues",
         path: "/masterData/venues",
           adminRoles: ["SUPER"]
       },
       
       {
         icon: LocationOnIcon,
         label: "Location",
         path: "/masterData/location",
          adminRoles: ["SUPER"]
       },
         {
         icon: CurrencyExchangeIcon,
         label: "Currency",
         path: "/masterData/currency",
          adminRoles: ["SUPER"]
       },
       
       {
         icon: MenuBookIcon,
         label: "Category",
         path: "/masterData/category",
           adminRoles: ["SUPER"]
       },
    ]
    },
   { icon: PeopleIcon, label: "Users", path: "/users",
     
    children:[
       
      {icon:AdminPanelSettingsIcon,label:"Users",path:"/users/display", adminRoles: ["SUPER", "HR"]},
       {icon:CoPresentIcon,label:"Trainer",path:"users/trainer",  adminRoles: ["SUPER"]},
     
      {icon:PeopleIcon,label:"Trainees",path:"users/trainees", adminRoles: ["SUPER"]},
    ],
    adminRoles:["SUPER"]
   },
   {
     icon: SchoolIcon,
     label: "Courses",
     children: [
        {
         icon: SchoolIcon,
         label: "Courses",
         path: "/courses",
       role:"trainer",
  adminRoles: ["SUPER"]
       },
       {
         icon: EventNoteIcon,
         label: "Training Plan",
         path: "/courses/training-plan",
        role:"trainer",
        adminRoles: ["SUPER"]
       },
      
       {
         icon: CircleIcon,
         label: "Add Courses",
         path: "/courses/add-course",
         adminRoles:["SUPER"]
       },
     ],
     path: ""
   },
  
  { icon: AssignmentIcon, label: "Exams", path: "/assignments",
    adminRoles:["SUPER"],

    children:[
      {icon: EventAvailableIcon, label: "Events", path: "/assignments/events", adminRoles:["SUPER"],},
      {icon: AssignmentIcon, label: "Exams", path: "/assignments/exams", adminRoles:["SUPER"],},
      {icon: QuizIcon, label: "Exam Constants", path: "/assignments/types", adminRoles:["SUPER"],},
       {icon: AssignmentIcon, label: "Forms", path: "/assignments/forms", adminRoles:["SUPER"],},
        
       {icon: FactCheckIcon, label: "Instances", path: "/assignments/instances", adminRoles:["SUPER"],}
    ]
   },
 
  { icon: SettingsIcon, label: "Settings", path: "/settings",role:"trainer" },
]