import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle"; 
import { useRevokeRegistrationMutation } from "../../../../../services/courses/Admin-courses/course-registration/courseRegisterMuttation";
import { ErrorHandler } from "../../../../../utils/ErrorHandler";

interface AcceptedProps {
  data: any[];
}

export const AcceptedRegistrations: React.FC<AcceptedProps> = ({ data }) => {
  const [revoke, { isLoading }] = useRevokeRegistrationMutation();

  // 1. تعديل الدالة لتستقبل الـ id الخاص بالعنصر المضغوط
  const handleRevoke = async (id: number) => {
     console.log(`Registration #${id} revoked successfully`);
    try {
      await revoke({ id }).unwrap();
      console.log(`Registration #${id} revoked successfully`);
    } catch (error) {
      ErrorHandler.show(error)
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="py-16 text-center text-gray-400 border-2 border-dashed rounded-3xl bg-gray-50/50">
        <SchoolIcon className="mb-2 text-gray-300" />
        <p className="text-sm font-medium">No officially accepted students found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-150 shadow-sm bg-white animate-[fadeIn_0.2s_ease-out]">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-150 text-gray-500 font-bold">
            <th className="p-4">ID</th>
            <th className="p-4">Student Name</th>
            <th className="p-4">Enrolled Course</th>
            <th className="p-4">User ID</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-center">Actions</th> 
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 font-semibold text-gray-800">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
              <td className="p-4 text-gray-400">#{item.id}</td>
              <td className="p-4 text-gray-900 capitalize">{item.studentName}</td>
              <td className="p-4">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-100">
                  {item.courseName}
                </span>
              </td>
              <td className="p-4 text-gray-400 font-medium">#USR-{item.userId}</td>
              <td className="p-4">
                <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-100 font-bold">
                  <CheckCircleIcon sx={{ fontSize: 12 }} />
                  Enrolled
                </span>
              </td>
              
              {/* خلية زر إلغاء التسجيل */}
              <td className="p-4 text-center">
                <button
        
                  onClick={() => handleRevoke(item.courseRegistrationId
)}
               
                  disabled={isLoading}
                  title="Cancel Registration"
                  className="inline-flex items-center justify-center p-1.5 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all shadow-sm group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RemoveCircleIcon sx={{ fontSize: 18 }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};