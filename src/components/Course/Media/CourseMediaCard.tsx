import React, { useState } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import MovieIcon from "@mui/icons-material/Movie";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {DeleteIcon} from "../../Icons/index"
import {DeleteCourseFileModal} from "./DeleteFile"
export interface CourseFile {
  id: number;
  courseId: number;
  fileType: "IMAGE" | "PDF" | "VIDEO" | string;
  url: string;
  createdAt: string;
}

interface CourseMediaCardProps {
  file: CourseFile;
}

export const CourseMediaCard: React.FC<CourseMediaCardProps> = ({ file }) => {
  const [isOpenDelete,setIsOpenDelete]=useState(false)
  const [selectedId,setSelectedId]=useState(0)
  const rawFileName = file.url.split("/").pop() || "File";
  const fileName = decodeURIComponent(rawFileName);

  // Format Date
  const formattedDate = new Date(file.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Type Details (Colors & Icons)
  const getFileTypeDetails = () => {
    switch (file.fileType?.toUpperCase()) {
      case "IMAGE":
        return {
          label: "Image",
          bgColor: "bg-(--main-color) text-(--main-color) border-(--main-color)",
          icon: <ImageIcon className="text-(--main-color)" sx={{ fontSize: 16 }} />,
        };
      case "PDF":
        return {
          label: "PDF",
          bgColor: "bg-red-50 text-red-600 border-red-200",
          icon: <PictureAsPdfIcon className="text-red-500" sx={{ fontSize: 16 }} />,
        };
      case "VIDEO":
        return {
          label: "Video",
          bgColor: "bg-(--orange-color) text-(--orange-color) border-(--orange-color)",
          icon: <MovieIcon className="text-(--orange-color)" sx={{ fontSize: 16 }} />,
        };
      default:
        return {
          label: file.fileType || "File",
          bgColor: "bg-gray-50 text-gray-600 border-gray-200",
          icon: <InsertDriveFileIcon className="text-gray-500" sx={{ fontSize: 16 }} />,
        };
    }
  };
  const typeDetails = getFileTypeDetails();

  return (
    <div className="group flex flex-col justify-between bg-white rounded-2xl 
    border border-gray-400 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Header Preview Zone */}
      <div className="relative w-full h-40 bg-gray-50 border-b border-gray-100 
      flex items-center justify-center overflow-hidden">
        {file.fileType?.toUpperCase() === "IMAGE" ? (
          <img
            src={file.url}
            alt={fileName}
            className="w-full h-full object-cover group-hover:scale-105 
            transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="p-4 bg-white rounded-2xl shadow-xs border border-gray-100 flex items-center justify-center">
            {React.cloneElement(typeDetails.icon, { sx: { fontSize: 44 } })}
          </div>
        )}

        {/* Type Badge */}
    
<span
  className={`absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold rounded-full border shadow-2xs backdrop-blur-md bg-white/90 flex items-center gap-1.5 ${typeDetails.bgColor}`}
>
  {typeDetails.icon}
  <span>{typeDetails.label}</span>
</span>
      </div>

      {/* Card Details Body */}
      <div className="p-4 flex flex-col justify-between flex-1 gap-3">
        <div>
          <h3
            className="text-xs font-bold text-gray-800 line-clamp-1 group-hover:text-(--main-color) transition-colors"
            title={fileName}
          >
            {fileName}
          </h3>
          <p className="text-[11px] text-gray-400 mt-1">Uploaded {formattedDate}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 
            text-xs font-semibold text-gray-200 bg-(--main-color)  rounded-xl transition-colors border border-gray-200"
          >
            <OpenInNewIcon sx={{ fontSize: 15 }} />
            <span>View</span>
          </a>
          <button onClick={()=>{setIsOpenDelete(true),setSelectedId(file.id)}} >
             <DeleteIcon  className="cursor-pointer"/>
          </button>
         
        </div>
      </div>
      <DeleteCourseFileModal
      open={isOpenDelete}
      onClose={()=>setIsOpenDelete(false)}
       fileId={selectedId}
      />
    </div>
  );
};