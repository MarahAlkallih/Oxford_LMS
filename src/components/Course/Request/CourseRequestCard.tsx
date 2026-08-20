import React from "react";
import type { CourseRequest } from "../../../types/courseRequest"; // مسار الـ Interface الخاص بكِ
import VisibilityIcon from "@mui/icons-material/Visibility";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import CategoryIcon from "@mui/icons-material/Category";
import LanguageIcon from "@mui/icons-material/Language";
import SchoolIcon from "@mui/icons-material/School";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { BACKEND_URL } from "../../../config/env";

interface CourseRequestCardProps {
  request: CourseRequest;
  onViewDetails: (id: number) => void;
  onUpdateStatus: (request: CourseRequest) => void;
}

// دالة لتنسيق شارات الحالة (Status Badges)
const getStatusBadge = (status: string) => {
  switch (status?.toUpperCase()) {
    case "PENDING":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "APPROVED":
    case "ACCEPTED":
      return "bg-green-50 text-green-700 border-green-200";
    case "REJECTED":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

export const CourseRequestCard: React.FC<CourseRequestCardProps> = ({
  request,
  onViewDetails,
  onUpdateStatus,
}) => {
  const imageUrl = request.img ? `${BACKEND_URL}/${request.img}` : null;

  return (
    <div className="bg-white rounded-3xl border border-gray-150 p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group">
      
      {/* القسم العلوي: الصورة + البيانات الأساسية */}
      <div className="space-y-4">
        <div className="relative">
          {/* صورة الطلب المقترح أو افتراضية ناعمة */}
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={request.title}
              className="w-full h-44 rounded-2xl object-cover border border-gray-100 shadow-[2px_2px_12px_rgba(0,0,0,0.02)]"
            />
          ) : (
            <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 gap-2">
              <CategoryIcon className="opacity-40" sx={{ fontSize: 32 }} />
              <span className="text-xs font-semibold">No Design Image Provided</span>
            </div>
          )}

          {/* شارة الحالة العائمة فوق الكارد */}
          <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(request.status)}`}>
            {request.status}
          </span>
        </div>

        {/* العناوين والوصف المقتضب */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            {request.category && (
              <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-100">
                {request.category.name}
              </span>
            )}
            {request.language && (
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-100 flex items-center gap-1">
                <LanguageIcon sx={{ fontSize: 12 }} />
                {request.language.name}
              </span>
            )}
          </div>
          <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-(--color-watermelon) transition-colors truncate">
            {request.title}
          </h3>
          <p className="text-sm text-gray-400 font-medium truncate">{request.subTitle}</p>
        </div>

        {/* سبب الطلب (مقتطع منه إذا كان طويلاً) */}
        {request.requestDescription && (
          <div className="bg-red-50/20 rounded-xl p-3 border border-red-50/50 relative">
            <p className="text-xs text-gray-600 italic line-clamp-2 leading-relaxed flex gap-1.5" dir="rtl">
              <ChatBubbleIcon className="text-(--color-watermelon) shrink-0 rotate-180" sx={{ fontSize: 14 }} />
              "{request.requestDescription}"
            </p>
          </div>
        )}

        {/* تفاصيل المدرب */}
        {request.trainer && (
          <div className="flex items-center gap-2 pt-1">
            <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0 border">
              <SchoolIcon sx={{ fontSize: 14 }} />
            </div>
            <div className="text-xs truncate">
              <span className="text-gray-400">Proposed Trainer: </span>
              <span className="font-bold text-gray-700">{request.trainer.name}</span>
            </div>
          </div>
        )}
      </div>

      {/* القسم السفلي: أزرار التفاعل */}
      <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-gray-100">
        
        {/* زر عرض التفاصيل (أبيض ناعم مع بوردر) */}
        <button
          onClick={() => onViewDetails(request.id)}
          className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gray-50 text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-all font-bold text-xs"
        >
          <VisibilityIcon sx={{ fontSize: 16 }} />
          Details
        </button>

        {/* زر تعديل الحالة ملون بهوية البطيخي الزاهية */}
        <button
          onClick={() => onUpdateStatus(request)}
          className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-(--color-watermelon) hover:opacity-95 text-white rounded-xl transition-all font-bold text-xs shadow-sm"
        >
          <PublishedWithChangesIcon sx={{ fontSize: 16 }} />
          Update Status
        </button>

      </div>
    </div>
  );
};