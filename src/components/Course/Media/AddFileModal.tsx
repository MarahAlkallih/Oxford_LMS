import { useState, type ChangeEvent, type DragEvent } from "react";
import { Button } from "../../Buttons/SubmitBtn";
import { Modal } from "../../global/Modals";
import { CancelBtn } from "../../Buttons/CancelBtn";
import { toast } from "react-toastify";
import { ErrorHandler } from "../../../utils/ErrorHandler";
import { useAddCourseFileMutation } from "../../../services/courses/files/courseFiles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloseIcon from "@mui/icons-material/Close";

interface AddFileModalProps {
  open: boolean;
  onClose: () => void;
  courseId: number;
}

export const AddFileModal = ({ open, onClose, courseId }: AddFileModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [addCourseFile, { isLoading }] = useAddCourseFileMutation();

  // معالجة اختيار الملف
  const handleFileSelect = (selectedFile: File | null) => {
    if (!selectedFile) return;

    // التأكد من أن الملف إما صورة أو فيديو
    if (!selectedFile.type.startsWith("image/") && !selectedFile.type.startsWith("video/")) {
      toast.error("Please select a valid image or video file.");
      return;
    }

    setFile(selectedFile);
    // إنشاء رابط معاينة مؤقت
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
  };

  // تفريغ الملف عند الإلغاء أو الإغلاق
  const handleReset = () => {
    setFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  // Drag & Drop Handlers
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // رفع البيانات باستخدام FormData
  const handleSubmit = async () => {
    if (!file) {
      toast.warning("Please select a media file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // اسم الفيلد حسَب ما بيتوقع الـ Backend (file / media)
    formData.append("courseId", courseId.toString());

    try {
      // قم بتمرير الـ formData إما كـ arg أو ضمن object بحسب تعريف الـ Mutation لديك
      await addCourseFile({
          formData,
          id: courseId
      }).unwrap();
      toast.success("Media uploaded successfully!");
      handleClose();
    } catch (err) {
      ErrorHandler.show(err);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="flex flex-col gap-5 p-6 min-w-[340px] sm:min-w-[420px]">
        <h2 className="text-xl font-bold text-gray-800 text-center">
          Upload Course Media
        </h2>

        {/* Input Area / DropZone */}
        {!file ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-3 transition-all ${
              isDragging
                ? "border-(--main-color) bg-blue-50/50"
                : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
            }`}
          >
            <input
              type="file"
              id="media-input"
              accept="image/*,video/*"
              className="hidden"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
              }}
            />
            <label
              htmlFor="media-input"
              className="cursor-pointer flex flex-col items-center gap-2 w-full"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 text-(--main-color) flex items-center justify-center">
                <CloudUploadIcon />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-700">
                  Click to upload or drag & drop
                </p>
                <p className="text-[11px] text-gray-400 mt-1">
                  Supports Images (PNG, JPG, WEBP) & Videos (MP4, MKV)
                </p>
              </div>
            </label>
          </div>
        ) : (
          /* File Selected & Preview Box */
          <div className="relative border border-gray-200 rounded-2xl p-4 bg-gray-50 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-200 transition-all cursor-pointer z-10"
              title="Remove File"
            >
              <CloseIcon fontSize="small" />
            </button>

            {/* Media Preview */}
            {file.type.startsWith("image/") && previewUrl && (
              <div className="w-full h-40 rounded-xl overflow-hidden bg-black/5 flex items-center justify-center">
                <img src={previewUrl} alt="Preview" className="h-full object-contain" />
              </div>
            )}

            {file.type.startsWith("video/") && previewUrl && (
              <div className="w-full h-40 rounded-xl overflow-hidden bg-black flex items-center justify-center">
                <video src={previewUrl} controls className="w-full h-full object-contain" />
              </div>
            )}

            {/* File Info */}
            <div className="flex items-center gap-3 pt-1">
              <InsertDriveFileIcon className="text-(--main-color)" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-gray-800 truncate">{file.name}</p>
                <p className="text-[11px] text-gray-400">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Modal Action Buttons */}
        <div className="flex gap-3 pt-2">
          <div className="flex-1">
            <Button
              name={isLoading ? "Uploading..." : "Upload Media"}
              onClick={handleSubmit}
             
            />
          </div>

          <div className="flex-1">
            <CancelBtn name="Cancel" onClick={handleClose} />
          </div>
        </div>
      </div>
    </Modal>
  );
};