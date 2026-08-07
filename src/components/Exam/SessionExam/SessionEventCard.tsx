import React, { useState } from "react";
import QuizIcon from "@mui/icons-material/Quiz";
import { EditSessionEvent } from "./EditSessionEventModal";
import { useNavigate } from "react-router-dom";
import { EditIcon,DeleteIcon,VisibilityIcon } from "../../Icons";
import {  DeleteSessionEventModal } from "./DeleteSessionExam";
export interface SessionEventItem {
  id: number;
  title?: string;
  name?: string;
  type?: string;
  status?: string;
  date?: string;
  startTime?: string;
  duration?: number | string;
}

interface SessionEventCardProps {
event: SessionEventItem;
sessionId:number,
courseId:number
}

export const SessionEventCard: React.FC<SessionEventCardProps> = ({
  event,
  sessionId,
  courseId
}) => {
  const navigate = useNavigate();

  const eventTitle = event.title || event.name || "Exam / Quiz";
  const eventId = event.id;
   const [isOpenEdit,setIsOpenEdit]=useState(false)
   const [isOpenDelete,setIsOpenDelete]=useState(false)
  // Format Date if present
  const formattedDate = event.date
    ? new Date(event.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div className="group flex items-center justify-between p-3.5 bg-gray-50/80 hover:bg-white border border-gray-200 hover:border-(--main-color)/40 rounded-2xl transition-all duration-200 shadow-2xs hover:shadow-xs gap-3">
      {/* Left Icon & Event Title */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center justify-center shrink-0 shadow-2xs">
          <QuizIcon sx={{ fontSize: 20 }} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 min-w-0">
            <h4
              className="text-xs font-bold text-gray-800 truncate group-hover:text-(--main-color) transition-colors cursor-pointer"
              onClick={() => navigate(`/exams/${eventId}`)}
              title={eventTitle}
            >
              {eventTitle}
            </h4>

            {event.type && (
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-purple-50 text-purple-700 border border-purple-200 shrink-0">
                {event.type}
              </span>
            )}
          </div>

          <p className="text-[11px] text-gray-400 mt-0.5">
            {formattedDate ? `Date: ${formattedDate}` : "Session Exam"}
          </p>
        </div>
      </div>

      {/* Action Buttons: Edit, Delete, View Page */}
      <div className="flex items-center gap-1 shrink-0">
        {/* Edit Button */}
        <button
          type="button"
          onClick={() => setIsOpenEdit(true)}
          className="p-1.5 text-(--main-color)
           hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
          title="Edit Exam"
        >
          <EditIcon  />
        </button>

        {/* Delete Button */}
        <button
          type="button"
          onClick={() =>{setIsOpenDelete(true)}}
          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
          title="Delete Exam"
        >
          <DeleteIcon  />
        </button>

        {/* View Details Page Button */}
        <button
          type="button"
          onClick={() => navigate(`session-exam/${eventId}`)}
          className="p-1.5  rounded-xl transition-all cursor-pointer"
          title="View Exam Page"
        >
          <VisibilityIcon color="#ff4d1c"/>
        </button>
      </div>
      <EditSessionEvent 
              open={isOpenEdit}
              onClose={() => setIsOpenEdit(false)}
              sessionId={sessionId}
              eventId={eventId} courseId={courseId}      />
              <DeleteSessionEventModal open={isOpenDelete} 
              onClose={()=>setIsOpenDelete(false) } 
          id={eventId}              
              />
    </div>
  );
};