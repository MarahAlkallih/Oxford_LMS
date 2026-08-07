import { useGetSuperSessionQuery } from "../../../services/sessions/supervisor/supervisor/sessionsQuery";
import { SuperSessionCard } from "../../../components/Sessions/Supervisors/SuperSessionCard"; // تأكد من المسار الصحيح

export const MySessionsPageSuper = () => {
  const { data, isLoading } = useGetSuperSessionQuery({});

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-(--main-color)"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-gray-150 my-6">
        <p className="text-gray-400 font-semibold text-sm">
          No sessions assigned yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          My Supervised Sessions
        </h1>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
          {data.length} {data.length === 1 ? "Session" : "Sessions"}
        </span>
      </div>

      {/* Grid of Session Cards */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
        {data.map((session) => (
          <SuperSessionCard
            key={session.assignmentId || session.sessionId}
            session={{
              ...session,
              date: session.date instanceof Date ? session.date.toISOString() : session.date,
              startTime:
                session.startTime instanceof Date
                  ? session.startTime.toISOString()
                  : session.startTime,
              endTime:
                session.endTime instanceof Date
                  ? session.endTime.toISOString()
                  : session.endTime,
            }}
          />
        ))}
      </div>
    </div>
  );
};