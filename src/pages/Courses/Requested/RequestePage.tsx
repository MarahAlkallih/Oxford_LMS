import { useGetRequestsQuery } from "../../../services/request-courses/requests"
import { CourseRequestCard } from "../../../components/Course/Request/CourseRequestCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EditReqModal } from "../../../components/Course/Request/EditRequest";

export const RequestedCoursePage = () => {
    const [isOpenEdit,setIsOpenEdit]=useState(false)
    const[selectedId,setSelectedId]=useState(0)
    const navigate=useNavigate()
  // 1. استدعاء الـ API لجلب الطلبات
  const { data: requests, isLoading, isError } = useGetRequestsQuery();

  // 🔍 استخراج مصفوفة البيانات بأمان (بناءً على بنية الداتا { data: [...] })
  const requestsList = requests || [];

  // ⚙️ توابع الأحداث المطلوبة من قبل كارت الطلبات
  const handleViewDetails = (id: number) => {
    console.log("Details clicked for request ID:", id);
    navigate(`${id}`)
   
  };

  const handleUpdateStatus = (request: any) => {
    console.log("Update status clicked for request:", request);
    // هنا منطق فتح مودال تعديل الحالة
  };

  // ⏳ 1. حالة التحميل (Loading) باستخدام كروت رمادية ناعمة ومتحركة
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="h-8 bg-gray-100 rounded-xl w-1/4 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="p-5 border border-gray-150 rounded-3xl bg-white space-y-4 animate-pulse">
              <div className="w-full h-44 bg-gray-100 rounded-2xl" />
              <div className="h-6 bg-gray-100 rounded w-3/4" />
              <div className="h-4 bg-gray-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ⚠️ 2. حالة حدوث خطأ أثناء الجلب
  if (isError) {
    return (
      <div className="py-20 text-center text-red-500 font-bold text-lg">
        Failed to load requested courses. Please try again later.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 animate-[fadeIn_0.3s_ease-out]">
      
      {/* 3. الهيدر الخاص بالصفحة مع العداد التلقائي */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-950">
            Requested Courses
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Explore and review custom course proposals requested by staff or trainers.
          </p>
        </div>
        
        {/* شارة عدد الطلبات الكلي متناسقة مع لون البطيخي */}
        <span className="bg-red-50 text-(--color-watermelon) font-bold text-xs px-4 py-2 rounded-full border border-red-100">
          Total Requests: {requestsList.length}
        </span>
      </div>

      {/* 4. عرض الكروت أو إظهار رسالة إذا كانت القائمة فارغة */}
      {requestsList.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-gray-250 rounded-3xl bg-gray-50/50 max-w-xl mx-auto p-6">
          <h3 className="text-lg font-bold text-gray-800">No Request Proposals Found</h3>
          <p className="text-sm text-gray-400 mt-1">There are no custom course requests to display at the moment.</p>
        </div>
      ) : (
        /* شبكة عرض الكروت الجذابة */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requestsList.map((request: any) => (
            <CourseRequestCard
              key={request.id}
              request={request}
              onViewDetails={handleViewDetails}
              onUpdateStatus={()=>{setIsOpenEdit(true); setSelectedId(request.id)}}
            />
          ))}
        </div>
      )}
    <EditReqModal open={isOpenEdit} onClose={()=>setIsOpenEdit(false)} id={selectedId}    
    />
    </div>
  );
};