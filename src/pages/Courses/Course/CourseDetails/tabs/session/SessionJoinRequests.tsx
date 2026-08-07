import { useState } from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface JoinRequest {
  id: number;
  studentName: string;
  studentEmail: string;
  avatarUrl?: string;
  requestedAt: string;
}

interface SessionJoinRequestsProps {
  sessionId: number;
}

export const SessionJoinRequests = ({ sessionId }: SessionJoinRequestsProps) => {
  // داتا تجريبية - يمكنك استبدالها لاحقاً بـ RTK Query / API
  const [requests, setRequests] = useState<JoinRequest[]>([
    {
      id: 1,
      studentName: "سارة أحمد",
      studentEmail: "sara.ahmed@example.com",
      requestedAt: "10 mins ago",
    },
    {
      id: 2,
      studentName: "محمد علي",
      studentEmail: "m.ali@example.com",
      requestedAt: "25 mins ago",
    },
  ]);

  const handleAccept = (id: number) => {
    // API Call Accept
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  const handleReject = (id: number) => {
    // API Call Reject
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return (
    <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-xs space-y-4">
      {/* Card Header */}
      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <GroupAddIcon className="text-(--main-color)" /> Join Requests
        </h2>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
          {requests.length} Pending
        </span>
      </div>

      {/* Requests List */}
      {requests.length === 0 ? (
        <div className="p-8 border-2 border-dashed border-gray-200 rounded-2xl text-center bg-gray-50/50">
          <p className="text-xs text-gray-400 font-semibold">
            No pending join requests for this session.
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {requests.map((req) => (
            <div
              key={req.id}
              className="flex items-center justify-between p-3.5 bg-gray-50/80 hover:bg-white border border-gray-200 rounded-2xl transition-all gap-3"
            >
              {/* User Avatar & Info */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-2xs">
                  {req.avatarUrl ? (
                    <img
                      src={req.avatarUrl}
                      alt={req.studentName}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <PersonIcon className="text-gray-400" fontSize="small" />
                  )}
                </div>

                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-gray-800 truncate">
                    {req.studentName}
                  </h4>
                  <p className="text-[11px] text-gray-400 truncate">
                    {req.studentEmail}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
                    <AccessTimeIcon sx={{ fontSize: 12 }} />
                    {req.requestedAt}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleAccept(req.id)}
                  className="p-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer border border-emerald-200"
                  title="Accept Request"
                >
                  <CheckIcon fontSize="small" />
                </button>

                <button
                  type="button"
                  onClick={() => handleReject(req.id)}
                  className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all cursor-pointer border border-red-200"
                  title="Reject Request"
                >
                  <CloseIcon fontSize="small" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};