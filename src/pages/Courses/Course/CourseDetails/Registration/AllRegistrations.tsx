import React from "react";
import HistoryIcon from "@mui/icons-material/History";

interface AllRegProps {
  data: any[];
}

export const AllRegistrations: React.FC<AllRegProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="py-16 text-center text-gray-400 border-2 border-dashed rounded-3xl bg-gray-50/50">
        <HistoryIcon className="mb-2 text-gray-300" />
        <p className="text-sm font-medium">No registration logs found in the system.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-150 shadow-sm bg-white animate-[fadeIn_0.2s_ease-out]">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-150 text-gray-500 font-bold">
            <th className="p-4">Reg ID</th>
            <th className="p-4">Student</th>
            <th className="p-4">Course</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 font-semibold text-gray-800">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
              <td className="p-4 text-gray-400">#{item.id}</td>
              <td className="p-4 capitalize">{`${item.user?.firstName} ${item.user?.lastName}`}</td>
              <td className="p-4 capitalize">{item.course?.title}</td>
              <td className="p-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                  item.status === "PENDING" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-gray-50 text-gray-600"
                }`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};