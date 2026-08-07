import { useParams, useNavigate } from "react-router-dom";
import { useGetOneSessionEventQuery } from "../../../services/exams/exam-session/examSessionQuery";

// MUI Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import QuizIcon from "@mui/icons-material/Quiz";
import SchoolIcon from "@mui/icons-material/School";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TimerIcon from "@mui/icons-material/Timer";
import GradeIcon from "@mui/icons-material/Grade";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import HelpIcon from "@mui/icons-material/Help";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export const SessionExamDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const eventid = Number(eventId);

  const { data: resData, isLoading } = useGetOneSessionEventQuery({ id: eventid });

  // استخراج الكائن الأساسي (حسب رد الـ API)
  const eventData = resData ;

  // تنسيق التاريخ والوقت
  const formatDate = (dateValue?: string | Date) => {
    if (!dateValue) return "N/A";

    const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "N/A";

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateValue?: string | Date) => {
    if (!dateValue) return "N/A";

    const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "N/A";

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6 animate-pulse">
        <div className="h-10 bg-gray-200 rounded-2xl w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-3xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-gray-100 rounded-3xl"></div>
          <div className="h-96 bg-gray-100 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="p-12 text-center text-gray-400 font-semibold">
        Session Exam Event not found.
      </div>
    );
  }

  const { exam, course, session, examInstance, startDate, endDate } = eventData;
  const questions = examInstance?.questions || [];

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 animate-[fadeIn_0.3s_ease-out]">
      {/* 1️⃣ Top Navigation & Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2.5 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-all cursor-pointer shadow-2xs"
          title="Go Back"
        >
          <ArrowBackIcon fontSize="small" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
              {exam?.title || "Exam Details"}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
              {exam?.code || "Exam Code"}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {exam?.status || "Active"}
            </span>
          </div>
          <p className="text-xs text-gray-400 font-medium truncate mt-0.5">
            {exam?.subTitle || examInstance?.name || "Session Exam Overview"}
          </p>
        </div>
      </div>

      {/* 2️⃣ Top Metric Quick Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Course Card */}
        <div className="bg-white border border-gray-150 p-4 rounded-3xl shadow-2xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-(--sec-color) border border-blue-100 flex items-center justify-center shrink-0">
            <SchoolIcon fontSize="small" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
              Course
            </span>
            <h3 className="text-sm font-bold text-gray-800 truncate">
              {course?.title || "N/A"}
            </h3>
            <span className="text-[10px] font-semibold text-gray-400">
              Code: {course?.code || "N/A"}
            </span>
          </div>
        </div>

        {/* Duration Card */}
        <div className="bg-white border border-gray-150 p-4 rounded-3xl shadow-2xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center shrink-0">
            <TimerIcon fontSize="small" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
              Exam Duration
            </span>
            <h3 className="text-sm font-bold text-gray-800">
              {exam?.examTime ? `${exam.examTime} Minutes` : "N/A"}
            </h3>
            <span className="text-[10px] font-semibold text-gray-400">
              {questions.length} Questions
            </span>
          </div>
        </div>

        {/* Grade Percentage Card */}
        <div className="bg-white border border-gray-150 p-4 rounded-3xl shadow-2xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shrink-0">
            <GradeIcon fontSize="small" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
              Course Weight
            </span>
            <h3 className="text-sm font-bold text-gray-800">
              {exam?.gradePercentage ? `${exam.gradePercentage}%` : "N/A"}
            </h3>
            <span className="text-[10px] font-semibold text-gray-400">
              Correction: {exam?.showCorrection ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>

        {/* Exam Window Card */}
        <div className="bg-white border border-gray-150 p-4 rounded-3xl shadow-2xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-700 border border-purple-100 flex items-center justify-center shrink-0">
            <CalendarTodayIcon fontSize="small" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
              Event Date
            </span>
            <h3 className="text-xs font-bold text-gray-800 truncate">
              {formatDate(startDate)}
            </h3>
            <span className="text-[10px] font-semibold text-gray-400">
              {formatTime(startDate)} - {formatTime(endDate)}
            </span>
          </div>
        </div>
      </div>

      {/* 3️⃣ Main Dashboard Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Main Content Area (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Exam Instance & Forms Info */}
          <div className="bg-white border border-gray-150 rounded-3xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <QuizIcon className="text-(--main-color)" />
              <h2 className="text-base font-bold text-gray-900">
                Exam Configuration ({examInstance?.name})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Start Form */}
              {examInstance?.startForm && (
                <div className="bg-gray-50/80 p-4 rounded-2xl border border-gray-200/70 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 inline-block mb-1">
                    Start Form
                  </span>
                  <h4 className="text-xs font-bold text-gray-800">
                    {examInstance.startForm.title}
                  </h4>
                  <p className="text-[11px] text-gray-500">
                    {examInstance.startForm.subTitle}
                  </p>
                </div>
              )}

              {/* End Form */}
              {examInstance?.endForm && (
                <div className="bg-gray-50/80 p-4 rounded-2xl border border-gray-200/70 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200 inline-block mb-1">
                    End Form
                  </span>
                  <h4 className="text-xs font-bold text-gray-800">
                    {examInstance.endForm.title}
                  </h4>
                  <p className="text-[11px] text-gray-500">
                    {examInstance.endForm.subTitle}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Questions List */}
          <div className="bg-white border border-gray-150 rounded-3xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <HelpIcon className="text-(--main-color)" /> Exam Questions
              </h2>
              <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {questions.length} Questions
              </span>
            </div>

            {questions.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-6">
                No questions attached to this exam instance.
              </p>
            ) : (
              <div className="space-y-4">
                {questions.map((q: any, index: number) => (
                  <div
                    key={q.id || index}
                    className="p-4 bg-gray-50/80 border border-gray-200/80 rounded-2xl space-y-3"
                  >
                    {/* Question Header */}
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex items-start gap-2">
                        <span className="w-6 h-6 rounded-lg bg-gray-200 text-gray-700 font-bold text-xs flex items-center justify-center shrink-0">
                          {q.questionNumber || index + 1}
                        </span>
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-gray-800">
                            {q.questionText}
                          </h3>
                          {q.hint && (
                            <p className="text-[11px] text-amber-700 mt-0.5 flex items-center gap-1">
                              <InfoOutlinedIcon sx={{ fontSize: 13 }} /> Hint: {q.hint}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Grades badge */}
                      <div className="flex items-center gap-1.5 shrink-0 text-[10px] font-bold">
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md">
                          +{q.correctAnswerGrade} Marks
                        </span>
                        {q.wrongAnswerGrade !== 0 && (
                          <span className="bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-md">
                            {q.wrongAnswerGrade} Penalty
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Question Options/Fields */}
                    {q.fields && q.fields.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {q.fields.map((f: any) => (
                          <div
                            key={f.id}
                            className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold ${
                              f.isCorrect
                                ? "bg-emerald-50/80 border-emerald-300 text-emerald-900"
                                : "bg-white border-gray-200 text-gray-600"
                            }`}
                          >
                            <span>{f.field}</span>
                            {f.isCorrect ? (
                              <CheckCircleIcon
                                sx={{ fontSize: 16 }}
                                className="text-emerald-600"
                              />
                            ) : (
                              <CancelOutlinedIcon
                                sx={{ fontSize: 16 }}
                                className="text-gray-300"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info Area (1 Col) */}
        <div className="lg:col-span-1 space-y-6">
          {/* Associated Session Info */}
          <div className="bg-white border border-gray-150 rounded-3xl p-5 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100 flex items-center gap-2">
              <CalendarTodayIcon className="text-(--main-color)" sx={{ fontSize: 20 }} />
              Associated Session
            </h2>

            <div className="space-y-3 text-xs text-gray-600">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block">
                  Session Title
                </span>
                <p className="font-bold text-gray-800 text-sm">
                  {session?.title || "N/A"}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block">
                  Date & Time
                </span>
                <p className="font-semibold text-gray-700 flex items-center gap-1.5 mt-0.5">
                  <AccessTimeIcon sx={{ fontSize: 14 }} className="text-gray-400" />
                  {formatDate(session?.date)} ({formatTime(session?.startTime)} -{" "}
                  {formatTime(session?.endTime)})
                </p>
              </div>

              {session?.joinUrl && (
                <a
                  href={session.joinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-2xl transition-all shadow-2xs mt-2"
                >
                  <VideoCallIcon sx={{ fontSize: 20 }} />
                  <span>Join Zoom Meeting</span>
                </a>
              )}
            </div>
          </div>

          {/* Course Summary */}
          <div className="bg-white border border-gray-150 rounded-3xl p-5 shadow-2xs space-y-3">
            <h2 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-100 flex items-center gap-2">
              <SchoolIcon className="text-(--main-color)" sx={{ fontSize: 20 }} />
              Course Summary
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-400 font-medium">Category:</span>
                <span className="font-bold text-gray-800">
                  {course?.categoryName || "N/A"}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-400 font-medium">Fee:</span>
                <span className="font-bold text-gray-800">
                  {course?.fee ? `$${course.fee}` : "Free"}
                </span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-gray-400 font-medium">Course Hours:</span>
                <span className="font-bold text-gray-800">
                  {course?.hours ? `${course.hours} Hours` : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};