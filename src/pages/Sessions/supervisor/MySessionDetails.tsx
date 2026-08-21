import { useParams } from "react-router-dom";
import { useGetSuperSessionQuery } from "../../../services/sessions/supervisor/supervisor/sessionsQuery";
import { SessionDetailsSidebar } from "./SessionDetailsSidebar";
import { SupervisorSessionAttendance } from "./SessionJoinRequestsSection";

export const MySessionDetails = () => {
  const { sessionId } = useParams();
  const id = Number(sessionId);
  const { courseId } = useParams();
  const courseIdNum = Number(courseId);
  const { data, isLoading } = useGetSuperSessionQuery({});

  // جلب معلومات الجلسة المحددة
  const currentSession = data?.find((s: any) => s.sessionId === id) || data?.[0];
  const sessionData = currentSession
    ? {
        ...currentSession,
        date:
          currentSession.date instanceof Date
            ? currentSession.date.toISOString()
            : currentSession.date,
        startTime:
          currentSession.startTime instanceof Date
            ? currentSession.startTime.toISOString()
            : currentSession.startTime,
        endTime:
          currentSession.endTime instanceof Date
            ? currentSession.endTime.toISOString()
            : currentSession.endTime,
      }
    : undefined;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-(--main-color)"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Session Details
        </h1>
      </div>

      {/* Layout Grid: 8 Cols (Main Area) + 4 Cols (Sidebar Details) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Large Section (Main - Join Requests) */}
        <div className="lg:col-span-8 order-2 lg:order-1">
          <SupervisorSessionAttendance sessionId={id} courseId={courseIdNum}  />
        </div>

        {/* Small Section (Sidebar - Details) */}
        <div className="lg:col-span-4 order-1 lg:order-2">
          <SessionDetailsSidebar sessionData={sessionData} />
        </div>
      </div>
    </div>
  );
};