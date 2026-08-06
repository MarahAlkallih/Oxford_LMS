import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import { useNavigate, useParams } from "react-router-dom";

export interface SessionItem {
  id: number;
  title: string;
  status: string;
  startTime: string;
  endTime?: string;
  date?: string;
  trainerName: string;
  trainerEmail: string;
  trainerPhone: string;
}

interface SessionCardProps {
  session: SessionItem;
  onViewDetails: (id: number) => void;
  onAddSupervisor: (id: number) => void;
}

export const SessionCard: React.FC<SessionCardProps> = ({
  session,
  onViewDetails,
  onAddSupervisor,
}) => {
 const navigate=useNavigate()
 const {id}=useParams()
 const courseId=Number(id)
  const formatTimeAndDate = () => {
   
    if (session.date) {
      const formattedDate = new Date(session.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const formattedTime = new Date(session.startTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return { date: formattedDate, time: formattedTime };
    }

    
    const fullDate = new Date(session.startTime);
    return {
      date: fullDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      time: fullDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  };

  const { date, time } = formatTimeAndDate();
 const role=localStorage.getItem("adminRoles")
  const getStatusStyle = (status: string) => {
    switch (status?.toUpperCase()) {
      case "ONGOING":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "CANCELLED":
        return "bg-rose-50 text-rose-600 border-rose-100";
      default:
        return "bg-amber-50 text-amber-600 border-amber-100";
    }
  };

  return (
    <div className="bg-(--light2-color) border border-gray-150 rounded-2xl p-5 hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
  
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusStyle(
              session.status
            )}`}
          >
            {session.status}
          </span>
          <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
            <span className="flex items-center gap-1">
              <CalendarTodayIcon sx={{ fontSize: 13 }} />
              {date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <AccessTimeIcon sx={{ fontSize: 13 }} />
              {time}
            </span>
          </div>
        </div>

        <h3 className="text-base font-bold text-gray-800 group-hover:text-(--main-color) transition-colors mb-4 line-clamp-2">
          {session.title}
        </h3>

     
        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-1.5 mb-4">
          <div className="flex items-center gap-2">
            <PersonIcon className="text-gray-400" sx={{ fontSize: 16 }} />
            <span className="text-xs font-bold text-gray-700">
              {session.trainerName}
            </span>
          </div>
          <div className="text-[11px] text-gray-400 space-y-0.5 pl-6">
            <p className="truncate flex items-center gap-1">
              <EmailIcon sx={{ fontSize: 12 }} /> {session.trainerEmail}
            </p>
            <p className="flex items-center gap-1">
              <PhoneIcon sx={{ fontSize: 12 }} /> {session.trainerPhone}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate(`/courses/${courseId}/sessions/${session.id}`)}
          className="flex-1 border py-2 px-3 bg-gray-50 hover:bg-(--main-color) hover:text-white text-gray-700 border-gray-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>View Details</span>
          <ArrowForwardIcon sx={{ fontSize: 14 }} />
        </button>

    { (role === "SUPER"  )? <button
          onClick={() => onAddSupervisor(session.id)}
          title="Add Supervisors"
          className="border p-2 bg-gray-50 hover:bg-(--main-color) hover:text-white text-gray-700 border-gray-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer shrink-0"
        >
          <SupervisorAccountOutlinedIcon sx={{ fontSize: 18 }} />
        </button> :null   }
      </div>
    </div>
  );
};