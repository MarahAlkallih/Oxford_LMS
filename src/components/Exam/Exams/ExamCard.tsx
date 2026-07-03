import React, { useState } from "react";
import type { Exam } from "../../../types/Exam";
import { useGetFilesQuery } from "../../../services/exams/files/filesQuery";
import { Delete } from "@mui/icons-material";
import { DeleteFileModal } from "../../../components/Exam/Exams/DeleteFileModal";
interface ExamCardProps {
  exam: Exam;
  onViewDetails?: (id: number) => void;
  onEdit?: (exam: Exam) => void;
  onUpload?:()=> void;
  onDelete?:()=>void;
  onShow?:()=>void

}

export const ExamCard: React.FC<ExamCardProps> = ({ exam, onViewDetails, onEdit,onUpload,onDelete,onShow}) => {
  const [isOpenDeleteFile,setOpenDeleteFile]=useState(false);
  const [selectedId,setSelectedId]=useState(0)
  const {data:files}=useGetFilesQuery({id:exam.id})
  const hasImage = exam.image && exam.image.trim() !== "";
   const hasFiles = files ;

  return (
    <div 
      className="group bg-white border border-gray-100 rounded-2xl shadow-xs hover:shadow-xl hover:border-gray-200/80 transition-all duration-300 flex flex-col overflow-hidden max-w-sm w-full"
      dir="ltr"
    >
      {/* 1. قسم الصورة أو الخلفية البديلة */}
      <div className="relative h-44 w-full overflow-hidden bg-gray-50 flex items-center justify-center">
        {hasImage ? (
          <img
            src={exam.image!}
            alt={exam.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* هاد الجزء البديل العصري في حال ما في صورة */
          <div className="w-full h-full bg-linear-to-br from-(--main-color,#4B5945)/80 to-[#2c3529] flex flex-col items-center justify-center p-4 text-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50" />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white/40 mb-2 group-hover:scale-110 transition-transform duration-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
            </svg>
            <span className="text-white/30 text-[10px] tracking-widest font-mono uppercase">No Cover Image Provided</span>
          </div>
        )}

        {/* الـ Badges العائمة فوق الصورة */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {/* كود الامتحان */}
          <span className="px-2 py-1 rounded-md text-[10px] font-mono font-bold bg-white/90 text-gray-800 backdrop-blur-xs shadow-xs">
            {exam.code}
          </span>
          {/* الحالة */}
          <span className={`px-2 py-1 rounded-md text-[10px] font-bold shadow-xs backdrop-blur-xs ${
            exam.status.toLowerCase() === 'active' 
              ? 'bg-green-500/90 text-white' 
              : 'bg-gray-500/90 text-white'
          }`}>
            {exam.status}
          </span>
        </div>

        {/* نسبة النجاح أو الوزن الحجمي للامتحان */}
        <div className="absolute bottom-3 right-3 bg-white/90 text-(--main-color,#4B5945) text-xs font-black px-2.5 py-1 rounded-lg backdrop-blur-xs shadow-xs flex items-center gap-1">
          <span>{exam.gradePercentage}%</span>
          <span className="text-[9px] text-gray-400 font-normal">Weight</span>
        </div>
      </div>

      {/* 2. محتوى الكارد الأساسي */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="text-gray-800 font-black text-lg group-hover:text-(--main-color,#4B5945) transition-colors duration-200 line-clamp-1">
              {exam.title}
            </h3>
          </div>
          
          {exam.subTitle && (
            <p className="text-gray-400 text-xs line-clamp-2 mb-3 leading-relaxed">
              {exam.subTitle}
            </p>
          )}

          {/* معلومات الامتحان الحيوية (الوقت و ميزات التصحيح) */}
          <div className="grid grid-cols-2 gap-2 mt-3 pb-4 border-b border-gray-100">
            {/* الوقت */}
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-100/50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-amber-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 leading-none">Duration</span>
                <span className="text-xs font-bold text-gray-700 mt-0.5">{exam.examTime} Mins</span>
              </div>
            </div>

            {/* تصحيح تلقائي أو إظهار النتيجة */}
            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-100/50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 leading-none">Correction</span>
                <span className="text-xs font-bold text-gray-700 mt-0.5">
                  {exam.showCorrection ? "Auto Show" : "Hidden"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. قسم عرض الملفات المرفقة (يظهر بشكل قائمة لستة فقط في حال وجود ملفات) */}
        {/* {hasFiles && (
          <div className="  mt-4 pt-1">
          <div className="flex justify-between items-center align-middle ">
              <span className="text-[14px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Attached Resources 
            </span>
              <button className="m-2 text-red-500 cursor-pointer" onClick={()=>{setSelectedId(files.id),setOpenDeleteFile(true)}}>
                        <Delete/>
                      </button>
          </div>
            <div className="flex flex-col gap-1.5 max-h-24 overflow-y-auto pr-1 custom-scrollbar">
            { files &&
  
                 <a
                  key={files.id}
                  href={`http://153.92.210.41:3000/${files.path}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg
                   bg-blue-50/40 border border-blue-100/60 hover:bg-blue-50
                   text-blue-800 transition-colors duration-150 group/file"
                >
                   
                  <div className="flex justify-between items-center  gap-2 min-w-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-blue-500 shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    
                  </div>
                </a>
            }
            </div>
          </div>
        )} */}

        {/* 4. أزرار التحكم والتفاعل بأسفل الكارد */}
        <div className="flex items-center gap-2 mt-5 pt-3 border-t border-gray-50">
          <button
            onClick={onShow}
            className="flex-1 bg-(--main-color,#4B5945) hover:bg-(--main-color,#4B5945)/90
             text-white font-bold py-2.5 px-4 rounded-xl 
             text-xs transition-all hover:shadow-xs "
          >
           Show
          </button>
           <button
            onClick={onUpload}
            className="flex-1 bg-(--main-color,#4B5945) hover:bg-(--main-color,#4B5945)/90
             text-white font-bold py-2.5 px-4 rounded-xl text-xs 
             transition-all hover:shadow-xs cursor-pointer"
          >
            Upload File
          </button>
          {onEdit && (
            <button
              onClick={() => onEdit(exam)}
              className="p-2.5 text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 border border-gray-100 rounded-xl transition-all"
              title="Edit Configuration"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.767a1.123 1.123 0 0 0-.417 1.03c.004.074.006.148.006.222 0 .074-.002.148-.006.222a1.123 1.123 0 0 0 .417 1.03l1.003.767a1.125 1.125 0 0 1 .26 1.43l-1.296 2.247a1.125 1.125 0 0 1-1.37.49l-1.216-.456a1.125 1.125 0 0 0-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.213-1.281a1.125 1.125 0 0 0-.646-.87a6.57 6.57 0 0 1-.22-.127a1.125 1.125 0 0 0-1.075-.124l-1.217.456a1.125 1.125 0 0 1-1.37-.49l-1.296-2.247a1.125 1.125 0 0 1 .26-1.43l1.003-.767a1.122 1.122 0 0 0 .417-1.03a6.57 6.57 0 0 1-.006-.222c0-.074.002-.148.006-.222a1.122 1.122 0 0 0-.417-1.03l-1.003-.767a1.125 1.125 0 0 1-.26-1.43l1.296-2.247a1.125 1.125 0 0 1 1.37-.49l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128c.332-.183.582-.495.644-.869l.214-1.28Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </button>
          )}
            {onDelete && (
            <button
              onClick={ onDelete}
              className="p-2.5 text-gray-500 hover:text-red-600 bg-gray-50 hover:bg-blue-50 border border-gray-100 rounded-xl transition-all"
              title="Delete Exam"
            >
             <Delete/>
            </button>
          )}
        </div>
      </div>
      <DeleteFileModal
      open={isOpenDeleteFile}
      onClose={()=>setOpenDeleteFile(false)}
      id={selectedId}
      />
    </div>
  );
};