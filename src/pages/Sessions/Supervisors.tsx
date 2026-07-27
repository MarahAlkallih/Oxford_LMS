import React, { useState } from "react";
// 1. استيراد الـ Hook والـ Interface المباشر من ملف الـ API الخاص بكِ
import {
  useGetSupervisorsQuery,
 type Supervisors,
} from "../../services/sessions/supervisor/admin/supervisorQuery";

import GroupIcon from "@mui/icons-material/Group";
import SearchIcon from "@mui/icons-material/Search";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Delete from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import ClassIcon from "@mui/icons-material/Class";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export const Supervisorspage = () => {
  // 2. جلب البيانات من الـ Hook
  const { data, isLoading, isError } = useGetSupervisorsQuery({});
  const [searchTerm, setSearchTerm] = useState("");

  // دالة الحذف
  const handleDelete = (assignmentId: number) => {
    if (confirm("Are you sure you want to delete this supervisor assignment?")) {
      console.log("Delete assignment ID:", assignmentId);
    }
  };

  // دالة التعديل
  const handleEdit = (item: Supervisors) => {
    console.log("Edit item:", item);
  };

  const formatDate = (dateStr?: Date | string) => {
    if (!dateStr) return "--";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // تصفية البيانات بأمان من دون أخطاء TypeScript أو Crashes
  const filteredData = data?.filter((item: Supervisors) => {
    const search = searchTerm.toLowerCase();
    const fullName = `${item.admin?.firstName || ""} ${item.admin?.lastName || ""}`.toLowerCase();
    const email = (item.admin?.email || "").toLowerCase();
    const sessionTitle = (item.session?.title || "").toLowerCase();

    return (
      fullName.includes(search) ||
      email.includes(search) ||
      sessionTitle.includes(search)
    );
  });

  return (
    <div className="p-6 space-y-6 animate-[fadeIn_0.3s_ease-out]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-150 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-(--main-color)/10 text-(--main-color) flex items-center justify-center font-bold">
            <GroupIcon />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">Supervisors Management</h1>
            <p className="text-xs text-gray-400">View and manage assigned supervisors for sessions</p>
          </div>
        </div>
        <span className="self-start sm:self-auto px-3 py-1 bg-gray-100 text-gray-700 font-bold text-xs rounded-full">
          Total: {data?.length || 0}
        </span>
      </div>

      {/* Search Input */}
      <div className="relative max-w-xs w-full">
        <SearchIcon
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          sx={{ fontSize: 18 }}
        />
        <input
          type="text"
          placeholder="Search supervisor or session..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:border-(--main-color) transition-all shadow-xs"
        />
      </div>

      {/* Main Table */}
      <div className="bg-white border border-gray-150 rounded-2xl shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-4 animate-pulse">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-12 bg-gray-100 rounded-xl w-full"></div>
            ))}
          </div>
        ) : isError ? (
          <div className="p-8 text-center text-red-500 text-xs font-semibold">
            Error loading supervisors data.
          </div>
        ) : !filteredData || filteredData.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-xs font-semibold">
            No supervisors found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-150 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-3.5 px-5">Supervisor</th>
                  <th className="py-3.5 px-5">Assigned Session</th>
                  <th className="py-3.5 px-5">Date & Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
                {filteredData.map((item: Supervisors) => (
                  <tr key={item.assignmentId} className="hover:bg-gray-50/50 transition-colors">
                    {/* Supervisor Info */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 font-bold text-xs flex items-center justify-center shrink-0 border border-indigo-100">
                          {item.admin?.firstName?.[0]?.toUpperCase() || "A"}
                          {item.admin?.lastName?.[0]?.toUpperCase() || "D"}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm">
                            {item.admin?.firstName} {item.admin?.lastName}
                          </p>
                          <p className="text-gray-400 text-[11px] flex items-center gap-1">
                            <EmailIcon sx={{ fontSize: 12 }} />
                            {item.admin?.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Session Info */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2">
                        <ClassIcon className="text-gray-400" sx={{ fontSize: 16 }} />
                        <span className="font-bold text-gray-800">
                          {item.session?.title}
                        </span>
                      </div>
                    </td>

                    {/* Date & Status */}
                    <td className="py-4 px-5">
                      <div className="space-y-1">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-100">
                          {item.session?.status}
                        </span>
                        <p className="text-gray-400 text-[11px] flex items-center gap-1">
                          <CalendarTodayIcon sx={{ fontSize: 12 }} />
                          {formatDate(item.session?.date)}
                        </p>
                      </div>
                    </td>

                    {/* Action Buttons (Edit & Delete) */}
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-1.5 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition-all cursor-pointer"
                          title="Edit"
                        >
                          <EditOutlinedIcon sx={{ fontSize: 18 }} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.assignmentId)}
                          className="p-1.5 rounded-lg border border-gray-200 hover:border-red-500 hover:bg-red-50 text-gray-500 hover:text-red-600 transition-all cursor-pointer"
                          title="Delete"
                        >
                          <Delete sx={{ fontSize: 18 }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};