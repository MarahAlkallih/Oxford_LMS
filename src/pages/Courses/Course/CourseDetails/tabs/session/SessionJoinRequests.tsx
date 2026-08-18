import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useGetJoinsQuery, useEditAttendanceMutation } from "../../../../../../services/sessions/attendances/attendance";
import type { Datum } from "../../../../../../types/Sessions/Joins";
import { ErrorHandler } from "../../../../../../utils/ErrorHandler";
import { toast } from "react-toastify";

interface SessionJoinRequestsProps {
  sessionId: number;
}

export const SessionJoinRequests = ({ sessionId }: SessionJoinRequestsProps) => {
  const { data: joinsData, isLoading } = useGetJoinsQuery({ id: sessionId });
  const [editAttendance, { isLoading: isUpdating }] = useEditAttendanceMutation();

  const requests: Datum[] = joinsData?.data || [];
  
  // حساب عدد الطلبات المتبقية المعلقة فقط
  const pendingCount = requests.filter((r) => r.status === "PENDING" || !r.status).length;

  const handleAccept = async (attendanceId: number) => {
    try {
      await editAttendance({ data: { status: "APPROVED" }, id: attendanceId }).unwrap();
      toast.success("Trainee Accepted Successfully");
    } catch (error) {
      ErrorHandler.show(error);
    }
  };

  const handleReject = async (attendanceId: number) => {
    try {
      await editAttendance({ data: { status: "REJECTED" }, id: attendanceId }).unwrap();
      toast.info("Trainee Request Rejected");
    } catch (error) {
      ErrorHandler.show(error);
    }
  };

  const formatTime = (dateString: Date | string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-xs flex items-center justify-center min-h-[160px]">
        <p className="text-xs text-gray-400 font-semibold animate-pulse">
          Loading join requests...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-xs space-y-4">
      {/* Card Header */}
      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <GroupAddIcon className="text-(--main-color)" /> Join Requests
        </h2>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
          {pendingCount} Pending
        </span>
      </div>

      {/* Requests List */}
      {requests.length === 0 ? (
        <div className="p-8 border-2 border-dashed border-gray-200 rounded-2xl text-center bg-gray-50/50">
          <p className="text-xs text-gray-400 font-semibold">
            No join requests for this session.
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {requests.map((req) => {
            const firstName = req.trainee?.account?.firstName || "";
            const lastName = req.trainee?.account?.lastName || "";
            const fullName = `${firstName} ${lastName}`.trim() || "Unknown Trainee";
            const email = req.trainee?.account?.email || "";
            const avatarUrl = req.trainee?.url;

            return (
              <div
                key={req.id}
                className="flex items-center justify-between p-3.5 bg-gray-50/80 hover:bg-white border border-gray-200 rounded-2xl transition-all gap-3"
              >
                {/* User Avatar & Info */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={fullName}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <PersonIcon className="text-gray-400" fontSize="small" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-gray-800 truncate">
                      {fullName}
                    </h4>
                    <p className="text-[11px] text-gray-400 truncate">
                      {email}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
                      <AccessTimeIcon sx={{ fontSize: 12 }} />
                      {formatTime(req.requestedAt)}
                    </span>
                  </div>
                </div>

                {/* Status or Action Buttons */}
                <div className="shrink-0">
                  {req.status === "APPROVED" ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckIcon sx={{ fontSize: 14 }} /> Approved
                    </span>
                  ) : req.status === "REJECTED" ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-xl bg-red-50 text-red-700 border border-red-200">
                      <CloseIcon sx={{ fontSize: 14 }} /> Rejected
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() => handleAccept(req.id)}
                        className="p-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer border border-emerald-200 disabled:opacity-50"
                        title="Accept Request"
                      >
                        <CheckIcon fontSize="small" />
                      </button>

                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() => handleReject(req.id)}
                        className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all cursor-pointer border border-red-200 disabled:opacity-50"
                        title="Reject Request"
                      >
                        <CloseIcon fontSize="small" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};