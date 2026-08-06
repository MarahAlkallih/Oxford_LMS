import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetSessionQuery } from "../../../../../services/sessions/admin/sessionsQuery";
import { useGetWeekSessionQuery } from "../../../../../services/sessions/trainer/trainerSessionQuery";
import AddIcon from "@mui/icons-material/Add";
import ClassIcon from "@mui/icons-material/Class";
import EventIcon from "@mui/icons-material/Event";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { CreateSessionModal } from "../../../../../components/Sessions/Session/CreateSessionModal";
import { Supervisors } from "../../../../../components/Const/AdminsModal";
import { SessionCard, type SessionItem } from "../../../../../components/Sessions/Session/SessionCard"; 

export interface props {
  courseId: number;
}

export const SessionsPage = ({ courseId }: props) => {
  const { id } = useParams();
  const Id = Number(id);
  const navigate = useNavigate();

  // State للتحكم بالـ Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenAddSuper, setIsOpenAddSuper] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(0);

  // State للتنقل بين كل الجلسات وجلسات الأسبوع للـ Trainer
  const [viewFilter, setViewFilter] = useState<"all" | "weekly">("all");

  // جلب البيانات
  const { data: sessions, isLoading: isLoadingAll } = useGetSessionQuery({ id: Id });
  const { data: weeklySessions, isLoading: isLoadingWeek } = useGetWeekSessionQuery({});

  const role = localStorage.getItem("role");

  // تحديد القائمة المعروضة بناءً على الفلتر المختار
  const displayedSessions: SessionItem[] = (
    viewFilter === "weekly" ? weeklySessions || [] : sessions || []
  ).map((session) => ({
    ...session,
    startTime:
      session.startTime instanceof Date
        ? session.startTime.toISOString()
        : session.startTime,
  }));

  const isLoading = viewFilter === "weekly" ? isLoadingWeek : isLoadingAll;

  if (isLoading) {
    return (
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-52 bg-gray-100 rounded-2xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-150 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-(--main-color)/10 text-(--main-color) flex items-center justify-center font-bold">
            <ClassIcon />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Course Sessions</h2>
            <p className="text-xs text-gray-500">
              {viewFilter === "weekly"
                ? "Viewing sessions for this week"
                : "Manage and view all sessions for this course"}
            </p>
          </div>
        </div>

        {/* Action Buttons & Role Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          {/* أزرار التبديل تظهر فقط إذا كان المستخدم Trainer */}
          {role === "trainer" && (
            <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
              <button
                type="button"
                onClick={() => setViewFilter("all")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  viewFilter === "all"
                    ? "bg-white text-gray-800 shadow-xs"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                All Sessions
              </button>
              <button
                type="button"
                onClick={() => setViewFilter("weekly")}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  viewFilter === "weekly"
                    ? "bg-(--main-color) text-white shadow-xs"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                <DateRangeIcon sx={{ fontSize: 14 }} />
                <span>This Week</span>
              </button>
            </div>
          )}

          {/* زر إضافة جلسة جديدة */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-1.5 bg-(--main-color) hover:opacity-95 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs shrink-0"
          >
            <AddIcon fontSize="small" />
            <span>Add New Session</span>
          </button>
        </div>
      </div>

      {/* Grid List */}
      {!displayedSessions || displayedSessions.length === 0 ? (
        <div className="bg-white border border-gray-150 rounded-2xl p-12 text-center text-gray-400 shadow-xs">
          <EventIcon className="mb-2 text-gray-300" sx={{ fontSize: 48 }} />
          <p className="text-base font-semibold text-gray-600">
            {viewFilter === "weekly"
              ? "No sessions scheduled for this week"
              : "No sessions scheduled yet"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedSessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              onViewDetails={(sessionId) => navigate(`sessions/${sessionId}`)}
              onAddSupervisor={(sessionId) => {
                setSelectedId(sessionId);
                setIsOpenAddSuper(true);
              }}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <CreateSessionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        id={courseId}
      />
      <Supervisors
        open={isOpenAddSuper}
        onClose={() => setIsOpenAddSuper(false)}
        sessionId={selectedId}
      />
    </div>
  );
};