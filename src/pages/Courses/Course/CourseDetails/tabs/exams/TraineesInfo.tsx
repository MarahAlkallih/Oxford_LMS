import { useParams, useNavigate } from "react-router-dom";
import { useGetOneAssignmentQuery } from "../../../../../../services/exams/assignment/assignmentQuery";

// MUI Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import GradeIcon from "@mui/icons-material/Grade";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import QuizIcon from "@mui/icons-material/Quiz";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import CodeIcon from "@mui/icons-material/Code";

export const OneAssignment = () => {
  const { traineeId } = useParams();
  const navigate = useNavigate();
  const id = Number(traineeId);

  const { data: assignment, isLoading } = useGetOneAssignmentQuery({ id });

  // Format Date Helper
  const formatDate = (dateString?: string | Date | null) => {
    if (!dateString) return "N/A";
    const date = typeof dateString === "string" ? new Date(dateString) : dateString;
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Status Badge Helper
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

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
        <div className="h-20 bg-gray-100 rounded-3xl animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-gray-100 rounded-3xl animate-pulse" />
          ))}
        </div>
        <div className="h-64 bg-gray-100 rounded-3xl animate-pulse" />
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="p-12 text-center bg-white border border-gray-150 rounded-3xl max-w-xl mx-auto my-12 space-y-3">
        <AssignmentIcon className="text-gray-300" sx={{ fontSize: 56 }} />
        <h2 className="text-lg font-bold text-gray-800">Assignment Not Found</h2>
        <p className="text-xs text-gray-400">
          No detailed record exists for the provided ID.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl text-xs font-bold transition-all cursor-pointer"
        >
          Go Back
        </button>
      </div>
    );
  }

  const {
    status,
    success,
    grade,
    correctAnswersCount = 0,
    wrongAnswersCount = 0,
    answers = [],
    createdAt,
    updatedAt,
    startTime,
    endTime,
    exam,
    examEventId,
    examInstance,
    user: traineeUser,
    traineeId: tId,
  } = assignment;

  const totalQuestions = correctAnswersCount + wrongAnswersCount;

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      {/* 🟢 Top Navigation & Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-150 p-5 rounded-3xl shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-all cursor-pointer"
            title="Back"
          >
            <ArrowBackIcon fontSize="small" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-900">
                Assignment Details
              </h1>
              <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-lg">
                #{assignment.id}
              </span>
            </div>
            <p className="text-xs text-gray-400 font-medium mt-0.5">
              Exam Event ID: #{examEventId}
            </p>
          </div>
        </div>

        {/* Status & Success Badges */}
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${getStatusBadge(
              status
            )}`}
          >
            {status || "assigned"}
          </span>

          <span
            className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1 ${
              success
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {success ? (
              <>
                <CheckCircleIcon sx={{ fontSize: 16 }} /> Passed
              </>
            ) : (
              <>
                <CancelOutlinedIcon sx={{ fontSize: 16 }} /> Failed
              </>
            )}
          </span>
        </div>
      </div>

      {/* 🟢 Performance Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Grade */}
        <div className="bg-white border border-gray-150 rounded-3xl p-5 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
              Final Grade
            </span>
            <span className="text-2xl font-black text-gray-900 mt-1 block">
              {grade ?? 0}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center">
            <GradeIcon />
          </div>
        </div>

        {/* Correct Answers */}
        <div className="bg-white border border-gray-150 rounded-3xl p-5 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
              Correct Answers
            </span>
            <span className="text-2xl font-black text-emerald-600 mt-1 block">
              {correctAnswersCount}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
            <CheckCircleIcon />
          </div>
        </div>

        {/* Wrong Answers */}
        <div className="bg-white border border-gray-150 rounded-3xl p-5 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
              Wrong Answers
            </span>
            <span className="text-2xl font-black text-red-600 mt-1 block">
              {wrongAnswersCount}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 border border-red-100 flex items-center justify-center">
            <CancelOutlinedIcon />
          </div>
        </div>

        {/* Total Answers */}
        <div className="bg-white border border-gray-150 rounded-3xl p-5 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
              Submitted Answers
            </span>
            <span className="text-2xl font-black text-indigo-600 mt-1 block">
              {answers.length}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
            <FactCheckIcon />
          </div>
        </div>
      </div>

      {/* 🟢 Detailed Info Cards Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Exam & Submission Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Exam Info Card */}
          <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <QuizIcon className="text-amber-500" fontSize="small" />
              <h2 className="text-base font-bold text-gray-800">
                Exam Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3.5 space-y-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide block">
                  Exam Code
                </span>
                <span className="text-sm font-extrabold text-gray-800 flex items-center gap-1.5">
                  <CodeIcon fontSize="inherit" className="text-gray-400" />
                  {exam?.code || "N/A"}
                </span>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3.5 space-y-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide block">
                  Exam ID
                </span>
                <span className="text-sm font-extrabold text-gray-800">
                  #{exam?.id || "N/A"}
                </span>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3.5 space-y-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide block">
                  Instance ID
                </span>
                <span className="text-sm font-extrabold text-gray-800">
                  #{examInstance?.id || "N/A"}
                </span>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3.5 space-y-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide block">
                  Total Evaluated
                </span>
                <span className="text-sm font-extrabold text-gray-800">
                  {totalQuestions} Questions
                </span>
              </div>
            </div>
          </div>

          {/* Submissions Section */}
          <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <FactCheckIcon className="text-indigo-500" fontSize="small" />
                <h2 className="text-base font-bold text-gray-800">
                  Student Responses
                </h2>
              </div>
              <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-xl">
                {answers.length} Record(s)
              </span>
            </div>

            {answers.length === 0 ? (
              <div className="py-8 text-center space-y-1">
                <p className="text-xs font-bold text-gray-400">
                  No submitted answers recorded yet.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {answers.map((ans: any, index: number) => (
                  <div
                    key={ans.id || index}
                    className="p-4 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-between"
                  >
                    <span className="text-xs font-bold text-gray-700">
                      Answer #{index + 1}
                    </span>
                    <span className="text-xs font-semibold text-gray-500">
                      {JSON.stringify(ans)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Trainee Profile & Timeline */}
        <div className="space-y-6">
          {/* Trainee Card */}
          <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <PersonIcon className="text-amber-500" fontSize="small" />
              <h2 className="text-base font-bold text-gray-800">
                Trainee Profile
              </h2>
            </div>

            <div className="flex items-center gap-3 bg-amber-50/50 border border-amber-100/60 p-3.5 rounded-2xl">
              <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold shrink-0">
                <PersonIcon />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-gray-900 truncate">
                  Trainee #{tId}
                </h3>
                {traineeUser?.accountId && (
                  <p className="text-xs font-medium text-gray-500">
                    Account ID: #{traineeUser.accountId}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2 text-xs font-medium text-gray-600 pt-1">
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-400 font-bold">Trainee ID</span>
                <span className="font-extrabold text-gray-800">#{tId}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-400 font-bold">User Object ID</span>
                <span className="font-extrabold text-gray-800">
                  #{traineeUser?.id || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Activity Timeline Card */}
          <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <AccessTimeIcon className="text-blue-500" fontSize="small" />
              <h2 className="text-base font-bold text-gray-800">
                Session Timeline
              </h2>
            </div>

            <div className="space-y-4 pt-1">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl mt-0.5">
                  <CalendarTodayIcon sx={{ fontSize: 16 }} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">
                    Created At
                  </span>
                  <span className="text-xs font-bold text-gray-800">
                    {formatDate(createdAt)}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-xl mt-0.5">
                  <AccessTimeIcon sx={{ fontSize: 16 }} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">
                    Start Time
                  </span>
                  <span className="text-xs font-bold text-gray-800">
                    {formatDate(startTime)}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-xl mt-0.5">
                  <AccessTimeIcon sx={{ fontSize: 16 }} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">
                    End Time
                  </span>
                  <span className="text-xs font-bold text-gray-800">
                    {formatDate(endTime)}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 text-gray-600 rounded-xl mt-0.5">
                  <CalendarTodayIcon sx={{ fontSize: 16 }} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">
                    Last Updated
                  </span>
                  <span className="text-xs font-bold text-gray-800">
                    {formatDate(updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};