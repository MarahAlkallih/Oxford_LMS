import React from "react";
import { useNavigate } from "react-router-dom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import InfoIcon from "@mui/icons-material/Info";
import SchoolIcon from "@mui/icons-material/School";

export interface SuperSession {
  assignmentId: number;
  courseCode: string;
  courseId: number;
  courseTitle: string;
  date: string;
  endTime: string;
  joinUrl: string;
  sessionId: number;
  sessionTitle: string;
  startTime: string;
  status: string;
}

interface SuperSessionCardProps {
  session: SuperSession;
}

export const SuperSessionCard: React.FC<SuperSessionCardProps> = ({ session }) => {
  const navigate = useNavigate();

  // تنسيق التاريخ
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // تنسيق الوقت
  const formatTime = (timeStr: string) => {
    if (!timeStr) return "";
    return new Date(timeStr).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // لون شارة الحالة
  const getStatusStyle = (status: string) => {
    switch (status?.toUpperCase()) {
      case "SCHEDULED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "COMPLETED":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "CANCELED":
      case "CANCELLED":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-purple-50 text-purple-700 border-purple-200";
    }
  };

  const handleNavigateToDetails = () => {
    // الانتقال وتمرير courseId مع sessionId
    navigate(`${session.sessionId}/courses/${session.courseId}`);
  };

  return (
    <div className="bg-white border border-gray-150 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-4 group">
      {/* Header: Course Code & Status & Titles */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          {/* Course Code Badge */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200/80">
            <SchoolIcon sx={{ fontSize: 14 }} />
            {session.courseCode}
          </span>

          {/* Status Badge */}
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusStyle(
              session.status
            )}`}
          >
            {session.status}
          </span>
        </div>

        {/* Titles */}
        <div>
          <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
            {session.courseTitle}
          </span>
          <h3
            className="text-base font-bold text-gray-900 group-hover:text-(--main-color) transition-colors truncate"
            title={session.sessionTitle}
          >
            {session.sessionTitle}
          </h3>
        </div>
      </div>

      {/* Time & Date Card */}
      <div className="bg-gray-50/80 rounded-2xl p-3 border border-gray-100 space-y-2 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <CalendarTodayIcon sx={{ fontSize: 15 }} className="text-(--main-color)" />
          <span className="font-semibold">{formatDate(session.date)}</span>
        </div>

        <div className="flex items-center gap-2">
          <AccessTimeIcon sx={{ fontSize: 15 }} className="text-(--main-color)" />
          <span className="font-semibold">
            {formatTime(session.startTime)} - {formatTime(session.endTime)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
        {/* Zoom Link Button */}
        {session.joinUrl && (
          <a
            href={session.joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-all"
            title="Join Zoom Meeting"
          >
            <VideoCallIcon sx={{ fontSize: 18 }} />
            <span>Join</span>
          </a>
        )}

        {/* Details Button */}
        <button
          type="button"
          onClick={handleNavigateToDetails}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-white bg-(--main-color) hover:opacity-90 rounded-xl transition-all shadow-2xs cursor-pointer"
        >
          <InfoIcon sx={{ fontSize: 16 }} />
          <span>Details</span>
        </button>
      </div>
    </div>
  );
};