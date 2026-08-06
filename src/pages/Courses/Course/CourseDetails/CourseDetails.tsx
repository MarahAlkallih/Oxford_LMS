import { useParams, useNavigate } from "react-router-dom";
import { useGetOneCourseQuery } from "../../../../services/courses/Admin-courses/coursesQuery";
import { useDelteCourseMutation } from "../../../../services/courses/Admin-courses/coursesMutation";
import { ConfirmModal } from "../../../../components/modals/ConfirmModal";
import { EditIcon, DeleteIcon } from "../../../../components/Icons/index";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import InfoIcon from "@mui/icons-material/Info";
import ClassIcon from "@mui/icons-material/Class";
import { toast } from "react-toastify";
import { useState } from "react";

// 🌟 استيراد مكونات التابات
import { CourseInfoTab } from "./tabs/CourseInfoTab";
import { CourseTrainersTab } from "./tabs/CourseTrainersTab";
import { CourseTraineesTab } from "./tabs/CourseTraineesTab";
import { SessionsPage } from "./tabs/CourseSessions";
import { CourseMediaTab } from "./tabs/MediaTab";

export const CourseDetails = () => {
  const { id } = useParams();
  const courseId = Number(id);
  const navigate = useNavigate();
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [deleteCourse] = useDelteCourseMutation();

  const role = localStorage.getItem("adminRoles");
  const [activeTab, setActiveTab] = useState<string>("details");

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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--color-watermelon)"></div>
      </div>
    );
  }

  if (!course) {
    return <div className="text-center text-red-500 mt-10 text-xl font-bold">Course not found!</div>;
  }

  // 1️⃣ تصفية التابات: إضافة تاب الميديا فقط إذا لم يكن الرول ATTENDANCE
  const tabsConfig = [
    { id: "details", label: "Course Details", icon: <InfoIcon fontSize="small" /> },
    { id: "trainers", label: "Trainers Team", icon: <SchoolIcon fontSize="small" /> },
    { id: "trainees", label: "Registered Trainees", icon: <GroupIcon fontSize="small" /> },
    { id: "sessions", label: "Sessions", icon: <ClassIcon fontSize="small" /> },
    ...(role !== "ATTENDANCE"
      ? [{ id: "media", label: "Course Media", icon: <PermMediaIcon fontSize="small" /> }]
      : []),
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* 1. Header Area */}
      <div className="bg-(--light2-color) rounded-3xl p-6 shadow-sm border border-gray-400 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-6">
          {course.img ? (
            <img
              src={`http://153.92.210.41:3000/${course.img}`}
              alt={course.title}
              className="w-24 h-24 rounded-2xl object-cover shadow-sm border"
            />
          ) : (
            <div className="w-24 h-24 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-sm">
              No Image
            </div>
          )}

          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-950">{course.title}</h1>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  course.isActive
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {course.isActive ? "Active" : "Inactive"}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-(--color-watermelon-dark) border border-purple-100">
                {course.status}
              </span>
            </div>
            <p className="text-gray-500 font-medium">{course.subTitle}</p>
          </div>
        </div>

        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => navigate(`edit`)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 text-(--main-color) border border-gray-200 rounded-xl hover:bg-gray-100 transition-all font-bold text-sm"
          >
            <EditIcon color="#ff4d1c" size={24} />
            Edit
          </button>
          <button
            onClick={() => setIsOpenDelete(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-xl hover:bg-red-100 transition-all font-bold text-sm"
          >
            <DeleteIcon size={24} />
            Delete
          </button>
        </div>
      </div>

      {/* 2. Glowing Tabs Indicator Container */}
      <div className="flex border-b border-gray-200 gap-2 overflow-x-auto pb-px">
        {tabsConfig.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 font-bold text-sm rounded-t-2xl transition-all duration-300 relative outline-none whitespace-nowrap
                ${
                  isActive
                    ? "text-(--color-watermelon) bg-white border-t border-x border-gray-200 shadow-[0_-4px_12px_rgba(239,68,68,0.06)]"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50/50"
                }`}
            >
              {tab.icon}
              {tab.label}

              {isActive && (
                <span className="absolute -bottom-px left-0 right-0 h-0.75 bg-(--color-watermelon) rounded-full shadow-[0_0_10px_2px_rgba(239,68,68,0.5)] animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Tab Contents Area */}
      <div className="bg-(--light2-color) rounded-3xl p-6 shadow-sm border border-gray-400 min-h-75">
        {activeTab === "details" && <CourseInfoTab course={course} />}
        {activeTab === "trainers" && <CourseTrainersTab courseId={courseId} />}
        {activeTab === "trainees" && <CourseTraineesTab courseId={courseId} />}
        {activeTab === "sessions" && <SessionsPage courseId={courseId} />}
        {activeTab === "media" && role !== "ATTENDANCE" && (
          <CourseMediaTab courseId={courseId} />
        )}
      </div>
      <ConfirmModal
        open={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        onConfirm={handleDelete}
      /> 
    </div>
  );
};
{/* */}