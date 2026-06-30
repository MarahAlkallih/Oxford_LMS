import { useState, useRef } from "react";
import { CancelBtn } from "../../Buttons/CancelBtn";
import { Button } from "../../Buttons/SubmitBtn";
import { Modal } from "../../global/Modals";
import { useAddFileMutation } from "../../../services/exams/files/filesMutation";
import { toast } from "react-toastify";
interface AddExamModalProps {
  open: boolean;
  onClose: () => void;
  examId: number;
}

export const AddExamFileModal = ({ open, onClose, examId }: AddExamModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [addFile,{isLoading}]=useAddFileMutation()
 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };


  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  // إزالة الملف المختار
  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // حساب حجم الملف بشكل مقروء
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const handleUploadSubmit = () => {
    if (!file) return;
    const fromData=new FormData();
    fromData.append("file",file)
    fromData.append("examId", examId.toString())
   try{
    const res=addFile(
        fromData
    ).unwrap()
    console.log(res)
    toast.success("File uploaded successfully")
    onClose();
   }catch{
    
   }
    console.log("Uploading file:", file, "for Exam ID:", examId);
  };
  
  return (
    <Modal open={open} onClose={onClose}>
      <div className="bg-white p-7 rounded-2xl w-full max-w-lg mx-auto shadow-xl text-left" dir="ltr">

        <div className="mb-6 border-b border-gray-100 pb-3">
          <h2 className="text-2xl font-black text-(--main-color,#4B5945)">
            Add Exam File
          </h2>
          <p className="text-gray-400 text-xs mt-1">
            Upload supporting documents or resource sheets for Exam #{examId}
          </p>
        </div>

        {/* حقل الرفع العصري */}
        <div className="mb-6">
          <input
            ref={fileInputRef}
            type="file"
            id="exam-file-upload"
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg"
          />

          {!file ? (
            /* 1. حالة عدم وجود ملف: منطقة السحب والإفلات التفاعلية */
            <label
              htmlFor="exam-file-upload"
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 select-none ${
                isDragActive
                  ? "border-(--color-watermelon,#E07A5F) bg-(--color-watermelon,#E07A5F)/5 scale-[0.99]"
                  : "border-gray-200 hover:border-(--main-color,#4B5945)/60 hover:bg-gray-50/50"
              }`}
            >
              <div className={`p-3 bg-gray-50 rounded-xl mb-3 text-gray-400 transition-colors ${isDragActive ? 'text-(--color-watermelon,#E07A5F) bg-white shadow-xs' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                </svg>
              </div>
              <p className="text-sm font-bold text-gray-700">
                Click to upload <span className="text-gray-400 font-normal">or drag and drop</span>
              </p>
              <p className="text-[11px] text-gray-400 mt-1.5 font-medium">
                PDF, WORD, EXCEL or Images up to 10MB
              </p>
            </label>
          ) : (
            /* 2. حالة وجود ملف: بطاقة عرض معلومات الحجم والاسم مع زر الحذف */
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-200/60 animate-fadeIn">
              <div className="flex items-center gap-3 min-w-0">
                {/* أيقونة نوع الملف الجمالية */}
                <div className="p-2.5 bg-(--main-color,#4B5945)/10 text-(--main-color,#4B5945) rounded-lg flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5-3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-800 truncate" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>

              {/* زر حذف الملف قبل الرفع */}
              <button
                onClick={handleRemoveFile}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove file"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* أزرار الأكشن التحتية */}
        <div className="flex gap-3 pt-2">
          <div className="flex-1">
            <Button
              name={isLoading ? "Loading..." : "Add File"}
              onClick={handleUploadSubmit}
          
            />
          </div>
          <div className="flex-1">
            <CancelBtn
              name="Cancel"
              onClick={onClose}
            />
          </div>
        </div>

      </div>
    </Modal>
  );
};