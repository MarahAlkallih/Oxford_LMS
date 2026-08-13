import { useParams, useNavigate } from "react-router-dom";
import { useGetOneAssignmentQuery } from "../../../../../../services/exams/assignment/assignmentQuery";

// MUI Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import GradeIcon from "@mui/icons-material/Grade";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import QuizIcon from "@mui/icons-material/Quiz";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

export const OneAssignment = () => {
  const { traineeId } = useParams();
  const navigate = useNavigate();
  const id = Number(traineeId);

  const { data: assignment, isLoading } = useGetOneAssignmentQuery({ id });

  // Date Formatter Helper
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "Not Started / N/A";
    return new Date(dateString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // Status Badge Styling
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-40 bg-gray-100 rounded-3xl animate-pulse" />
          <div className="h-40 bg-gray-100 rounded-3xl animate-pulse" />
          <div className="h-40 bg-gray-100 rounded-3xl animate-pulse" />
        </div>
        <div className="h-64 bg-gray-100 rounded-3xl animate-pulse" />
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="p-12 text-center bg-white border border-gray-150 rounded-3xl max-w-xl mx-auto mt-10 space-y-3">
        <AssignmentIcon className="text-gray-300" sx={{ fontSize: 56 }} />
        <h2 className="text-lg font-bold text-gray-700">Assignment Not Found</h2>
        <p className="text-xs text-gray-400">
          The requested assignment details could not be retrieved.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl text-xs font-bold transition-all cursor-pointer"
        >
          <ArrowBackIcon fontSize="small" />
          Go Back
        </button>
      </div>
    );
  }

  const {
    user,
    exam,
    status,
    success,
    grade,
    correctAnswersCount,
    wrongAnswersCount,
    answers = [],
    startTime,
    endTime,
    createdAt,
    updatedAt,
    examEventId,
  } = assignment;

  const traineeName =
    user?.fullName ||
    user?.name ||
    user?.email ||
    `Trainee #${assignment.traineeId}`;

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-150 p-5 rounded-3xl shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-all cursor-pointer"
            title="Go Back"
          >
            <ArrowBackIcon fontSize="small" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-900">
                Assignment Details
              </h1>
              <span className="text-xs text-gray-400 font-medium">#{assignment.id}</span>
            </div>
            <p className="text-xs text-gray-400 font-medium mt-0.5">
              Event ID: #{examEventId}
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2.5">
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wide ${getStatusBadge(
              status
            )}`}
          >
            {status || "assigned"}
          </span>

          <span
            className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 ${
              success
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-red-50 text-red-600 border-red-200"
            }`}
          >
            {success ? (
              <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />
            ) : (
              <HighlightOffIcon sx={{ fontSize: 16 }} />
            )}
            {success ? "Passed" : "Failed / Pending"}
          </span>
        </div>
      </div>

      {/* Top Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Trainee Profile Card */}
        <div className="bg-white border border-gray-150 p-5 rounded-3xl shadow-2xs space-y-3">
          <div className="flex items-center gap-2.5 text-amber-600 font-bold text-xs uppercase tracking-wider">
            <PersonIcon fontSize="small" />
            <span>Trainee Info</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-800">{traineeName}</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Trainee ID: #{assignment.traineeId}
            </p>
            {user?.email && (
              <p className="text-xs text-gray-500 mt-1 font-medium truncate">
                {user.email}
              </p>
            )}
          </div>
        </div>

        {/* Exam Info Card */}
        <div className="bg-white border border-gray-150 p-5 rounded-3xl shadow-2xs space-y-3">
          <div className="flex items-center gap-2.5 text-amber-600 font-bold text-xs uppercase tracking-wider">
            <AssignmentIcon fontSize="small" />
            <span>Exam Info</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-800">
              {exam?.code ? `Code: ${exam.code}` : `Exam #${exam?.id || assignment.examEventId}`}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Exam ID: #{exam?.id || "N/A"}
            </p>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              Event ID: #{examEventId}
            </p>
          </div>
        </div>

        {/* Score & Grade Summary */}
        <div className="bg-white border border-gray-150 p-5 rounded-3xl shadow-2xs space-y-3">
          <div className="flex items-center gap-2.5 text-amber-600 font-bold text-xs uppercase tracking-wider">
            <GradeIcon fontSize="small" />
            <span>Grade & Score</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900">{grade ?? 0}</span>
            <span className="text-xs font-bold text-gray-400">Total Points</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
              <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />
              <span>{correctAnswersCount ?? 0} Correct</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-red-500 font-bold">
              <CancelOutlinedIcon sx={{ fontSize: 16 }} />
              <span>{wrongAnswersCount ?? 0} Wrong</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Card */}
      <div className="bg-white border border-gray-150 p-5 rounded-3xl shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-800 border-b border-gray-100 pb-3">
          <AccessTimeIcon className="text-amber-500" fontSize="small" />
          <span>Timeline & Schedule</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 border border-gray-100 p-3 rounded-2xl space-y-1">
            <span className="text-[11px] font-bold text-gray-400 block uppercase">
              Assigned At
            </span>
            <span className="text-xs font-bold text-gray-700 block">
              {formatDate(createdAt?.toString())}
            </span>
          </div>

          <div className="bg-gray-50 border border-gray-100 p-3 rounded-2xl space-y-1">
            <span className="text-[11px] font-bold text-gray-400 block uppercase">
              Start Time
            </span>
            <span className="text-xs font-bold text-gray-700 block">
              {formatDate(startTime?.toString())}
            </span>
          </div>

          <div className="bg-gray-50 border border-gray-100 p-3 rounded-2xl space-y-1">
            <span className="text-[11px] font-bold text-gray-400 block uppercase">
              End Time
            </span>
            <span className="text-xs font-bold text-gray-700 block">
              {formatDate(endTime?.toString())}
            </span>
          </div>

          <div className="bg-gray-50 border border-gray-100 p-3 rounded-2xl space-y-1">
            <span className="text-[11px] font-bold text-gray-400 block uppercase">
              Last Updated
            </span>
            <span className="text-xs font-bold text-gray-700 block">
              {formatDate(updatedAt?.toString())}
            </span>
          </div>
        </div>
      </div>

      {/* Submitted Answers Section */}
      <div className="bg-white border border-gray-150 p-5 rounded-3xl shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
            <QuizIcon className="text-amber-500" fontSize="small" />
            <span>Submitted Answers</span>
          </div>
          <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Total Answers: {answers.length}
          </span>
        </div>

        {answers.length === 0 ? (
          <div className="py-8 text-center space-y-2">
            <EventAvailableIcon className="text-gray-300" sx={{ fontSize: 40 }} />
            <p className="text-xs font-bold text-gray-400">
              No submitted answers recorded for this assignment yet.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {answers.map((ans: any, index: number) => (
              <div
                key={ans.id || index}
                className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-gray-500">
                    Question #{index + 1}
                  </span>
                  <p className="text-xs font-semibold text-gray-800">
                    {ans.text || ans.answer || JSON.stringify(ans)}
                  </p>
                </div>
                {ans.isCorrect !== undefined && (
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      ans.isCorrect
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {ans.isCorrect ? "Correct" : "Incorrect"}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};