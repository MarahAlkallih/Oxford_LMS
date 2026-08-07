import QuizIcon from "@mui/icons-material/Quiz";
import { Button } from "../../../../../../components/Buttons/SubmitBtn";
import { useState } from "react";
import { AddSessionEvent } from "../../../../../../components/Exam/SessionExam/AddSessionExamModal";
import { useGetSessionEventsQuery } from "../../../../../../services/exams/exam-session/examSessionQuery";
import { SessionEventCard } from "../../../../../../components/Exam/SessionExam/SessionEventCard"; // استدعاء المكون الجديد
import { Add } from "@mui/icons-material";
interface SessionExamsProps {
  sessionId: number;
  courseId: number;
}

export const SessionExams = ({ sessionId, courseId }: SessionExamsProps) => {
  const [openAdd, setIsOpenAdd] = useState(false);
  const { data: events, isLoading: isLoadEvent } = useGetSessionEventsQuery({
    sessionId: sessionId,
  });

  // قائمة الأحداث القادمة من API
  const eventsList = Array.isArray(events?.data)
    ? events.data
    : Array.isArray(events)
      ? events
      : [];


 
  return (
    <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <QuizIcon className="text-(--main-color)" /> Session Exams
        </h2>
        <button   onClick={() => {
            setIsOpenAdd(true);
          }}>

        </button>
       <Add/>
      </div>

      {/* Loading State */}
      {isLoadEvent ? (
        <div className="space-y-2 animate-pulse">
          <div className="h-16 bg-gray-100 rounded-2xl"></div>
          <div className="h-16 bg-gray-100 rounded-2xl"></div>
        </div>
      ) : !eventsList || eventsList.length === 0 ? (
        /* Empty State */
        <div className="p-8 border-2 border-dashed border-gray-200 rounded-2xl text-center">
          <p className="text-xs text-gray-400 font-semibold">
            No exams attached to this session yet.
          </p>
        </div>
      ) : (
        /* List of Event Cards */
        <div className="flex flex-col gap-2.5 max-h-[350px] overflow-y-auto pr-1">
          {eventsList.map((item: any) => (
            <SessionEventCard
              key={item.id}
              event={item} 
              sessionId={sessionId} 
              courseId={courseId}             
            
            />
          ))}
        </div>
      )}

      {/* Add Modal */}
      <AddSessionEvent
        open={openAdd}
        onClose={() => setIsOpenAdd(false)}
        sessionId={sessionId}
        courseId={courseId}
      />
    </div>
  );
};