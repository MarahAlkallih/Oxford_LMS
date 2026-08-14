import { useGetExamEventsQuery } from "../../../../../../services/exams/events/examEventQuery";

// MUI Icons
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import QuizIcon from "@mui/icons-material/Quiz";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GradeIcon from "@mui/icons-material/Grade";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { AddUserToAssignment } from "./AddStudentModal";
import { useState } from "react";
import { VisibilityIcon } from "../../../../../../components/Icons";
import { useNavigate } from "react-router-dom";

interface CourseProps {
  courseId: number;
  onAddStudents?: (eventId: number) => void; 
}

export const ExamCourse = ({ courseId, onAddStudents }: CourseProps) => {
  const { data, isLoading } = useGetExamEventsQuery({ courseId });
  const navigate=useNavigate()
  // استخراج قائمة الفعاليات الامتحانية
  const events = data?.data || [];
  const [isOpenAdd,setIsOpenAdd]=useState(false)
  const [id,setId]=useState(0)
  // تنسيق التاريخ
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-56 bg-gray-100 rounded-3xl animate-pulse p-5 space-y-4"
          >
            <div className="h-6 bg-gray-200 rounded-lg w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
            <div className="h-16 bg-gray-200 rounded-2xl"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className=" p-8 text-center text-gray-400 font-semibold">
        No Exam Found 
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {events.map((event: any) => {
        const { id, startDate, endDate, exam } = event;

        return (
          <div
            key={id}
            className="bg-white border border-gray-150 rounded-3xl p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
          >
            {/* Top Section */}
            <div className="space-y-3">
              {/* Exam Icon & Title Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
                    <QuizIcon fontSize="small" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-gray-800 truncate group-hover:text-amber-600 transition-colors">
                      {exam?.title || "عنوان الامتحان"}
                    </h3>
                    <span className="text-[11px] font-semibold text-gray-400 block">
                      Code: {exam?.code || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shrink-0 ${
                    exam?.status === "Active"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-gray-50 text-gray-600 border-gray-200"
                  }`}
                >
                  {exam?.status || "Draft"}
                </span>
              </div>

              {/* Subtitle / Description */}
              {exam?.subTitle && (
                <p className="text-xs text-gray-500 line-clamp-2">
                  {exam.subTitle}
                </p>
              )}

              {/* Quick Details (Duration & Grade) */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-2.5 flex items-center gap-2">
                  <AccessTimeIcon className="text-gray-400" sx={{ fontSize: 18 }} />
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block">Exam Time</span>
                    <span className="text-xs font-bold text-gray-800">
                      {exam?.examTime ? `${exam.examTime} دقيقة` : "N/A"}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-2.5 flex items-center gap-2">
                  <GradeIcon className="text-amber-500" sx={{ fontSize: 18 }} />
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block">Grade Percentage</span>
                    <span className="text-xs font-bold text-gray-800">
                      {exam?.gradePercentage ? `${exam.gradePercentage}%` : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Event Date Range */}
              <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-500 bg-gray-50/70 p-2.5 rounded-2xl border border-gray-100">
                <CalendarTodayIcon className="text-gray-400" sx={{ fontSize: 15 }} />
                <span>
                  {formatDate(startDate)} - {formatDate(endDate)}
                </span>
              </div>
            </div>

            {/* Bottom Actions Footer */}
            <div className="flex pt-4 mt-4 border-t border-gray-100 flex items-center gap-2">
              <button
                onClick={() => {setIsOpenAdd(true),setId(exam.id)}}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-(--main-color)
                
                 text-amber-100 border rounded-2xl text-xs font-bold transition-all
                  cursor-pointer shadow-2xs active:scale-[0.98]"
              >
                <PersonAddAlt1Icon sx={{ fontSize: 18 }} />
                <span>Add Students </span>
              </button>
              <button onClick={()=>navigate(`examAssignment/${id}`)}  className=" h-full w-12 border rounded-2xl cursor-pointer ">
                <VisibilityIcon color="#7f9676" size={20} />
              </button>
            </div>
          </div>
        );
      })}
      <AddUserToAssignment open={isOpenAdd} 
      onClose={()=>{setIsOpenAdd(false)} } examEventId={id} courseId={courseId}      
      />
    </div>
  );
};