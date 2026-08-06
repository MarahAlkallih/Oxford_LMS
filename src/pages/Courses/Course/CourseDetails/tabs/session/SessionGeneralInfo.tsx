import VideocamIcon from "@mui/icons-material/Videocam";
import LaunchIcon from "@mui/icons-material/Launch";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useStartSessionPrioMutation,useEndSessionPrioMutation } from "../../../../../../services/sessions/trainer/trainerSessionMutation";
import { toast } from "react-toastify";
import { ErrorHandler } from "../../../../../../utils/ErrorHandler";
import StopIcon from "@mui/icons-material/Stop";
interface SessionGeneralInfoProps {
  session: any;
  onStartOnsite?: () => void;
  onStartOnline?: () => void;
}


export const SessionGeneralInfo = ({
  session,
  onStartOnsite,
  onStartOnline,
}: SessionGeneralInfoProps) => {
    const [startSession,{isLoading:isStarting}]=useStartSessionPrioMutation()
    const [endSession,{isLoading:isEnding}]=useEndSessionPrioMutation()
    const handelStart=async()=>{
    try{
      await startSession({id:session.id}).unwrap()
     
    }catch(err){
     ErrorHandler.show(err)
    }
}
  const handelEnd=async()=>{
    try{
      await endSession({id:session.id}).unwrap()
    
    }catch(err){
     ErrorHandler.show(err)
    }
}
  const formatDate = (dateStr?: Date | string) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "--";

  const formatTime = (timeStr?: Date | string) =>
    timeStr
      ? new Date(timeStr).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "--";

  const hasZoomLinks = Boolean(session.joinUrl || session.startUrl);
  const role=localStorage.getItem("role")
  return (
    <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-sm space-y-6">
      {/* Session Actions Header (Zoom Links OR Start Buttons) */}
      {hasZoomLinks ? (
        /* If Zoom Links Exist */
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
                className="flex-1 min-w-40 flex items-center justify-center gap-2 bg-(--main-color) hover:opacity-90 text-white py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-sm"
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
      ) : (
        /* If No Zoom Links Exist: Show Start Options */
      <div className="bg-linear-to-r from-slate-50 to-gray-50 p-5 rounded-2xl border border-gray-200 space-y-3">
  <div className="flex items-center gap-2 text-gray-700 font-bold text-sm">
    <PlayArrowIcon className="text-(--main-color)" />
    <span>Session Actions</span>
  </div>
 { role === "trainer" ? <div className="flex flex-wrap gap-3 pt-1">
  
    <button
      type="button"
      onClick={handelStart}
      disabled={Boolean(session?.actualStartTime)}
      className="flex-1 min-w-40 flex items-center justify-center gap-2 bg-(--main-color) hover:bg-emerald-700 text-white py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <PlayArrowIcon sx={{ fontSize: 16 }} />
      <span>{isStarting ? "Starting..." : "Start Session"}</span>
    </button>

  
    <button
      type="button"
      onClick={handelEnd}
      disabled={!session?.actualStartTime || Boolean(session?.actualEndTime)}
      className="flex-1 min-w-40 flex items-center justify-center gap-2 bg-(--color-watermelon)
       hover:bg-(--color-watermelon) text-grey-400 py-3 px-4 rounded-xl text-xs font-bold 
       transition-all shadow-sm cursor-pointer disabled:opacity-50 "
    >
      <StopIcon sx={{ fontSize: 16 }} />
      <span>End Session</span>
    </button>
  </div> : null}
</div>
      )}

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
              <>
                Started: <span className="font-bold text-gray-900">{formatTime(session.actualStartTime)}</span> | Ended:{" "}
                <span className="font-bold text-gray-900">{formatTime(session.actualEndTime!)}</span>
              </>
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
              {session.trainerEmail && (
                <span className="flex items-center gap-1">
                  <EmailIcon sx={{ fontSize: 13 }} /> {session.trainerEmail}
                </span>
              )}
              {session.trainerPhone && (
                <span className="flex items-center gap-1">
                  <PhoneIcon sx={{ fontSize: 13 }} /> {session.trainerPhone}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};