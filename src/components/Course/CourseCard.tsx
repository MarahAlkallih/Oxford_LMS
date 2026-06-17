import ImageIcon from "@mui/icons-material/Image";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";
import type { Course } from "../../types/Course";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useActiveCourseMutation } from "../../services/courses/Admin-courses/coursesMutation";
import { toast } from "react-toastify";
interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
    const navigate=useNavigate();
    const [isOn, setIsOn] = useState(false);
    const toggleSwitch = () => setIsOn(!isOn);
    const [toggle,{isLoading}]=useActiveCourseMutation();
    const handelToggle=async()=>{
        try{
             const res=await toggle({ id: course.id }).unwrap();
              console.log(res)
              toast.success("Course activated successfully!")
            
            }
              catch{
               
              }
       
    }
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
      
      {/* IMAGE */}
      <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
        {course.img ? (
          <img
            src={`http://153.92.210.41:3000/${course.img}`}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center text-gray-400">
            <ImageIcon sx={{ fontSize: 60 }} />
            <span>No Image</span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4">

        <div className="flex justify-between items-start">
          <h2 className="font-bold text-lg text-gray-800">
            {course.title}
          </h2>

          <span
            className={`px-2 py-1 text-xs rounded-full
            ${
              course.status === "UPCOMING"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {course.status}
          </span>
        </div>

        {course.subTitle && (
          <p className="text-sm text-gray-500 mt-1">
            {course.subTitle}
          </p>
        )}

        <div className="mt-4 space-y-2 text-sm text-gray-600">

          <div className="flex items-center gap-2">
            <SchoolIcon fontSize="small" />
            <span>{course.categoryName}</span>
          </div>

          <div className="flex items-center gap-2">
            <LocationOnIcon fontSize="small" />
            <span>{course.venueName || "Online"}</span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarMonthIcon fontSize="small" />
            <span>
              {new Date(course.startDate!).toLocaleDateString()}
            </span>
          </div>

        </div>

        <div className="mt-4 flex justify-between items-center">

          <span className="font-bold text-green-600">
            ${course.fee}
          </span>
          <div>
            {isLoading ? <p>Loading..</p> : null}
            {!course.isActive ? 
            <div
    onClick={async () => {
  toggleSwitch();
  await handelToggle();
}}
      className={`relative inline-flex h-8 w-14 cursor-pointer items-center rounded-full transition-colors duration-300 ease-in-out ${
        isOn ? "bg-(--color-watermelon)" : "bg-gray-300"
      }`}
    >
      {/* الدائرة البيضاء المتحركة */}
      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out ${
          isOn ? "translate-x-7" : "translate-x-1"
        }`}
      />
    </div>:
     <button onClick={()=>navigate(`${course.id}`)}
            className="px-4 py-2 rounded-lg bg-[#4B5945] text-white hover:opacity-90 cursor-pointer"
          >
            Details
          </button>
        }
          </div>
         

        </div>
      </div>
    </div>
  );
};