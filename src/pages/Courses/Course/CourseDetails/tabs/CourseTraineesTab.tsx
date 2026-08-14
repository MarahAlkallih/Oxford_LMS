import React, { useState } from "react";
// 👇 استدعاء الـ Hooks الخاصة بالتسجيلات مع تمرير الـ courseId كفلتر
import { 
  useGetPendingRegistrationsQuery, 
  useGetAcceptedRegistrationsQuery, 
  useGetAllRegistrationsQuery 
} from "../../../../../services/courses/Admin-courses/course-registration/courseRegisterQuery"; 

// استيراد الجداول الثلاثة التي جهزناها في الخطوة السابقة
import { PendingRegistrations } from "../../CourseDetails/Registration/PendingRegistrations";
import { AcceptedRegistrations } from "../Registration/AcceptedRegistrations";
import { AllRegistrations } from "../Registration/AllRegistrations";

import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import { useNavigate } from "react-router-dom";

interface CourseTraineesTabProps {
  courseId: number;
}

export const CourseTraineesTab: React.FC<CourseTraineesTabProps> = ({ courseId }) => {
  
  const [activeSubTab, setActiveSubTab] = useState<"pending" | "accepted" | "all">("pending");
  

  const { data: pendingData, isLoading: loadingPending } = useGetPendingRegistrationsQuery({ courseId }, { skip: activeSubTab !== "pending" });
  const { data: acceptedData, isLoading: loadingAccepted } = useGetAcceptedRegistrationsQuery({ courseId }, { skip: activeSubTab !== "accepted" });
  const { data: allData, isLoading: loadingAll } = useGetAllRegistrationsQuery({ courseId }, { skip: activeSubTab !== "all" });
  const navigate=useNavigate()
  // فحص حالة التحميل للتاب الفرعي النشط حالياً
  const isSubLoading = 
    (activeSubTab === "pending" && loadingPending) ||
    (activeSubTab === "accepted" && loadingAccepted) ||
    (activeSubTab === "all" && loadingAll);


  const subTabsConfig = [
    { id: "pending", label: "Pending Queue", icon: <HourglassEmptyIcon sx={{ fontSize: 16 }} /> },
    { id: "accepted", label: "Accepted Class", icon: <HowToRegIcon sx={{ fontSize: 16 }} /> },
    { id: "all", label: "All Application Logs", icon: <HistoryToggleOffIcon sx={{ fontSize: 16 }} /> },
  ];

  return (
    <div className="animate-[fadeIn_0.3s_ease-out] space-y-6">
      
      {/* رأس سياق التاب الفرعي */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b pb-4 border-gray-100">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Enrolled Trainees Desk</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Manage incoming registration requests and audit financial invoices for Course ID: <span className="font-bold text-gray-700">#{courseId}</span>
          </p>
        </div>

        {/* 🌟 شريط التابات الفرعية (Sub-Tabs Navigation) على شكل Capsules ناعمة */}
        <div className="flex items-center gap-1.5 bg-gray-50 p-1.5 rounded-2xl border border-gray-150 self-start sm:self-auto">
          {subTabsConfig.map((subTab) => {
            const isSubActive = activeSubTab === subTab.id;
            return (
              <button
                key={subTab.id}
                onClick={() => setActiveSubTab(subTab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs transition-all outline-none whitespace-nowrap
                  ${isSubActive 
                    ? "bg-white text-(--main-color) shadow-sm border border-gray-100" 
                    : "text-gray-400 hover:text-gray-600"
                  }`}
              >
                {subTab.icon}
                {subTab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* مساحة عرض الجداول الديناميكية بناءً على اختيار التاب الفرعي الحالي */}
      <div className="min-h-[200px]">
        {isSubLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-9 w-9 border-b-2 border-(--main-color)"></div>
          </div>
        ) : (
          <div className="animate-[fadeIn_0.25s_ease-out]">
            {activeSubTab === "pending" && (
              <PendingRegistrations 
                data={pendingData|| pendingData || []} 
                onViewDetails={()=>navigate(`registration/${pendingData?.map((item)=>item.id)}`)}
              />
            )}

            {activeSubTab === "accepted" && (
              <AcceptedRegistrations 
                  data={acceptedData || acceptedData || []} 
                             />
            )}

            {activeSubTab === "all" && (
              <AllRegistrations 
                data={allData|| allData || []} 
              />
            )}
          </div>
        )}
      </div>

    </div>
  );
};