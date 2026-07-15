import React from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import CategoryIcon from "@mui/icons-material/Category";
import CodeIcon from "@mui/icons-material/Code";
import PlaceIcon from "@mui/icons-material/Place";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LanguageIcon from "@mui/icons-material/Language";

interface CourseInfoTabProps {
  course: any; // يمكنكِ استبدال any بالـ Interface الخاص ببيانات الكورس لديكِ
}

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
    <div className="text-gray-600 bg-gray-100 p-2 rounded-xl flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
      <p className="text-base text-gray-900 font-semibold">{value || <span className="text-gray-400 font-normal">Not Specified</span>}</p>
    </div>
  </div>
);

export const CourseInfoTab: React.FC<CourseInfoTabProps> = ({ course }) => {
  return (
    <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
      {/* About Section */}
      {course.description && (
        <div className="bg-gray-50/50 rounded-2xl p-5 border border-gray-100">
          <div className="flex items-center gap-2 mb-3 text-gray-800">
            <DescriptionIcon className="text-(--color-watermelon)" />
            <h2 className="text-lg font-bold">About this course</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">{course.description}</p>
        </div>
      )}

      {/* General Info Grid */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4 px-1">General Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoCard icon={<CodeIcon />} label="Course Code" value={course.code} />
          <InfoCard icon={<CategoryIcon />} label="Category" value={course.categoryName} />
          <InfoCard icon={<MonetizationOnIcon />} label="Fee" value={`${course.fee?.toLocaleString()} SYP`} />
          <InfoCard icon={<AccessTimeIcon />} label="Hours" value={`${course.hours} Hours`} />
          <InfoCard icon={<PlaceIcon />} label="Location" value={course.locationName} />
          <InfoCard icon={<ApartmentIcon />} label="Venue" value={course.venueName} />
          <InfoCard icon={<LanguageIcon />} label="Language ID" value={course.languageId} />
        </div>
      </div>

      {/* Dates & Deadlines Grid */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4 px-1">Dates & Deadlines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoCard icon={<EventIcon />} label="Start Date" value={formatDate(course.startDate)} />
          <InfoCard icon={<EventAvailableIcon />} label="End Date" value={formatDate(course.endDate)} />
          <InfoCard icon={<EventIcon className="text-orange-500" />} label="Registration Deadline" value={formatDate(course.registrationDeadline)} />
          <InfoCard icon={<MonetizationOnIcon className="text-red-500" />} label="Payment Deadline" value={formatDate(course.paymentDeadline)} />
        </div>
      </div>
    </div>
  );
};