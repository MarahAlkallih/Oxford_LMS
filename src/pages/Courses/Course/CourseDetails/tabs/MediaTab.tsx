import { useState } from "react";
import { Button } from "../../../../../components/Buttons/SubmitBtn";
import { AddFileModal } from "../../../../../components/Course/Media/AddFileModal";
import { useGetCourseFilesQuery } from "../../../../../services/courses/files/courseFiles";
import { CourseMediaCard,type CourseFile } from "../../../../../components/Course/Media/CourseMediaCard";
import FolderOffIcon from "@mui/icons-material/FolderOff";

interface CourseMediaTabProps {
  courseId: number;
}

export const CourseMediaTab = ({ courseId }: CourseMediaTabProps) => {
  const [openAddFileModal, setIsOpenAddFileModal] = useState(false);
  const { data, isLoading } = useGetCourseFilesQuery(courseId);

  const files: CourseFile[] = data || [];

  return (
    <div className="flex flex-col gap-6 p-2">
      {/* Top Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Course Media</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Manage files, documents, and media for this course.
          </p>
        </div>
        <div>
          <Button name="+ Add File" onClick={() => setIsOpenAddFileModal(true)} />
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 border border-gray-100 animate-pulse flex flex-col gap-3"
            >
              <div className="w-full h-36 bg-gray-200 rounded-xl"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-8 bg-gray-200 rounded-xl w-full mt-2"></div>
            </div>
          ))}
        </div>
      ) : files.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-dashed border-gray-200 text-center min-h-[280px]">
          <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-3">
            <FolderOffIcon sx={{ fontSize: 30 }} />
          </div>
          <h3 className="text-sm font-bold text-gray-700">No files uploaded yet</h3>
          <p className="text-xs text-gray-400 max-w-sm mt-1 mb-4">
            Start uploading files, PDFs, or images for this course.
          </p>
          <Button name="+ Upload First File" onClick={() => setIsOpenAddFileModal(true)} />
        </div>
      ) : (
        /* Media Cards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {files.map((file) => (
            <CourseMediaCard key={file.id} file={file} />
          ))}
        </div>
      )}

      {/* Add File Modal */}
      <AddFileModal
        open={openAddFileModal}
        onClose={() => setIsOpenAddFileModal(false)}
        courseId={courseId}
      />
    </div>
  );
};