import { useParams, useNavigate } from "react-router-dom";
import { useGetOneCourseQuery } from "../../../services/courses/Admin-courses/coursesQuery";
import { useDelteCourseMutation } from "../../../services/courses/Admin-courses/coursesMutation";
import { ConfirmModal } from "../../../components/modals/ConfirmModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoryIcon from "@mui/icons-material/Category";
import CodeIcon from "@mui/icons-material/Code";
import PlaceIcon from "@mui/icons-material/Place";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import DescriptionIcon from "@mui/icons-material/Description";
import LanguageIcon from "@mui/icons-material/Language";
import { toast } from "react-toastify";
import { useState } from "react";

const formatDate = (dateValue?: string | Date | null) => {
  if (!dateValue) return "Not Specified";
  const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};


const InfoCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) => (
  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-sm transition-shadow">
    <div className="text-gray-600 bg-blue-100 p-2 rounded-lg flex items-center justify-center">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
      <p className="text-base text-gray-900 font-semibold">{value || <span className="text-gray-400 font-normal">Not Specified</span>}</p>
    </div>
  </div>
);

export const CourseDetails = () => {
  const { id } = useParams();
  const courseId = Number(id);
  const navigate = useNavigate();
  const [isOpenDelete,setIsOpenDelete]=useState(false)
  const [deleteCourse,{isSuccess}]=useDelteCourseMutation()
const handleDelete = async () => {
  try {
    await deleteCourse({ id: courseId }).unwrap();

    toast.success("Course Deleted Successfully");

    setIsOpenDelete(false);
    navigate("/courses", { replace: true });
  } catch (err: any) {
    const message = Array.isArray(err?.data?.message)
      ? err.data.message.join("\n")
      : err?.data?.message;

    toast.error(message || "Something went wrong");
  }
};
  const { data: course, isLoading } = useGetOneCourseQuery({ id: courseId });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!course) {
    return <div className="text-center text-red-500 mt-10 text-xl font-bold">Course not found!</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* 1. Header Section (Title, Status, Actions) */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        
        {/* Course Identity & Image */}
        <div className="flex items-center gap-6">
          {course.img ? (
            <img
              src={`https://oxford-lms.onrender.com/${course.img}`} // تأكدي من مسار الصورة حسب الـ Backend تبعك
              alt={course.title}
              className="w-24 h-24 rounded-2xl object-cover shadow-sm border"
            />
          ) : (
            <div className="w-24 h-24 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
              {/* Badges */}
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  course.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                {course.isActive ? "Active" : "Inactive"}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
                {course.status}
              </span>
            </div>
            <p className="text-gray-500 font-medium">{course.subTitle}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/courses/edit/${course.id}`)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-(--main-color) rounded-xl hover:bg-blue-100 transition-colors font-semibold"
          >
            <EditIcon fontSize="small" />
            Edit
          </button>
          <button
            onClick={() =>setIsOpenDelete(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-colors font-semibold"
          >
            <DeleteIcon fontSize="small" />
            Delete
          </button>
        </div>
      </div>

      {/* 2. Description Section */}
      {course.description && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4 text-gray-800">
            <DescriptionIcon className="text-(--color-watermelon)"  />
            <h2 className="text-xl font-bold">About this course</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">{course.description}</p>
        </div>
      )}

      {/* 3. General Information Grid */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 px-2">General Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoCard icon={<CodeIcon />} label="Course Code" value={course.code} />
          <InfoCard icon={<CategoryIcon />} label="Category" value={course.categoryName} />
          <InfoCard icon={<MonetizationOnIcon />} label="Fee" value={`${course.fee?.toLocaleString()} SYP`} />
          <InfoCard icon={<AccessTimeIcon />} label="Hours" value={`${course.hours} Hours`} />
          <InfoCard icon={<PlaceIcon />} label="Location" value={course.locationName} />
          {/* هنا معالجة الـ null باستخدام المكون اللي صممناه */}
          <InfoCard icon={<ApartmentIcon />} label="Venue" value={course.venueName} />
          <InfoCard icon={<LanguageIcon />} label="Language ID" value={course.languageId} />
        </div>
      </div>

      {/* 4. Dates & Deadlines Grid */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 px-2">Dates & Deadlines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoCard 
            icon={<EventIcon />} 
            label="Start Date" 
            value={formatDate(course.startDate)} 
          />
          <InfoCard 
            icon={<EventAvailableIcon />} 
            label="End Date" 
            value={formatDate(course.endDate)} 
          />
          <InfoCard 
            icon={<EventIcon className="text-orange-500" />} 
            label="Registration Deadline" 
            value={formatDate(course.registrationDeadline)} 
          />
          <InfoCard 
            icon={<MonetizationOnIcon className="text-red-500" />} 
            label="Payment Deadline" 
            value={formatDate(course.paymentDeadline)} 
          />
        </div>
      </div>
   <ConfirmModal
   open={isOpenDelete}
   onClose={()=>setIsOpenDelete(false)}
   onConfirm={handleDelete}
   />
    </div>
  );
};