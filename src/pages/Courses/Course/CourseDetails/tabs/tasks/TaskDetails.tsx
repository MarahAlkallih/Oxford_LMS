import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetSubmissionsQuery } from "../../../../../../services/courses/tasks/taskQuery";
import {  DeleteIcon, VisibilityIcon } from "../../../../../../components/Icons";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import { GradSubmissionModal } from "../../../../../../components/Course/Tasks/GradSubmitionModal";
import { DeleteSubModal } from "../../../../../../components/Course/Tasks/DeleteSumissionTask";
// TypeScript Interfaces based on your data structure
interface StudentAccount {
  firstName: string;
  lastName: string;
}

interface Student {
  id: number;
  accountId: number;
  account: StudentAccount;
}

interface Submission {
  id: number;
  taskId: number;
  studentId: number;
  filePath: string | null;
  grade: number | null;
  feedback: string | null;
  submittedAt: string;
  student: Student;
}

export const TaskDetails = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const id = Number(taskId);

  const { data, isLoading } = useGetSubmissionsQuery({ id: id });

  // Modals local state
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isOpenGrad, setIsOpenGrad] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [Id,setId]=useState(0)

  // Normalize data array
  const submissions: Submission[] = Array.isArray(data?.data)
    ? data.data.map((sub) => ({
        ...sub,
        submittedAt: sub.submittedAt instanceof Date ? sub.submittedAt.toISOString() : String(sub.submittedAt),
      }))
    : Array.isArray(data)
    ? data.map((sub) => ({
        ...sub,
        submittedAt: sub.submittedAt instanceof Date ? sub.submittedAt.toISOString() : String(sub.submittedAt),
      }))
    : [];

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-3xl border border-gray-150 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-gray-500 hover:text-indigo-600 bg-gray-50 rounded-2xl border border-gray-150 transition-colors cursor-pointer"
            title="Go Back"
          >
            ←
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Task Submissions
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Review and grade student submitted files for Task #{taskId}
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-2xl">
          Total Submissions: {submissions.length}
        </span>
      </div>

      {/* Grid List */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-56 bg-gray-100 rounded-3xl animate-pulse"
            />
          ))}
        </div>
      ) : submissions.length === 0 ? (
        <div className="p-12 text-center bg-white border border-gray-150 rounded-3xl space-y-2">
          <p className="text-sm font-bold text-gray-700">
            No Submissions Found
          </p>
          <p className="text-xs text-gray-400">
            No students have submitted work for this task yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {submissions.map((sub) => {
            const studentName = sub.student?.account
              ? `${sub.student.account.firstName} ${sub.student.account.lastName}`
              : `Student #${sub.studentId}`;

            const fileName = sub.filePath ? sub.filePath.split("/").pop() : null;

            return (
              <div
                key={sub.id}
                className="bg-white border border-gray-150 rounded-3xl p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-4"
              >
                {/* Header: Student Info + Actions */}
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-3">
                    {/* Student Avatar Icon */}
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-sm capitalize">
                      {sub.student?.account?.firstName?.[0] || "S"}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 capitalize leading-tight">
                        {studentName}
                      </h3>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        ID: {sub.studentId}
                      </p>
                    </div>
                  </div>

                  {/* Top Action Icons */}
                  <div className="flex items-center gap-1 bg-gray-50 p-1.5 rounded-2xl border border-gray-150">
                    <button
                      onClick={() =>{setIsOpenGrad(true),setId(sub.id)}}
                      className="p-1.5 text-gray-500 hover:text-amber-600 rounded-xl hover:bg-white transition-colors cursor-pointer"
                      title="Edit / Add Grade"
                    >
                      <GradingOutlinedIcon  />
                    </button>
                    <button
                      onClick={() =>{setIsOpenDelete(true),setId(sub.id)}}
                      className="p-1.5 text-gray-500 hover:text-red-600 rounded-xl hover:bg-white transition-colors cursor-pointer"
                      title="Delete Submission"
                    >
                      <DeleteIcon size={24} />
                    </button>
                  </div>
                </div>

                {/* Submission Details */}
                <div className="space-y-2.5 text-xs text-gray-600 pt-3 border-t border-gray-100">
                  {/* Grade Display */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-semibold">Grade</span>
                    {sub.grade !== null ? (
                      <span className="font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-xl">
                        {sub.grade} pts
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-0.5 rounded-xl">
                        Pending Grade
                      </span>
                    )}
                  </div>

                  {/* Date Display */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-semibold">
                      Submitted At
                    </span>
                    <span className="font-bold text-gray-700">
                      {formatDate(sub.submittedAt)}
                    </span>
                  </div>

                  {/* Feedback preview if available */}
                  {sub.feedback && (
                    <div className="pt-1">
                      <p className="text-gray-400 font-semibold mb-0.5">
                        Feedback:
                      </p>
                      <p className="text-gray-600 bg-gray-50 p-2 rounded-xl text-[11px] italic line-clamp-2">
                        "{sub.feedback}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Attachment Section */}
                {sub.filePath && (
                  <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-semibold">
                      Submitted File
                    </span>
                    <a
                      href={`/${sub.filePath}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl font-bold transition-colors text-[11px] max-w-[180px]"
                    >
                      <VisibilityIcon />
                      <span className="truncate">{fileName}</span>
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      <GradSubmissionModal
      open={isOpenGrad}
      onClose={()=>setIsOpenGrad(false)}
      taskId={Id}

      
      />
     <DeleteSubModal
     open={isOpenDelete}
     onClose={()=>setIsOpenDelete(false)}
     id={Id}
     />
    </div>
  );
};