import { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { Edit } from "@mui/icons-material";
import { useGetSupervisorsForSessionQuery } from "../../../../../../services/sessions/supervisor/admin/supervisorQuery";
import { EditSupervisors } from "../../../../../../components/Sessions/Supervisors/EditModal";

interface SessionSupervisorsProps {
  sessionId: number;
}

export const SessionSupervisors = ({ sessionId }: SessionSupervisorsProps) => {
  const [selectedSupervisor, setSelectedSupervisor] = useState(0);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const { data: supers, isLoading: isLoadSuper } = useGetSupervisorsForSessionQuery(
    { id: sessionId },
    { skip: !sessionId }
  );

  return (
    <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Supervisors</h2>

      {isLoadSuper ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[1, 2].map((n) => (
            <div key={n} className="p-3 bg-gray-50 rounded-xl border border-gray-100 animate-pulse space-y-2">
              <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded-md w-3/4"></div>
            </div>
          ))}
        </div>
      ) : !supers || supers.length === 0 ? (
        <p className="text-center py-6 text-xs text-gray-400 font-semibold">
          No supervisors assigned yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {supers.map((s: any, index: number) => (
            <div
              key={s.adminId || index}
              className="h-fit p-3.5 bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xs rounded-xl transition-all flex items-start justify-between gap-3 group"
            >
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-full bg-blue-50 text-(--main-color) font-bold text-xs flex items-center justify-center shrink-0 border border-blue-100">
                  {s.firstName?.[0]?.toUpperCase()}
                  {s.lastName?.[0]?.toUpperCase()}
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                  <h4 className="text-xs font-bold text-gray-800 truncate">
                    {s.firstName} {s.lastName}
                  </h4>
                  <div className="text-[11px] text-gray-500 space-y-0.5">
                    <p className="flex items-center gap-1.5 truncate">
                      <EmailIcon sx={{ fontSize: 13 }} className="text-gray-400" />
                      <span className="truncate">{s.email}</span>
                    </p>
                    {s.phoneNumber && (
                      <p className="flex items-center gap-1.5">
                        <PhoneIcon sx={{ fontSize: 13 }} className="text-gray-400" />
                        <span>{s.phoneNumber}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsOpenEdit(true);
                  setSelectedSupervisor(s.assignmentId);
                }}
                className="p-1.5 text-gray-400 hover:text-(--main-color) hover:bg-blue-50 border border-transparent hover:border-blue-100 rounded-lg transition-all cursor-pointer shrink-0"
                title="Edit Supervisor"
              >
                <Edit sx={{ fontSize: 16 }} />
              </button>
            </div>
          ))}
        </div>
      )}

      <EditSupervisors
        open={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        sessionId={sessionId}
        adminId={selectedSupervisor}
      />
    </div>
  );
};