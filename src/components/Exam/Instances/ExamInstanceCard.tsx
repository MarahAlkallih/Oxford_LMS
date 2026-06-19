import React from "react";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EditIcon from "@mui/icons-material/Edit";
import { Delete } from "@mui/icons-material";

export interface ExamInstanceData {
  id: number;
  name: string;
  description: string;
  startFormId: number;
  endFormId: number;
  createdAt: string;
  updatedAt: string;
}

interface ExamInstanceCardProps {
  data: ExamInstanceData;
  onEdit?: (id: number) => void;
  onDelete?:(id: number) => void;
}


const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const ExamInstanceCard = ({ data, onEdit, onDelete }: ExamInstanceCardProps) => {
  return (
    <div className="group relative flex w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="h-2 w-full bg-(--main-color)"></div>
      <div className="flex items-start justify-between p-5 pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-(--main-color)">
            <FactCheckIcon />
          </div>
          <div>
            <h3 className="line-clamp-1 text-lg font-bold text-gray-900">
              {data.name}
            </h3>
            <span className="text-xs font-semibold text-gray-500">
              ID: #{data.id}
            </span>
          </div>
        </div>
      </div>

      {/* 2. قسم الوصف (Description) */}
      <div className="flex flex-grow flex-col px-5 py-3">
        <p className="line-clamp-2 min-h-[2.5rem] text-sm text-gray-600">
          {data.description || <span className="italic text-gray-400">No description provided.</span>}
        </p>


        <div className="mt-4 flex flex-wrap gap-2">
      
          <div className="flex items-center gap-1.5 rounded-lg border border-green-100 bg-green-50 px-3 py-1.5 text-xs font-semibold text-(--color-watermelon)">
            <PlayCircleFilledIcon sx={{ fontSize: 16 }} />
            Start Form: #{data.startFormId}
          </div>
          
   
          <div className="flex items-center gap-1.5 rounded-lg border border-purple-100 bg-purple-50 px-3 py-1.5 text-xs font-semibold text-(--color-watermelon-dark)">
            <CheckCircleIcon sx={{ fontSize: 16 }} />
            End Form: #{data.endFormId}
          </div>
        </div>
      </div>

      {/* 4. الفوتر (التاريخ وأزرار الإجراءات) */}
      <div className="mt-auto flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-5 py-3">
        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
          <CalendarTodayIcon sx={{ fontSize: 14 }} className="text-gray-400" />
          {formatDate(data.createdAt)}
        </div>

        {onEdit && (
          <button
            onClick={() => onEdit(data.id)}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-bold text-gray-500 transition-colors hover:bg-blue-50 hover:text-grey-600"
          >
            <EditIcon sx={{ fontSize: 16 }} />
            Edit
          </button>
        )}
            {onDelete && (
          <button
            onClick={() => onDelete(data.id)}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-bold text-red-500 transition-colors hover:bg-blue-50 hover:text-red-800"
          >
            <Delete sx={{ fontSize: 16 }} />
            Delete
          </button>
        )}
      </div>
    </div>
  );
};