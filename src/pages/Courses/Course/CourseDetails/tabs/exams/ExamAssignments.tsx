import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetAssignmensQuery } from "../../../../../../services/exams/assignment/assignmentQuery";
import { useGetAcceptedRegistrationsQuery } from "../../../../../../services/courses/Admin-courses/course-registration/courseRegisterQuery";
// MUI Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FilterListIcon from "@mui/icons-material/FilterList";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

import { AssignmentCard } from "./AssignmentCard";

// ----------------------------------------------------------------------
// 1. Filter Options
// ----------------------------------------------------------------------
const STATUS_OPTIONS = ["All", "assigned", "in_progress", "submitted", "graded"];
const SUCCESS_OPTIONS = ["All", "true", "false"];


// ----------------------------------------------------------------------
// 2. Main Page Component
// ----------------------------------------------------------------------
export const ExamAssignment = () => {
  const { eventId,id } = useParams();
  const navigate = useNavigate();
  const eid = Number(eventId);
  const courseId=Number(id)
  // Dynamic Filters State
   const { data: accepted, isLoading: isLoadAccept } =
    useGetAcceptedRegistrationsQuery({ courseId });
  const [filters, setFilters] = useState<Record<string, any>>({
    status: "All",
    success: "All",
    accepted: undefined as number | undefined,
  });

  // Handle dynamic filter change
  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Reset all filters
  const handleResetFilters = () => {
    setFilters({
      status: "All",
      success: "All",
    });
  };

  // Clean filters payload before sending to API
  const activeFilters = useMemo(() => {
    const params: Record<string, any> = {
      examEventId: eid,
    };

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "" && value !== "All") {
        if (key === "success") {
          params[key] = value === "true";
        } else {
          params[key] = value;
        }
      }
    });

    return params;
  }, [eid, filters]);

  // Fetch data using clean filters
  const { data, isLoading, isFetching } = useGetAssignmensQuery({
    filters: activeFilters,
  });

  // Normalize assignments response
  const assignmentsList: any[] = Array.isArray(data)
    ? data
    : data?.data || [];

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-gray-150 p-4 rounded-3xl shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-all cursor-pointer"
            title="Back"
          >
            <ArrowBackIcon fontSize="small" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Exam Assignments
            </h1>
            <p className="text-xs text-gray-400 font-semibold mt-0.5">
              Event ID: #{eid}
            </p>
          </div>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-2xl">
            Total: {assignmentsList.length} Students
          </span>
          {isFetching && (
            <span className="text-xs text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full font-bold animate-pulse border border-amber-200">
              Updating...
            </span>
          )}
        </div>
      </div>

      {/* Dynamic Filter Bar */}
      <div className="bg-white border border-gray-150 p-4 rounded-3xl shadow-2xs space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
          <FilterListIcon className="text-(--main-color)" fontSize="small" />
          <span>Filter Students</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {/* Status Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
              Status
            </label>
            <select
              value={filters.status || "All"}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs rounded-2xl p-2.5 font-semibold focus:outline-none focus:border-amber-500 transition-all cursor-pointer"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status === "All" ? "All Statuses" : status}
                </option>
              ))}
            </select>
          </div>

          {/* Success Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
              Result
            </label>
            <select
              value={String(filters.success)}
              onChange={(e) => handleFilterChange("success", e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs rounded-2xl p-2.5 font-semibold focus:outline-none focus:border-amber-500 transition-all cursor-pointer"
            >
              {SUCCESS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === "All"
                    ? "All Results"
                    : opt === "true"
                    ? "Passed"
                    : "Failed"}
                </option>
              ))}
            </select>
          </div>
 <div className="space-y-1">
  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
    Students
  </label>

  <select
    value={filters.accepted ?? ""}
    onChange={(e) =>
      handleFilterChange(
        "accepted",
        e.target.value ? Number(e.target.value) : undefined
      )
    }
    className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-xs rounded-2xl p-2.5 font-semibold focus:outline-none focus:border-amber-500 transition-all cursor-pointer"
  >
    <option value="">All Students</option>

    {accepted?.map((student) => (
      <option key={student.id} value={student.id}>
        {student.studentName}
      </option>
    ))}
  </select>
</div>
          {/* Reset Button */}
          <div className="flex items-end">
            <button
              onClick={handleResetFilters}
              className="w-full h-[38px] flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl text-xs font-bold transition-all cursor-pointer"
            >
              <RotateLeftIcon fontSize="small" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cards Grid Section */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-44 bg-gray-100 rounded-3xl animate-pulse p-4 space-y-3"
            >
              <div className="h-5 bg-gray-200 rounded-lg w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded-lg w-1/3"></div>
              <div className="h-12 bg-gray-200 rounded-2xl"></div>
            </div>
          ))}
        </div>
      ) : assignmentsList.length === 0 ? (
        <div className="bg-white border border-gray-150 rounded-3xl p-12 text-center space-y-2">
          <HourglassEmptyIcon className="text-gray-300" sx={{ fontSize: 48 }} />
          <p className="text-sm font-bold text-gray-500">
            No students match the selected filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assignmentsList.map((item: any) => (
            <AssignmentCard key={item.id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

