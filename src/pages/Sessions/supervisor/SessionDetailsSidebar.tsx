import React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import SchoolIcon from "@mui/icons-material/School";

export interface SessionInfoProps {
  sessionData?: {
    sessionTitle?: string;
    courseTitle?: string;
    courseCode?: string;
    status?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
    joinUrl?: string;
  };
}

export const SessionDetailsSidebar: React.FC<SessionInfoProps> = ({ sessionData }) => {
  if (!sessionData) {
    return (
      <div className="bg-white border border-gray-150 rounded-3xl p-5 shadow-xs text-center text-xs text-gray-400 font-medium">
        No session details available.
      </div>
    );
  }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeStr?: string) => {
    if (!timeStr) return "";
    return new Date(timeStr).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="bg-white border border-gray-150 rounded-3xl p-5 shadow-xs space-y-5">
      <h2 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
        Session Details
      </h2>

      {/* Code & Status Badges */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
          <SchoolIcon sx={{ fontSize: 14 }} />
          {sessionData.courseCode || "Code"}
        </span>

        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          {sessionData.status || "SCHEDULED"}
        </span>
      </div>

      {/* Titles */}
      <div>
        <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
          {sessionData.courseTitle}
        </span>
        <h3 className="text-base font-bold text-gray-900 mt-0.5">
          {sessionData.sessionTitle}
        </h3>
      </div>

      {/* Time & Date Container */}
      <div className="bg-gray-50/80 rounded-2xl p-3.5 border border-gray-100 space-y-2.5 text-xs text-gray-600">
        <div className="flex items-center gap-2.5">
          <CalendarTodayIcon sx={{ fontSize: 15 }} className="text-(--main-color)" />
          <span className="font-semibold">{formatDate(sessionData.date)}</span>
        </div>

        <div className="flex items-center gap-2.5">
          <AccessTimeIcon sx={{ fontSize: 15 }} className="text-(--main-color)" />
          <span className="font-semibold">
            {formatTime(sessionData.startTime)} - {formatTime(sessionData.endTime)}
          </span>
        </div>
      </div>

      {/* Join Meeting Action Button */}
      {sessionData.joinUrl && (
        <a
          href={sessionData.joinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-2xl transition-all shadow-2xs"
        >
          <VideoCallIcon sx={{ fontSize: 20 }} />
          <span>Join Meeting</span>
        </a>
      )}
    </div>
  );
};