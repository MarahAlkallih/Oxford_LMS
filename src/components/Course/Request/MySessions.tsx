import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetSessionQuery } from "../../../services/sessions/admin/sessionsQuery";
import { useGetWeekSessionQuery } from "../../../services/sessions/trainer/trainerSessionQuery";
import { SessionCard, type SessionItem } from "../../../components/Sessions/Session/SessionCard"; // استيراد كارد السيشنات
import { Supervisors } from "../../../components/Const/AdminsModal"; // استيراد مودال المشرفين

import ClassIcon from "@mui/icons-material/Class";
import DateRangeIcon from "@mui/icons-material/DateRange";
import EventIcon from "@mui/icons-material/Event";

export const MySessionsPage = () => {
  const { id } = useParams();
  const courseId = Number(id);
  const navigate = useNavigate();

  // 1. حالة التاب النشط
  const [activeTab, setActiveTab] = useState<"all" | "weekly">("all");

  // 2. حالة مودال المشرفين
  const [isOpenAddSuper, setIsOpenAddSuper] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<number>(0);

  // 3. استدعاء الـ Queries
  const { data: allCourse, isLoading: isAll } = useGetSessionQuery({ id: courseId });
  const { data: weekly, isLoading: isWeek } = useGetWeekSessionQuery({});

  // 4. تحديد البيانات وحالة التحميل بناءً على التاب الحالي
  const isLoading = activeTab === "all" ? isAll : isWeek;
  const normalizeSessions = (sessions: any[] | undefined): SessionItem[] =>
    (sessions || []).map((s) => ({
      ...s,
      startTime:
        typeof s.startTime === "string"
          ? s.startTime
          : s.startTime instanceof Date
          ? s.startTime.toISOString()
          : String(s.startTime),
    } as SessionItem));

  const currentSessions: SessionItem[] =
    activeTab === "all" ? normalizeSessions(allCourse) : normalizeSessions(weekly);

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-150 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-(--main-color)/10 text-(--main-color) flex items-center justify-center font-bold">
            <ClassIcon />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Trainer Sessions</h2>
            <p className="text-xs text-gray-500">
              Manage all sessions for this course & view your weekly schedule
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Header Nav */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6" aria-label="Tabs">
          {/* Tab 1: All Course Sessions */}
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`py-3 px-1 border-b-2 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "all"
                ? "border-(--main-color) text-(--main-color)"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <ClassIcon sx={{ fontSize: 18 }} />
            <span>All Course Sessions</span>
            {allCourse && (
              <span
                className={`px-2 py-0.5 text-xs rounded-full font-semibold ${
                  activeTab === "all"
                    ? "bg-(--main-color)/10 text-(--main-color)"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {allCourse.length}
              </span>
            )}
          </button>

          {/* Tab 2: Weekly Sessions */}
          <button
            type="button"
            onClick={() => setActiveTab("weekly")}
            className={`py-3 px-1 border-b-2 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "weekly"
                ? "border-(--main-color) text-(--main-color)"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <DateRangeIcon sx={{ fontSize: 18 }} />
            <span>This Week Sessions</span>
            {weekly && (
              <span
                className={`px-2 py-0.5 text-xs rounded-full font-semibold ${
                  activeTab === "weekly"
                    ? "bg-(--main-color)/10 text-(--main-color)"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {weekly.length}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Tab Body */}
      <div>
        {isLoading ? (
          /* Loading State */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-52 bg-gray-100 rounded-2xl"></div>
            ))}
          </div>
        ) : currentSessions.length === 0 ? (
          /* Empty State */
          <div className="bg-white border border-gray-150 rounded-2xl p-12 text-center text-gray-400 shadow-xs">
            <EventIcon className="mb-2 text-gray-300" sx={{ fontSize: 48 }} />
            <p className="text-base font-semibold text-gray-600">
              {activeTab === "all"
                ? "No sessions scheduled for this course yet."
                : "No sessions scheduled for this week."}
            </p>
          </div>
        ) : (
          /* Sessions Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentSessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onViewDetails={(sessionId) => navigate(`sessions/${sessionId}`)}
                onAddSupervisor={(sessionId) => {
                  setSelectedSessionId(sessionId);
                  setIsOpenAddSuper(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Supervisors Modal */}
      <Supervisors
        open={isOpenAddSuper}
        onClose={() => setIsOpenAddSuper(false)}
        sessionId={selectedSessionId}
      />
    </div>
  );
};