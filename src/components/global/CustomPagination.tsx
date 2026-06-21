
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export const CustomPagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // إخفاء المكون تماماً إذا كان عدد الصفحات 0 أو 1 (لأنه لا يوجد داعي للتنقل)
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      
      {/* زر السابق */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300
          ${
            currentPage === 1
              ? "bg-gray-50 text-gray-400 border border-gray-100 cursor-not-allowed opacity-60"
              : "bg-white text-gray-700 border border-gray-200 shadow-sm hover:bg-gray-50 hover:shadow hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          }
        `}
      >
        <ChevronLeftIcon fontSize="small" />
        Previous
      </button>

      {/* مؤشر الصفحات */}
      <div className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-100/80 px-4 py-2 rounded-xl">
        <span>Page</span>
        <span className="font-bold text-gray-900 bg-white px-2 py-0.5 rounded-md shadow-sm border border-gray-200">
          {currentPage}
        </span>
        <span>of</span>
        <span className="font-bold text-gray-900">
          {totalPages}
        </span>
      </div>

      {/* زر التالي */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300
          ${
            currentPage === totalPages
              ? "bg-gray-50 text-gray-400 border border-gray-100 cursor-not-allowed opacity-60"
              : "bg-white text-gray-700 border border-gray-200 shadow-sm hover:bg-gray-50 hover:shadow hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          }
        `}
      >
        Next
        <ChevronRightIcon fontSize="small" />
      </button>

    </div>
  );
};