import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from "@mui/icons-material/Check";
import SchoolIcon from "@mui/icons-material/School";
import { useGetAcceptedRegistrationsQuery } from "../../../../../../services/courses/Admin-courses/course-registration/courseRegisterQuery";
import { ErrorHandler } from "../../../../../../utils/ErrorHandler";

interface SessionOnsiteAttendanceProps {
  sessionId: number;
  courseId: number;
}

export const SessionOnsiteAttendance = ({ sessionId, courseId }: SessionOnsiteAttendanceProps) => {
  // جلب قائمة الطلاب المقبولين بالكورس (قم بتعديل الهوك بحسب الـ Service لديك)
  const { data: traineesData, isLoading } = useGetAcceptedRegistrationsQuery({ courseId });

  // قائمة الـ IDs الخاصة بالطلاب المحددين/الحاضرين
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // استخراج الطلاب من الاستجابة
  const trainees = traineesData || [];

  // دالة لتحديد/إلغاء تحديد الطالب وإضافته للقائمة
  const toggleSelectTrainee = (traineeId: number) => {
    setSelectedIds((prev) =>
      prev.includes(traineeId)
        ? prev.filter((id) => id !== traineeId) // إزالة من القائمة
        : [...prev, traineeId] // إضافة للقائمة
    );
  };

  // دالة اختيار الكل
  const handleSelectAll = () => {
    if (selectedIds.length === trainees.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(trainees.map((t: any) => t.id));
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-xs flex items-center justify-center min-h-[160px]">
        <p className="text-xs text-gray-400 font-semibold animate-pulse">
          Loading accepted trainees...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <SchoolIcon className="text-(--main-color)" />
          <h2 className="text-lg font-bold text-gray-800">Onsite Accepted Trainees</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSelectAll}
            className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all cursor-pointer"
          >
            {selectedIds.length === trainees.length && trainees.length > 0 ? "Deselect All" : "Select All"}
          </button>
          
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            {selectedIds.length} Selected
          </span>
        </div>
      </div>

      {/* Trainees List */}
      {trainees.length === 0 ? (
        <div className="p-8 border-2 border-dashed border-gray-200 rounded-2xl text-center bg-gray-50/50">
          <p className="text-xs text-gray-400 font-semibold">
            No accepted trainees found in this course.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
          {trainees.map((trainee) => {
            const isSelected = selectedIds.includes(trainee.id);
            const firstName = trainee.studentName;
          
           

            return (
              <div
                key={trainee.id}
                onClick={() => toggleSelectTrainee(trainee.id)}
                className={`flex items-center justify-between p-3.5 border rounded-2xl transition-all gap-3 cursor-pointer ${
                  isSelected
                    ? "bg-emerald-50/60 border-emerald-300 shadow-2xs"
                    : "bg-gray-50/80 hover:bg-white border-gray-200"
                }`}
              >
                {/* Avatar & Info */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                   (
                      <PersonIcon className="text-gray-400" fontSize="small" />
                    )
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-gray-800 truncate">
                      {firstName}
                    </h4>
                    
                  </div>
                </div>

                {/* Check Icon Status */}
                <div className="shrink-0">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-emerald-600 text-white shadow-xs scale-105"
                        : "bg-gray-100 text-gray-300 border border-gray-200"
                    }`}
                  >
                    <CheckIcon fontSize="small" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};