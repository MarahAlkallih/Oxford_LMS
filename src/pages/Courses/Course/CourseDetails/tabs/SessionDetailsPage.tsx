import { useParams, useNavigate } from "react-router-dom";
import { useGetOneSessionQuery } from "../../../../../services/sessions/admin/sessionsQuery";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import VideocamIcon from "@mui/icons-material/Videocam";
import LaunchIcon from "@mui/icons-material/Launch";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

export const SessionDetailsPage = () => {
  const { sId } = useParams();
  const navigate = useNavigate();
  const id = Number(sId);

  // جلب تفاصيل الجلسة المفردة
  const { data: session, isLoading } = useGetOneSessionQuery(
    { id },
    { skip: !id }
  );

  if (isLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded-xl w-1/3"></div>
        <div className="h-64 bg-gray-100 rounded-3xl"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-6 text-center text-gray-500 font-semibold">
        Session not found.
      </div>
    );
  }

  const formatDate = (dateStr?: Date | string) =>
    dateStr ? new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "--";

  const formatTime = (timeStr?: Date | string) =>
    timeStr ? new Date(timeStr).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : "--";

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-[fadeIn_0.3s_ease-out]">
      {/* Back Button & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-all cursor-pointer shadow-sm"
          title="Go Back"
        >
          <ArrowBackIcon fontSize="small" />
        </button>
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-(--sec-color) mb-1">
            <span className="w-2 h-2 rounded-full bg-(--sec-color) animate-pulse"></span>
            {session.status}
          </span>
          <h1 className="text-2xl font-bold text-gray-800">{session.title}</h1>
        </div>
      </div>

      {/* Main Details Card */}
      <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-sm space-y-6">
        
        {/* Zoom Links */}
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-100 space-y-3">
          <div className="flex items-center gap-2 text-(--sec-color) font-bold text-sm">
            <VideocamIcon className="text-red-600" />
            <span>Zoom Session Access</span>
          </div>
          <div className="flex flex-wrap gap-3 pt-1">
            {session.joinUrl && (
              <a
                href={session.joinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 min-w-40 flex items-center justify-center gap-2 bg-(--main-color) hover:bg-(--main-color) text-white py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <span>Join Meeting</span>
                <LaunchIcon sx={{ fontSize: 14 }} />
              </a>
            )}
            {session.startUrl && (
              <a
                href={session.startUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 min-w-40 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <span>Start Meeting (Host)</span>
                <LaunchIcon sx={{ fontSize: 14 }} />
              </a>
            )}
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
            <p className="text-gray-400 flex items-center gap-1 font-semibold">
              <CalendarTodayIcon sx={{ fontSize: 14 }} /> Scheduled Date
            </p>
            <p className="font-bold text-gray-800 text-base">{formatDate(session.date)}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
            <p className="text-gray-400 flex items-center gap-1 font-semibold">
              <AccessTimeIcon sx={{ fontSize: 14 }} /> Scheduled Time
            </p>
            <p className="font-bold text-gray-800 text-base">
              {formatTime(session.startTime)} - {formatTime(session.endTime)}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1 sm:col-span-2">
            <p className="text-gray-400 flex items-center gap-1 font-semibold">
              <CheckCircleIcon sx={{ fontSize: 14 }} /> Actual Execution Status
            </p>
            <p className="font-semibold text-gray-700 text-sm">
              {session.actualStartTime ? (
                <>Started: <span className="font-bold text-gray-900">{formatTime(session.actualStartTime)}</span> | Ended: <span className="font-bold text-gray-900">{formatTime(session.actualEndTime!)}</span></>
              ) : (
                <span className="text-gray-400 italic">Session has not started yet</span>
              )}
            </p>
          </div>
        </div>

        {/* Trainer Info */}
        <div className="border-t border-gray-100 pt-5">
          <p className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Trainer Information</p>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-(--main-color)/10 text-(--main-color) flex items-center justify-center font-bold">
              <PersonIcon />
            </div>
            <div>
              <h4 className="text-base font-bold text-gray-800">{session.trainerName}</h4>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mt-1">
                <span className="flex items-center gap-1">
                  <EmailIcon sx={{ fontSize: 13 }} /> {session.trainerEmail}
                </span>
                <span className="flex items-center gap-1">
                  <PhoneIcon sx={{ fontSize: 13 }} /> {session.trainerPhone}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};