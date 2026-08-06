import QuizIcon from "@mui/icons-material/Quiz";

interface SessionExamsProps {
  sessionId: number;
}

export const SessionExams = ({ sessionId }: SessionExamsProps) => {
  return (
    <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <QuizIcon className="text-(--main-color)" /> Session Exams
        </h2>
      </div>

      {/* يمكنك ربط API الجلب والاستعراض هنا مستقبلاً */}
      <div className="p-8 border-2 border-dashed border-gray-200 rounded-2xl text-center">
        <p className="text-xs text-gray-400 font-semibold">
          No exams attached to this session yet.
        </p>
      </div>
    </div>
  );
};