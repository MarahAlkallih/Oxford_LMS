import React, { useState } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import MovieIcon from "@mui/icons-material/Movie";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { DeleteIcon } from "../../../Icons/index";
import { DeleteSessionFileModal } from "./DeleteFile";

export interface CourseFile {
  id: number;
  courseId: number;
  fileType: "IMAGE" | "PDF" | "VIDEO" | string;
  url: string;
  createdAt: string;
}

interface SessionMediaCardProps {
  file: CourseFile;
}

export const SessionMediaCard: React.FC<SessionMediaCardProps> = ({ file }) => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

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
          badgeStyle: "bg-(--main-color) text-white border-(--main-color)",
          icon: <ImageIcon className="text-(--main-color)" sx={{ fontSize: 22 }} />,
        };
      case "PDF":
        return {
          label: "PDF",
          badgeStyle: "bg-red-50 text-red-600 border-red-200",
          icon: <PictureAsPdfIcon className="text-red-500" sx={{ fontSize: 22 }} />,
        };
      case "VIDEO":
        return {
          label: "Video",
          badgeStyle: "bg-(--orange-color) text-(--orange-color) border border-(--orange-color)/30",
          icon: <MovieIcon className="text-(--orange-color)" sx={{ fontSize: 22 }} />,
        };
      default:
        return {
          label: file.fileType || "File",
          badgeStyle: "bg-gray-50 text-gray-600 border-gray-200",
          icon: <InsertDriveFileIcon className="text-gray-500" sx={{ fontSize: 22 }} />,
        };
    }
  };

  const typeDetails = getFileTypeDetails();

  return (
    <>
      <div className="group flex items-center justify-between p-3 bg-gray-50/80 hover:bg-white 
      border border-gray-200 hover:border-(--main-color) rounded-2xl transition-all duration-200 
      shadow-2xs hover:shadow-xs gap-3">
        {/* Left: Thumbnail / File Icon */}
        <div className="w-11 h-11 rounded-xl bg-white border border-gray-150 flex items-center 
        justify-center shrink-0 overflow-hidden shadow-2xs">
          {file.fileType?.toUpperCase() === "IMAGE" ? (
            <img
              src={file.url}
              alt={fileName}
              className="w-full h-full object-cover group-hover:scale-105 
              transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            typeDetails.icon
          )}
        </div>

        {/* Middle: File Info & Type Badge */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="flex items-center gap-2 min-w-0">
            <h3
              className="text-xs font-bold text-gray-00 truncate group-hover:text-(--main-color) transition-colors"
              title={fileName}
            >
              {fileName}
            </h3>

            {/* Type Badge */}
            <span
              className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border shrink-0 ${typeDetails.badgeStyle}`}
            >
              {typeDetails.label}
            </span>
          </div>

          <p className="text-[11px] text-gray-400 mt-0.5">
            Uploaded {formattedDate}
          </p>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 py-1.5 px-3 text-xs font-semibold text-white bg-(--main-color) hover:opacity-90 rounded-xl transition-all shadow-2xs"
            title="View File"
          >
            <OpenInNewIcon sx={{ fontSize: 14 }} />
            <span>View</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setIsOpenDelete(true);
              setSelectedId(file.id);
            }}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
            title="Delete File"
          >
            <DeleteIcon className="cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteSessionFileModal
        open={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        fileId={selectedId}
      />
    </>
  );
};