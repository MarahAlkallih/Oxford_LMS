import { useState } from "react";
// 👇 استبدلي هذه بالـ Hooks الحقيقية المستوردة من ملفات الـ services لديكِ
import { 
  useGetAllRegistrationsQuery, 
  useGetPendingRegistrationsQuery, 
  useGetAcceptedRegistrationsQuery 
} from "../../../../../services/courses/Admin-courses/course-registration/courseRegisterQuery"; 

import { PendingRegistrations } from "./PendingRegistrations";
import { AcceptedRegistrations } from "./AcceptedRegistrations";
import { AllRegistrations } from "./AllRegistrations";

import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate, useParams } from "react-router-dom";

export const RegistrationPage = () => {
  const [activeTab, setActiveTab] = useState<"pending" | "accepted" | "all">("pending");
   const {id}=useParams()
   const courseId=Number(id)
   const navigate=useNavigate()
  // 1. استدعاءات الـ API المستقلة لكل تاب
  const { data: allData, isLoading: loadingAll } = useGetAllRegistrationsQuery({courseId:courseId}, { skip: activeTab !== "all" });
  const { data: pendingData, isLoading: loadingPending } = useGetPendingRegistrationsQuery({courseId:courseId}, { skip: activeTab !== "pending" });
  const { data: acceptedData, isLoading: loadingAccepted } = useGetAcceptedRegistrationsQuery({courseId:courseId}, { skip: activeTab !== "accepted" });


  const currentLoading = 
    (activeTab === "pending" && loadingPending) ||
    (activeTab === "accepted" && loadingAccepted) ||
    (activeTab === "all" && loadingAll);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      
      {/* رأس الصفحة */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-950 flex items-center gap-2">
          <AssignmentIcon className="text-(--color-watermelon)" />
          Course Registrations Desk
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Monitor incoming student applications, manage pending queue, and view official class enrollments.
        </p>
      </div>

      {/* شريط التبويبات (Tabs Layout) المتناسق مع الهوية البطيخية البراقة */}
      <div className="flex border-b border-gray-250 gap-2 overflow-x-auto pb-px">
        {[
          { id: "pending", label: "Pending Queue" },
          { id: "accepted", label: "Accepted Class" },
          { id: "all", label: "All Logs" },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 font-bold text-sm rounded-t-2xl transition-all duration-200 relative outline-none whitespace-nowrap
                ${isActive 
                  ? "text-(--color-watermelon) bg-white border-t border-x border-gray-200 shadow-[0_-4px_12px_rgba(239,68,68,0.04)]" 
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50/50"
                }`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute -bottom-px left-0 right-0 h-[3px] bg-(--color-watermelon) rounded-full shadow-[0_0_8px_1px_rgba(239,68,68,0.4)]" />
              )}
            </button>
          );
        })}
      </div>

      {/* مساحة العرض الديناميكية بحسب التاب الحالي وحالة التحميل */}
      <div className="min-h-62.5">
        {currentLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-(--color-watermelon)"></div>
          </div>
        ) : (
          <>
            {activeTab === "pending" && (
              <PendingRegistrations 
                                  data={pendingData || pendingData || []} 
                                  onViewDetails={function (id: number): void {
                                      throw new Error("Function not implemented.");
                                  } }                
              />
            )}
            
            {activeTab === "accepted" && (
              <AcceptedRegistrations 
                                  data={acceptedData || acceptedData || []}             />
            )}
            
            {activeTab === "all" && (
              <AllRegistrations 
                data={allData || allData || []} 
              />
            )}
          </>
        )}
      </div>

    </div>
  );
};