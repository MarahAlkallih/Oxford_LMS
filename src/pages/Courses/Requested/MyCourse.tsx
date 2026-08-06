import React from "react";
import { useGetMyCourseQuery } from "../../../services/courses/Admin-courses/Course-Trainers/myCourses";
import SchoolIcon from "@mui/icons-material/School";
import { CourseCard } from "../../../components/Course/Request/MyCourseCard"; // 1. استيراد المكون الجديد هنا

export const MyCoursesPage = () => {
  const { data, isLoading } = useGetMyCourseQuery(undefined);

 
  if (isLoading) {
    return (
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((n) => (
          <div key={n} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
            <div className="h-10 bg-gray-100 rounded-xl w-full pt-2"></div>
          </div>
        ))}
      </div>
    );
  }


  if (!data || data.length === 0) {
    return (
      <div className="mx-6 my-12 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50 py-16">
        <SchoolIcon className="mb-2 text-gray-300" sx={{ fontSize: 40 }} />
        <p className="text-base font-semibold text-gray-600">No courses assigned to you yet.</p>
        <p className="text-xs text-gray-400 mt-1">When an admin assigns you to a course, it will appear here.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <SchoolIcon className="text-(--main-color)" />
        My Assigned Courses ({data.length})
      </h1>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((course: any) => (
        
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};