import { useParams, useNavigate } from "react-router-dom";
import { useGetOneRequestedCourseQuery } from "../../../services/request-courses/requests";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CategoryIcon from "@mui/icons-material/Category";
import LanguageIcon from "@mui/icons-material/Language";
import SchoolIcon from "@mui/icons-material/School";
import PlaceIcon from "@mui/icons-material/Place";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import HelpIcon from "@mui/icons-material/Help";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";

// دالة تنسيق التاريخ للقيم المقترحة
const formatDate = (dateValue?: string | null) => {
  if (!dateValue) return "Not Scheduled Yet";
  return new Date(dateValue).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// مكون فرعي صغير لعرض تفاصيل الكروت المكررة لتوفير مساحة ونظافة الكود
const DetailInfoCard = ({
  icon,
  label,
  value,
  isHighlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  isHighlight?: boolean;
}) => (
  <div className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${
    isHighlight 
      ? "bg-red-50/30 border-red-100/70" 
      : "bg-gray-50/50 border-gray-100 hover:shadow-sm"
  }`}>
    <div className={`p-2.5 rounded-xl flex items-center justify-center shrink-0 ${
      isHighlight ? "bg-red-50 text-(--color-watermelon)" : "bg-gray-100 text-gray-500"
    }`}>
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-400 font-bold mb-0.5 uppercase tracking-wider">{label}</p>
      <div className="text-sm text-gray-800 font-bold">
        {value || <span className="text-gray-300 font-normal italic">Not Specified</span>}
      </div>
    </div>
  </div>
);

export const OneRequestedCourse = () => {
  const { id } = useParams();
  const reqId = Number(id);
  const navigate = useNavigate();

  // استدعاء جلب البيانات المخصصة لهذا المعرّف
  const { data, isLoading, isError } = useGetOneRequestedCourseQuery({ id: reqId });
  
  // حماية جلب البيانات الأساسية سواء أرجعت كـ Object مباشر أو بداخل كبسولة data
  const requestData = data|| data;

  // ⏳ 1. معالجة حالة التحميل المتناسقة (Loading View)
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--color-watermelon)"></div>
      </div>
    );
  }

  // ⚠️ 2. معالجة حالة عدم العثور على الطلب أو خطأ سيرفر
  if (isError || !requestData) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 space-y-4">
        <div className="text-red-500 font-bold text-xl">Requested Course Proposal Not Found!</div>
        <p className="text-sm text-gray-400">The request ID #{reqId} doesn't exist or failed to fetch.</p>
        <button 
          onClick={() => navigate(-1)}
          className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const imageUrl = requestData.img ? `http://153.92.210.41:3000/${requestData.img}` : null;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-8 animate-[fadeIn_0.3s_ease-out]">
      
      {/* 1. منطقة الهيدر والتحكم السريع */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-3xl border border-gray-150 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)} 
              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              title="Back"
            >
              <ArrowBackIcon sx={{ fontSize: 18 }} />
            </button>
            <span className="text-xs font-bold text-gray-400">Proposal ID: #{requestData.id}</span>
            <span className={`px-3 py-0.5 rounded-full text-xs font-bold uppercase border ${
              requestData.status === "PENDING" ? "bg-amber-50 text-amber-700 border-amber-200" :
              requestData.status === "APPROVED" ? "bg-green-50 text-green-700 border-green-200" :
              "bg-red-50 text-red-700 border-red-200"
            }`}>
              {requestData.status}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-950 px-1">{requestData.title}</h1>
          <p className="text-gray-500 font-medium text-sm md:text-base px-1">{requestData.subTitle}</p>
        </div>

        {/* أزرار الإجراءات للتحكم بالطلب مباشرة من الداخل */}
        <div className="flex gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => alert(`Open update status modal for ID: ${requestData.id}`)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 bg-(--color-watermelon) hover:opacity-95 text-white rounded-xl transition-all font-bold text-xs shadow-sm"
          >
            <PublishedWithChangesIcon sx={{ fontSize: 16 }} />
            Update Status
          </button>
        </div>
      </div>

      {/* 2. توزيع المحتوى (Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* العمود الجانبي (الصورة + سبب الطلب الحرج باللغة العربية) */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="bg-white p-4 rounded-3xl border border-gray-150 shadow-sm">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={requestData.title}
                className="w-full h-auto rounded-2xl object-cover border"
              />
            ) : (
              <div className="w-full aspect-[4/3] rounded-2xl bg-gray-50 border border-dashed flex flex-col items-center justify-center text-gray-400 gap-1.5 p-4">
                <HelpIcon sx={{ fontSize: 36 }} className="opacity-40" />
                <span className="text-xs font-bold text-center">No Concept Poster</span>
              </div>
            )}
          </div>

          {/* صندوق حاجة الموظفين أو مبررات الطلب العربي */}
          {requestData.requestDescription && (
            <div className="bg-white p-5 rounded-3xl border border-red-100/70 shadow-sm space-y-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-(--color-watermelon)" />
              
              <div className="flex items-center gap-2 text-gray-800">
                <ChatBubbleIcon className="text-(--color-watermelon)" sx={{ fontSize: 18 }} />
                <h3 className="text-xs font-extrabold uppercase tracking-wider">Requested Reason</h3>
              </div>
              
              <p className="text-gray-700 leading-relaxed text-sm md:text-base font-medium italic p-3 bg-red-50/20 rounded-2xl border border-red-50/40" dir="rtl">
                "{requestData.requestDescription}"
              </p>
            </div>
          )}
        </div>

        {/* العمود الرئيسي لعرض داتا المتغيرات والبيانات */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm space-y-6">
            
            {/* نبذة عن الكورس */}
            <div>
              <h2 className="text-lg font-extrabold text-gray-900 mb-2">Request Description</h2>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                {requestData.description || <span className="text-gray-300 italic">No description provided for this proposal yet.</span>}
              </p>
            </div>

            {/* تصنيفات الباراميترز الأساسية */}
            <div>
              <h2 className="text-sm font-extrabold text-gray-400 uppercase tracking-wider mb-4">Course Parameters</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailInfoCard 
                  icon={<CategoryIcon />} 
                  label="Category" 
                  value={requestData.category?.name} 
                />
                <DetailInfoCard 
                  icon={<LanguageIcon />} 
                  label="Language" 
                  value={requestData.language?.name} 
                />
                <DetailInfoCard 
                  icon={<SchoolIcon />} 
                  label="Proposed Trainer" 
                  value={requestData.trainer?.name} 
                />
                <DetailInfoCard 
                  icon={<AccessTimeIcon />} 
                  label="Duration Hours" 
                  value={requestData.hours ? `${requestData.hours} Hours` : null} 
                />
              </div>
            </div>

            {/* الميزانية والمواعيد والمكان المستهدف */}
            <div>
              <h2 className="text-sm font-extrabold text-gray-400 uppercase tracking-wider mb-4">Schedule & Financials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailInfoCard 
                  icon={<MonetizationOnIcon />} 
                  label="Proposed Fee" 
                  value={requestData.proposedFee ? `${requestData.proposedFee.toLocaleString()} SYP` : null}
                  isHighlight={!!requestData.proposedFee}
                />
                <DetailInfoCard 
                  icon={<PlaceIcon />} 
                  label="Proposed Location" 
                  value={requestData.location} 
                />
                <DetailInfoCard 
                  icon={<ApartmentIcon />} 
                  label="Proposed Venue" 
                  value={requestData.venue} 
                />
                <DetailInfoCard 
                  icon={<EventIcon />} 
                  label="Proposed Timeline" 
                  value={requestData.startDate ? `${formatDate(requestData.startDate)} - ${formatDate(requestData.endDate)}` : null} 
                />
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};