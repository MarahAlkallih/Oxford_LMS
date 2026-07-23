import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetStudentQuery } from "../../../services/courses/Admin-courses/Course-Trainers/myCourses";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PeopleIcon from "@mui/icons-material/People";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";

// 1. تعريف واجهة بيانات الطالب
interface Student {
  id: number;
  userId: number;
  courseId: number;
  courseRegistrationId: number;
  studentName: string;
  courseName: string;
}

export const StudentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const courseId = Number(id);

  const { data: students, isLoading } = useGetStudentQuery({ courseId });
  const [searchTerm, setSearchTerm] = useState("");

  // جلب اسم الكورس من أول عنصر متاح (إذا كان موجوداً)
  const courseName = students && students.length > 0 ? students[0].courseName : "";

  // تصفية الطلاب بناءً على محرك البحث بالاسم أو الـ ID
  const filteredStudents = students?.filter((student: Student) =>
    student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.userId.toString().includes(searchTerm)
  );

  // 2. حالة التحميل (Skeleton Loader)
  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <div className="h-8 bg-gray-200 rounded-md w-1/4 animate-pulse"></div>
        <div className="h-12 bg-gray-100 rounded-2xl animate-pulse"></div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm animate-pulse space-y-3">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-10 bg-gray-100 rounded-xl w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* 3. الهيدر وزر العودة */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-all cursor-pointer shadow-sm"
            title="Go Back"
          >
            <ArrowBackIcon fontSize="small" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <PeopleIcon className="text-(--main-color)" />
              Enrolled Students
            </h1>
            {courseName && (
              <p className="text-xs font-semibold text-gray-500 mt-0.5 flex items-center gap-1">
                <SchoolIcon sx={{ fontSize: 14 }} /> Course: {courseName}
              </p>
            )}
          </div>
        </div>

        {/* شارة عدد الطلاب */}
        <span className="inline-flex items-center justify-center px-3 py-1 bg-gray-100 text-gray-700 font-bold text-xs rounded-full self-start sm:self-auto">
          Total: {students?.length || 0}
        </span>
      </div>

      {/* 4. شريط البحث */}
      <div className="relative max-w-md">
        <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" sx={{ fontSize: 20 }} />
        <input
          type="text"
          placeholder="Search by student name or user ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-(--main-color) transition-all shadow-sm"
        />
      </div>

  
      {!students || students.length === 0 ? (
        <div className="text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50 py-16">
          <PeopleIcon className="mb-2 text-gray-300" sx={{ fontSize: 44 }} />
          <p className="text-base font-semibold text-gray-600">No students enrolled yet.</p>
          <p className="text-xs text-gray-400 mt-1">Students registered in this course will appear here.</p>
        </div>
      ) : filteredStudents?.length === 0 ? (
    
        <div className="text-center text-gray-400 py-12 bg-white rounded-2xl border border-gray-150">
          <p className="text-sm font-semibold text-gray-600">No students match your search.</p>
        </div>
      ) : (
     
        <div className="overflow-x-auto rounded-2xl border border-gray-150 shadow-sm bg-white animate-[fadeIn_0.2s_ease-out]">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-150 text-gray-500 font-bold">
                <th className="p-4"># ID</th>
                <th className="p-4">Student Name</th>
                <th className="p-4">User ID</th>
                <th className="p-4">Registration ID</th>
                <th className="p-4">Course</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-semibold text-gray-800">
              {filteredStudents?.map((student: Student) => (
                <tr key={student.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="p-4 text-gray-400">#{student.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2.5">
                      {/* دائرة اسم الطالب كرمز آفتار */}
                      <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                        {student.studentName.charAt(0)}
                      </div>
                      <span className="text-gray-900 capitalize">{student.studentName}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-500 font-medium">#USR-{student.userId}</td>
                  <td className="p-4 text-gray-500 font-medium">#REG-{student.courseRegistrationId}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-100">
                      {student.courseName}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};