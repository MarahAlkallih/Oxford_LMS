import React, { useState } from "react";
import { useGetCourseTrainersQuery } from "../../../../../services/courses/Admin-courses/Course-Trainers/courseTrainersQuery";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Delete from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import { AssignCourseTrainerModal } from "../../../../../components/Course/CourseTrainer";
interface CourseTrainersTabProps {
  courseId: number;
}


const formatAssignmentDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// دالة لجلب الحرف الأول من اسم المدرب للأفاتار
const getInitials = (name: string) => {
  if (!name) return "TR";
  return name.trim().split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
};

export const CourseTrainersTab: React.FC<CourseTrainersTabProps> = ({ courseId }) => {
  const { data, isLoading, isError } = useGetCourseTrainersQuery({ id: courseId });
  const [isOpenAssign,setIsOpenAssign]=useState(false)
  
  const trainersList = data || [];
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-gray-100 rounded-xl w-1/3 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="p-5 border border-gray-100 rounded-2xl bg-gray-50/50 flex gap-4 items-center animate-pulse">
              <div className="w-12 h-12 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }


  if (isError) {
    return (
      <div className="py-12 text-center text-red-500 font-medium">
        Failed to load trainers. Please try again later.
      </div>
    );
  }

  return (
    <div className="animate-[fadeIn_0.3s_ease-out] space-y-6">
      
      {/* الـ Header الخاص بالتاب */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-950 flex items-center gap-2">
            <SchoolIcon className="text-(--color-watermelon)" fontSize="small" />
            Course Trainers ({trainersList.length})
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">Instructors legally authorized to manage and teach this course.</p>
        </div>
        
        <button 
        onClick={()=>setIsOpenAssign(true)}
        className="bg-(--color-watermelon) cursor-pointer hover:opacity-95 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm shrink-0">
          + Assign New Trainer
        </button>
      </div>

   
      {trainersList.length === 0 ? (
        <div className="py-16 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50 max-w-xl mx-auto flex flex-col items-center justify-center p-6">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 mb-4">
            <PersonIcon fontSize="large" />
          </div>
          <h4 className="text-base font-bold text-gray-800 mb-1">No Trainers Assigned Yet</h4>
          <p className="text-sm text-gray-400 max-w-xs mb-5">This course doesn't have any assigned trainers. Start adding team members to get started.</p>
          <button className="text-xs font-bold text-(--color-watermelon) bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition-colors">
            Assign First Trainer
          </button>
        </div>
      ) : (
        
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trainersList.map((trainer: any) => (
            <div 
              key={trainer.id} 
              className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-200 transition-all flex items-start gap-4 relative group"
            >
              {/* الأركان الجمالية والأفاتار المولّد ديناميكياً */}
              <div className="w-12 h-12 rounded-xl bg-red-50 text-(--color-watermelon) font-bold text-sm flex items-center justify-center shrink-0 border border-red-100/50 shadow-sm">
                {getInitials(trainer.trainerName)}
              </div>

              <div className="space-y-1 pr-6 flex-1">
                <h4 className="text-base font-bold text-gray-900 group-hover:text-(--color-watermelon) transition-colors truncate">
                  {trainer.trainerName}
                </h4>
                
                {/* تاريخ الإسناد */}
                <p className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                  <CalendarMonthIcon className="text-gray-350" sx={{ fontSize: 14 }} />
                  Assigned: {formatAssignmentDate(trainer.assignedAt)}
                </p>

                <div className="pt-2">
                  <span className="inline-block text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                    ID: #{trainer.trainerId}
                  </span>
                </div>
              </div>

              {/* زر حذف أو فك ارتباط المدرب - يظهر بشكل ناعم عند تمرير الماوس */}
              <button 
                title="Remove Trainer"
                className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
              >
                <Delete sx={{ fontSize: 18 }} />
              </button>

            </div>
          ))}
        </div>
      )}
      <AssignCourseTrainerModal
      open={isOpenAssign}
      onClose={()=>setIsOpenAssign(false)}

      courseId={courseId}
      />
    </div>
  );
};