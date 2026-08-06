import React from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Delete } from "@mui/icons-material";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
interface IconProps {
  size?: number; 
  color?: string; 
  className?: string; 
}


export const EditIcon: React.FC<IconProps> = ({ size = 18, color, className }) => (
  <EditOutlinedIcon className={className} sx={{ fontSize: size, color }} />
);


export const DeleteIcon: React.FC<IconProps> = ({ size = 18, color, className }) => (
  <Delete className={className} sx={{ fontSize: size, color:"red" }} />
);
export const VisibilityIcon: React.FC<IconProps> = ({ size = 18, color, className }) => (
  <VisibilityOutlinedIcon className={className} sx={{ fontSize: size, color:"#4B5945" }} />
);
export const ToggleOn: React.FC<IconProps> = ({ size = 18, color, className }) => (
  <ToggleOnIcon className={className} sx={{ fontSize: size, color:"green" }} />
);

export const ToggleOff: React.FC<IconProps> = ({ size = 18, color, className }) => (
  <ToggleOffIcon className={className} sx={{ fontSize: size, color:"gray" }} />
);

