import { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { Edit } from "@mui/icons-material";
import { useGetSupervisorsForSessionQuery } from "../../../../../../services/sessions/supervisor/admin/supervisorQuery";
import { EditSupervisors } from "../../../../../../components/Sessions/Supervisors/EditModal";
import { EditIcon } from "../../../../../../components/Icons";

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
    <div className="bg-white border border-gray-150 rounded-3xl p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-lg font-bold text-gray-800">Supervisors</h2>
        {supers && supers.length > 0 && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-grey-50 text-(--main-color) border border-grey-100">
            {supers.length} {supers.length === 1 ? "Supervisor" : "Supervisors"}
          </span>
        )}
      </div>

      {/* Loading Skeleton */}
      {isLoadSuper ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3.5">
          {[1, 2].map((n) => (
            <div key={n} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 animate-pulse space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0"></div>
                <div className="flex-1 space-y-1.5">
                  <div className="h-3.5 bg-gray-200 rounded-md w-2/3"></div>
                  <div className="h-2.5 bg-gray-200 rounded-md w-1/3"></div>
                </div>
              </div>
              <div className="h-3 bg-gray-200 rounded-md w-full"></div>
            </div>
          ))}
        </div>
      ) : !supers || supers.length === 0 ? (
        <div className="text-center py-8 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-xs text-gray-400 font-semibold">
            No supervisors assigned yet.
          </p>
        </div>
      ) : (
        /* Smart Auto-Fill Grid (Ensures minimum 250px per card) */
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3.5">
          {supers.map((s: any, index: number) => {
            const fullName = `${s.firstName || ""} ${s.lastName || ""}`.trim() || "Supervisor";
            
            return (
              <div
                key={s.adminId || index}
                className="p-4 bg-gray-50/80 hover:bg-white border border-gray-150 hover:border-grey-200 rounded-2xl transition-all duration-200 shadow-2xs hover:shadow-md flex flex-col justify-between gap-3 group"
              >
                {/* Top Section: Avatar + Name + Edit Action */}
                <div className="flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-grey-100/70 text-(--main-color) font-bold text-xs flex items-center justify-center shrink-0 border border-grey-200/60 shadow-2xs group-hover:bg-(--main-color) group-hover:text-white transition-colors">
                      {s.firstName?.[0]?.toUpperCase() || "S"}
                      {s.lastName?.[0]?.toUpperCase() || ""}
                    </div>

                    {/* Name */}
                    <div className="min-w-0">
                      <h4
                        className="text-xs font-bold text-gray-800 truncate"
                        title={fullName}
                      >
                        {fullName}
                      </h4>
                      <span className="text-[10px] text-gray-400 font-medium">
                        Supervisor
                      </span>
                    </div>
                  </div>

                  {/* Edit Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpenEdit(true);
                      setSelectedSupervisor(s.assignmentId);
                    }}
                    className="p-1.5 text-gray-400   border border-transparent hover:border-grey-100 rounded-xl transition-all cursor-pointer shrink-0"
                    title="Edit Supervisor"
                  >
                    <EditIcon className="text-(--main-color)" />
                  </button>
                </div>

                {/* Bottom Section: Contact Info */}
                <div className="pt-2.5 border-t border-gray-200/60 text-[11px] text-gray-500 space-y-1.5">
                  <div className="flex items-center gap-2 min-w-0" title={s.email || "No email"}>
                    <EmailIcon sx={{ fontSize: 14 }} className="text-gray-400 shrink-0" />
                    <span className="truncate">{s.email || "No email provided"}</span>
                  </div>

                  {s.phoneNumber && (
                    <div className="flex items-center gap-2 min-w-0" title={s.phoneNumber}>
                      <PhoneIcon sx={{ fontSize: 14 }} className="text-gray-400 shrink-0" />
                      <span className="truncate">{s.phoneNumber}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Modal Component */}
      <EditSupervisors
        open={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        sessionId={sessionId}
        adminId={selectedSupervisor}
      />
    </div>
  );
};