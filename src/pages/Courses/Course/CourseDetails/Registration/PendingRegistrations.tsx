import React from "react";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import VisibilityIcon from "@mui/icons-material/Visibility"; // 👇 استيراد أيقونة العين للمعاينة

interface PendingProps {
  data: any[]; 
  onViewDetails: (id: number) => void; // 🌟 أرسلنا دالة للانتقال لصفحة التفاصيل بدلاً من القبول والرفض الفوري
}

export const PendingRegistrations: React.FC<PendingProps> = ({ data, onViewDetails }) => {
  if (!data || data.length === 0) {
    return (
      <div className="py-16 text-center text-gray-400 border-2 border-dashed rounded-3xl bg-gray-50/50">
        <HourglassTopIcon className="mb-2 text-amber-500 animate-pulse" />
        <p className="text-sm font-medium">No pending registration requests at the moment.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-150 shadow-sm bg-white animate-[fadeIn_0.2s_ease-out]">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-150 text-gray-500 font-bold">
            <th className="p-4">Reg ID</th>
            <th className="p-4">Student Info</th>
            <th className="p-4">Target Course</th>
            <th className="p-4">Applied Date</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 font-semibold text-gray-800">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
              <td className="p-4 text-gray-400">#{item.id}</td>
              <td className="p-4">
                <div className="flex flex-col">
                  <span className="text-gray-900 capitalize">{`${item.user?.firstName} ${item.user?.lastName}`}</span>
                  <span className="text-xs text-gray-400 font-normal">{item.user?.email}</span>
                </div>
              </td>
              <td className="p-4">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold border border-indigo-100 capitalize">
                  {item.course?.title}
                </span>
              </td>
              <td className="p-4 text-gray-500 font-medium">
                {new Date(item.registrationDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </td>
              <td className="p-4">
                <div className="flex justify-center">
                  {/* 🌟 زر عرض التفاصيل الجديد والمحمي */}
                  <button 
                    onClick={() => onViewDetails(item.id)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl border border-indigo-150 transition-all font-bold text-xs shadow-sm"
                    title="Review Application Details"
                  >
                    <VisibilityIcon sx={{ fontSize: 16 }} />
                    View Details
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};