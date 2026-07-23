import React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BadgeIcon from "@mui/icons-material/Badge";
import PeopleIcon from "@mui/icons-material/People"; // أيقونة الطلاب
import ClassIcon from "@mui/icons-material/Class";   // أيقونة الـ Sessions
import { Navigate, useNavigate } from "react-router-dom";

// تعريف الواجهة الخاصة ببيانات الكورسات المستلمة
interface CourseData {
  id: number;
  courseId: number;
  courseName: string;
  courseCode: string;
  trainerId: number;
  assignedById: number;
  assignedAt: string;
}

interface CourseCardProps {
  course: CourseData;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const formattedDate = new Date(course.assignedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const navigate=useNavigate()
  return (
    <div className="group bg-white border border-gray-150 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-(--main-color) transition-all duration-300 flex flex-col justify-between relative overflow-hidden animate-[fadeIn_0.3s_ease-out]">
      {/* تأثير الشريط الجانبي عند التحويم بالماوس */}
      <div className="absolute top-0 left-0 w-1 h-full bg-(--main-color) transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />

      <div>
        {/* رأس الكارد: اسم الكورس و الكود المعرف له */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3 className="font-bold text-lg text-gray-900 break-words capitalize group-hover:text-(--main-color) transition-colors">
            {course.courseName}
          </h3>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-bold border border-gray-200 uppercase tracking-wider shrink-0">
            <BadgeIcon sx={{ fontSize: 14 }} />
            {course.courseCode}
          </span>
        </div>

        {/* 💡 الأزرار الجديدة: الطلاب والـ Sessions */}
        <div className="grid grid-cols-2 gap-3 my-5">
          <button
            onClick={() => navigate(`/courses/mycourses/student/${course.courseId}`)}
            className="flex items-center justify-center gap-2 py-2 px-3 border border-gray-100 bg-gray-50/60 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-100 rounded-xl text-gray-600 font-bold text-xs transition-all shadow-sm cursor-pointer"
          >
            <PeopleIcon sx={{ fontSize: 16 }} className="text-gray-400 group-hover:text-orange-500" />
            <span>Students</span>
          </button>

          <button
            onClick={() => console.log("Navigate to sessions for course:", course.courseId)}
            className="flex items-center justify-center gap-2 py-2 px-3 border
             border-gray-100 bg-gray-50/60 hover:bg-blue-50 hover:text-(--main-color) hover:border-blue-100 rounded-xl text-gray-600 font-bold text-xs transition-all shadow-sm cursor-pointer"
          >
            <ClassIcon sx={{ fontSize: 16 }} className="text-gray-400 group-hover:text-(--main-color)" />
            <span>Sessions</span>
          </button>
        </div>
      </div>

      {/* أسفل الكارد: التاريخ ورقم الكورس */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-500">
        <div className="flex items-center gap-1.5">
          <CalendarTodayIcon sx={{ fontSize: 14 }} className="text-gray-400" />
          <span>Assigned: {formattedDate}</span>
        </div>
        <span className="text-gray-400 font-medium">ID: #{course.courseId}</span>
      </div>
    </div>
  );
};