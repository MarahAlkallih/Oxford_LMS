import { useParams, useNavigate } from "react-router-dom";
import {
  useGetOneAssignmentQuery,
  useGetAnswersQuery,
} from "../../../../../../services/exams/assignment/assignmentQuery";

// Import your Datum model interface if needed
import type { Datum } from "../../../../../../types/exam/Answer"; // 👈 حددي مسار الموديل لديكِ

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
import HelpOutlineIcon from "@mui/icons-material/HelpOutlineOutlined";

export const OneAssignment = () => {
  const { traineeId } = useParams();
  const navigate = useNavigate();
  const id = Number(traineeId);

  // 1. Fetch Assignment Details
  const { data: assignment, isLoading: isAssignmentLoading } =
    useGetOneAssignmentQuery({ id });

  // 2. Fetch Answers (يمكنكِ تمرير assignmentUserId أو الفلترة حسب الـ Backend)
  const { data: ans, isLoading: isAnswersLoading } = useGetAnswersQuery({
    assignmentUserId: id, // 👈 أو يمكنكِ تركها حسب المشرّع في الـ API الخاص بكم
  });

  // قائمة الإجابات القادمة من الـ API بناءً على الموديل (ans.data)
  const submittedAnswers: Datum[] = ans?.data || [];

  // Date Formatter Helper
  const formatDate = (dateString?: string | Date | null) => {
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

  if (isAssignmentLoading) {
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
              {formatDate(createdAt)}
            </span>
          </div>

          <div className="bg-gray-50 border border-gray-100 p-3 rounded-2xl space-y-1">
            <span className="text-[11px] font-bold text-gray-400 block uppercase">
              Start Time
            </span>
            <span className="text-xs font-bold text-gray-700 block">
              {formatDate(startTime)}
            </span>
          </div>

          <div className="bg-gray-50 border border-gray-100 p-3 rounded-2xl space-y-1">
            <span className="text-[11px] font-bold text-gray-400 block uppercase">
              End Time
            </span>
            <span className="text-xs font-bold text-gray-700 block">
              {formatDate(endTime)}
            </span>
          </div>

          <div className="bg-gray-50 border border-gray-100 p-3 rounded-2xl space-y-1">
            <span className="text-[11px] font-bold text-gray-400 block uppercase">
              Last Updated
            </span>
            <span className="text-xs font-bold text-gray-700 block">
              {formatDate(updatedAt)}
            </span>
          </div>
        </div>
      </div>

      {/* 🟢 Submitted Answers Section (Cards) */}
      <div className="bg-white border border-gray-150 p-5 rounded-3xl shadow-2xs space-y-5">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
            <QuizIcon className="text-amber-500" fontSize="small" />
            <span>Submitted Answers</span>
          </div>
          <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Total Answers: {submittedAnswers.length}
          </span>
        </div>

        {/* Loading State for Answers */}
        {isAnswersLoading ? (
          <div className="space-y-3">
            <div className="h-28 bg-gray-100 rounded-2xl animate-pulse" />
            <div className="h-28 bg-gray-100 rounded-2xl animate-pulse" />
          </div>
        ) : submittedAnswers.length === 0 ? (
          /* Empty State */
          <div className="py-8 text-center space-y-2">
            <EventAvailableIcon className="text-gray-300" sx={{ fontSize: 40 }} />
            <p className="text-xs font-bold text-gray-400">
              No submitted answers recorded for this assignment yet.
            </p>
          </div>
        ) : (
          /* List of Answer Cards */
          <div className="space-y-4">
            {submittedAnswers.map((item: Datum, index: number) => {
              const isCorrect = item.questionField?.isCorrect;

              return (
                <div
                  key={item.id || index}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    isCorrect
                      ? "bg-emerald-50/40 border-emerald-200 hover:border-emerald-300"
                      : "bg-red-50/40 border-red-200 hover:border-red-300"
                  }`}
                >
                  {/* Top Bar: Question Header & Result Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-gray-200/60">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-amber-700 bg-amber-100/70 border border-amber-200 px-2.5 py-0.5 rounded-lg">
                          Question #{item.question?.questionNumber || index + 1}
                        </span>
                        <span className="text-xs font-semibold text-gray-500">
                          Earned Grade:{" "}
                          <strong className="text-gray-800 font-bold">
                            {item.dueGrade}
                          </strong>{" "}
                          / {item.question?.correctAnswerGrade ?? "-"} pts
                        </span>
                      </div>

                      {/* Question Text */}
                      <h4 className="text-sm font-bold text-gray-900 pt-1">
                        {item.question?.questionText || "Question text not provided"}
                      </h4>
                    </div>

                    {/* Result Badge */}
                    <span
                      className={`self-start text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 shrink-0 ${
                        isCorrect
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                          : "bg-red-100 text-red-800 border-red-300"
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />
                          <span>Correct</span>
                        </>
                      ) : (
                        <>
                          <HighlightOffIcon sx={{ fontSize: 16 }} />
                          <span>Incorrect</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Chosen Option / Field Text */}
                  <div className="mt-3 bg-white/80 border border-gray-200/80 p-3.5 rounded-xl space-y-1">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                      Student's Selected Answer:
                    </span>
                    <p className="text-xs font-semibold text-gray-800">
                      {item.questionField?.field || "No answer selected"}
                    </p>
                  </div>

                  {/* Question Hint (If Available) */}
                  {item.question?.hint && (
                    <div className="mt-2.5 flex items-start gap-2 text-xs text-amber-800 bg-amber-50/80 border border-amber-200/70 p-3 rounded-xl">
                      <HelpOutlineIcon fontSize="small" className="text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold">Hint: </strong>
                        <span>{item.question.hint}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};