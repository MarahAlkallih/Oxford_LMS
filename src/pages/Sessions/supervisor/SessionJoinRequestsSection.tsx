import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { SessionOnsiteAttendance } from "../../Courses/Course/CourseDetails/tabs/session/SessionOnsiteAttendance";
import { SessionJoinRequests } from "../../Courses/Course/CourseDetails/tabs/session/SessionJoinRequests";

interface SupervisorSessionAttendanceProps {
  sessionId?: number;
  courseId?: number;
}

export const SupervisorSessionAttendance = ({
  sessionId: propsSessionId,
  courseId: propsCourseId,
}: SupervisorSessionAttendanceProps) => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // استخراج الـ IDs من الـ Props أو من الـ URL Parameters
  const sessionId = propsSessionId || Number(params.sessionId) || 0;
  const courseId = propsCourseId || Number(params.courseId) ;

  // معرفة وضع العرض الحالي من المسار (الراوت) أو التبديل الداخلي
  const isOnlineRoute = location.pathname.includes("online");
  const [activeTab, setActiveTab] = useState<"onsite" | "online">(
    isOnlineRoute ? "online" : "onsite"
  );

  const handleTabChange = (tab: "onsite" | "online") => {
    setActiveTab(tab);
    // إذا كنت تستخدم التوجيه التفرعي داخل الراوتر
    if (location.pathname.includes("/sessions/")) {
      navigate(`../${tab}`, { relative: "path" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub-Navigation Tabs (Onsite / Online) */}
      <div className="flex items-center gap-2 p-1.5 bg-gray-100/80 rounded-2xl w-fit border border-gray-200">
        <button
          type="button"
          onClick={() => handleTabChange("onsite")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "onsite"
              ? "bg-white text-gray-900 shadow-sm border border-gray-200/60"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <SchoolIcon
            fontSize="small"
            className={activeTab === "onsite" ? "text-(--main-color)" : ""}
          />
          Onsite Attendance
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("online")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "online"
              ? "bg-white text-gray-900 shadow-sm border border-gray-200/60"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <GroupAddIcon
            fontSize="small"
            className={activeTab === "online" ? "text-(--main-color)" : ""}
          />
          Online Join Requests
        </button>
      </div>

      {/* Dynamic View Rendering */}
      <div>
        {activeTab === "onsite" ? (
          <SessionOnsiteAttendance sessionId={sessionId} courseId={courseId} />
        ) : (
          <SessionJoinRequests sessionId={sessionId} />
        )}
      </div>
    </div>
  );
};