import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import GradeIcon from "@mui/icons-material/Grade";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import type { Datum } from "../../../../../../types/exam/assignmentUser";
import { DeleteIcon, VisibilityIcon } from "../../../../../../components/Icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DeleteTraineeModal } from "./DeleteAssignment";

interface AssignmentCardProps {
  data: Datum;
}

export const AssignmentCard = ({ data }: AssignmentCardProps) => {
    const navigate=useNavigate()
    const [isOpenDelete,setIsOpenDelete]=useState(false)
    const [selectedId,setSelectedId]=useState(0)
  const studentName = data.user?.account
    ? `${data.user.account.firstName} ${data.user.account.lastName}`
    : "Unknown Student";

  const studentEmail = data.user?.account?.email || "N/A";

  const getStatusBadge = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "assigned":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "in_progress":
        return "bg-amber-50 text-amber-700 border-amber-200";

      case "submitted":
        return "bg-purple-50 text-purple-700 border-purple-200";

      case "graded":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="bg-white border border-gray-150 rounded-3xl p-5 shadow-2xs hover:shadow-md transition-all">
      
      {/* Student Info */}
      <div className="flex items-start justify-between gap-3">
        
        <div className="flex items-center gap-3 min-w-0">
          
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
            <PersonIcon fontSize="small" />
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-bold text-gray-800 truncate">
              {studentName}
            </h3>

            <span className="text-[11px] font-medium text-gray-400 block truncate">
              {studentEmail}
            </span>
          </div>

        </div>

        {/* Status */}
        <span
          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shrink-0 uppercase tracking-wide ${getStatusBadge(
            data.status
          )}`}
        >
          {data.status || "assigned"}
        </span>
 <span>
        <button   className={`text-[10px]  px-2.5 py-0.5 rounded-full 
              tracking-wide cursor-pointer bg-gray-200 `}  onClick={()=>navigate(`${data.id}`)}>
            <VisibilityIcon />
        </button>

        </span>
        <span>
        <button   className={`text-[10px]  px-2.5 py-0.5 rounded-full 
              tracking-wide cursor-pointer bg-gray-200 `}  
              onClick={()=>{setIsOpenDelete(true),setSelectedId(data.id)}}>
            <DeleteIcon />
        </button>

        </span>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-2 mt-4">

        {/* Result */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-2.5 flex items-center gap-2">
          
          {data.success === true ? (
            <CheckCircleIcon
              className="text-emerald-500"
              sx={{ fontSize: 20 }}
            />
          ) : data.success === false ? (
            <HighlightOffIcon
              className="text-red-500"
              sx={{ fontSize: 20 }}
            />
          ) : (
            <AssignmentTurnedInIcon
              className="text-gray-400"
              sx={{ fontSize: 20 }}
            />
          )}

          <div>
            <span className="text-[10px] text-gray-400 font-bold block">
              Result
            </span>

            <span
              className={`text-xs font-bold ${
                data.success === true
                  ? "text-emerald-600"
                  : data.success === false
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {data.success === true
                ? "Passed"
                : data.success === false
                ? "Failed"
                : "Pending"}
            </span>
          </div>

        </div>

        {/* Grade */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-2.5 flex items-center gap-2">
          
          <GradeIcon
            className="text-amber-500"
            sx={{ fontSize: 20 }}
          />

          <div>
            <span className="text-[10px] text-gray-400 font-bold block">
              Grade
            </span>

            <span className="text-xs font-bold text-gray-800">
              {data.grade ?? "N/A"}
            </span>
          </div>

        </div>

      </div>

      {/* Answers */}
      <div className="grid grid-cols-2 gap-2 mt-2">

        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-2 text-center">
          <span className="text-[10px] text-emerald-600 font-bold block">
            Correct
          </span>

          <span className="text-sm font-bold text-emerald-700">
            {data.correctAnswersCount}
          </span>
        </div>

        <div className="bg-red-50 border border-red-100 rounded-2xl p-2 text-center">
          <span className="text-[10px] text-red-600 font-bold block">
            Wrong
          </span>

          <span className="text-sm font-bold text-red-700">
            {data.wrongAnswersCount}
          </span>
        </div>

      </div>
<DeleteTraineeModal open={isOpenDelete} onClose={()=>setIsOpenDelete(false)} traineeId={selectedId}/>
    </div>
  );
};