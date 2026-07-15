import React from "react";
import { useGetCourseTrainersQuery } from "../../../../../services/courses/Admin-courses/Course-Trainers/courseTrainersQuery";
interface CourseTraineesTabProps {
  courseId: number;
}

export const CourseTraineesTab: React.FC<CourseTraineesTabProps> = ({ courseId }) => {
    const {data,isLoading}=useGetCourseTrainersQuery({id:courseId})
    console.log("trainers",data)
  return (
    <div className="animate-[fadeIn_0.3s_ease-out] space-y-4">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Enrolled Trainees</h3>
          <p className="text-xs text-gray-400 mt-0.5">Monitor students registration and tracking logs for course ID: #{courseId}</p>
        </div>
      </div>

      {/* هنا نضع جدول الطلاب المسجلين وحالتهم المادية والحضور */}
      <div className="py-12 text-center border border-dashed rounded-2xl border-gray-200 bg-gray-50/30">
        <p className="text-gray-400 text-sm italic">Trainees list or data table will go here...</p>
      </div>
    </div>
  );
};