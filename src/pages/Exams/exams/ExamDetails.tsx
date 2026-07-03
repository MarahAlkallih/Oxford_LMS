import { useParams, useNavigate } from "react-router-dom";
import { useDeleteFilesMutation } from "../../../services/exams/files/filesMutation";
import { useGetOneExamQuery } from "../../../services/exams/exams/examQuery";
import { 
  FiClock, FiAward, FiGlobe, FiFolder, 
  FiFileText, FiTrash2,  FiEye 
} from "react-icons/fi"; // مكتبة أيقونات شهيرة وخفيفة
import { ErrorHandler } from "../../../utils/ErrorHandler";
import { toast } from "react-toastify";
// 1. نموذج التصنيف (Category)
export interface Category {
  id: number;
  title: string;
  imagePath: string;
  createdAt: string;
  updatedAt: string;
}

// 2. نموذج نوع الامتحان (ExamType)
export interface ExamType {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// 3. نموذج اللغة (Language)
export interface Language {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// 4. نموذج الملفات المرفقة (ExamFile)
export interface ExamFile {
  id: number;
  examId: number;
  path: string;
  createdAt: string;
  updatedAt: string;
}

// 5. نموذج مالك الامتحان (ExamOwner)
export interface ExamOwner {
  id: number;
  accountId: number;
  createdAt: string;
  updatedAt: string;
  account?: Record<string, any>; // كائن الحساب الفرعي
}

// 6. النموذج الرئيسي للامتحان (Exam Model)
export interface Exam {
  id: number;
  title: string;
  subTitle: string | null; // معرف كـ null بناءً على الداتا المرسلة
  code: string;
  examTime: number; // بالدقائق
  gradePercentage: number; // نسبة النجاح
  image: string; // رابط الصورة الأساسية
  status: "Active" | "Inactive" | string; // تحديد دقيق للحالة
  showCorrection: boolean;
  
  // المعرفات (Foreign Keys)
  categoryId: number;
  examTypeId: number;
  languageId: number;
  ownerId: number;
  
  // الكائنات المضمنة (Relations)
  category: Category;
  examType: ExamType;
  language: Language;
  owner: ExamOwner;
  files: ExamFile[];
  examEvents: any[]; // مصفوفة الأحداث (فارغة حالياً ويمكن تحديد نوعها لاحقاً)
  
  // طوابع الوقت
  createdAt: string;
  updatedAt: string;
}
export const ExamDetails = () => {
  const { id } = useParams();
  const examId = Number(id);

  
  // جلب داتا الامتحان
  const { data:exam, isLoading, error } = useGetOneExamQuery({ id: examId });

  // فك كبسولة الداتا (دفاعياً حسب شكل الـ API عندكِ إن كان يلفها بـ .data أم لا)
 const [deleteFile,{isSuccess}]=useDeleteFilesMutation()

  if (isLoading) {
    return <div className="text-center p-20 font-bold text-gray-500 animate-pulse">Loading Exam Details...</div>;
  }

  if (error || !exam) {
    return <div className="text-center p-20 text-red-500 font-bold">Failed to load exam details.</div>;
  }

  // دالة لمسح اسم الملف العشوائي الطويل وعرض الاسم الأصلي التقريبي
  const getFileName = (path: string) => {
    const baseName = path.split("/").pop() || "Document.pdf";
    // إذا الباك إند بضيف UUID طويل، هاد السطر بقص أول جزء لتجميل الاسم
    return baseName.length > 30 ? baseName.substring(36) : baseName;
  };

  const handleFileDelete = async (fileId: number) => {
    console.log(fileId)
    try{
       await deleteFile({ id: fileId }).unwrap();
        if(isSuccess){
            toast.success("Deleted Successfully!")
        }
        
    }catch(err){
        ErrorHandler.show(err)
    }
  };
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 text-left" dir="ltr">
      
      {/* 1. الهيدر الأساسي وبانر الامتحان */}
      <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row items-center p-6 gap-6">
        <img 
          src={exam.image || "https://placehold.co/600x400?text=No+Image"} 
          alt={exam.title}
          className="w-full md:w-44 h-28 object-cover rounded-xl border border-gray-100 shadow-inner"
        />
        <div className="flex-1 w-full">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 text-xs font-black rounded-full bg-blue-50 text-blue-600 uppercase tracking-wider">
              {exam.code}
            </span>
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${
              exam.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
            }`}>
              {exam.status}
            </span>
          </div>
          <h1 className="text-3xl font-black text-(--main-color) mt-2">{exam.title}</h1>
          <p className="text-gray-400 text-sm mt-1">Created at: {new Date(exam.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* 2. شبكة المحتوى (تفاصيل + ملفات) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* العمود الأيسر: تفاصيل ومعلومات الامتحان */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* كروت الإحصائيات السريعة */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="p-3 rounded-lg bg-red-50 text-(--color-watermelon)"><FiClock className="text-xl" /></div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Duration</p>
                <p className="text-lg font-extrabold text-gray-700">{exam.examTime} Mins</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="p-3 rounded-lg bg-amber-50 text-amber-600"><FiAward className="text-xl" /></div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Passing Grade</p>
                <p className="text-lg font-extrabold text-gray-700">{exam.gradePercentage}%</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600"><FiGlobe className="text-xl" /></div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Language</p>
                <p className="text-lg font-extrabold text-gray-700">{exam.language?.name || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* نوع الامتحان والتصنيف */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider flex items-center gap-2 mb-2">
                <FiFolder /> Category & Classification
              </h3>
              <div className="p-3 bg-gray-50 rounded-lg inline-flex items-center gap-3">
                {exam.category?.imagePath && (
                  <img src={`http://153.92.210.41:3000/${exam.category.imagePath}`} alt="" className="w-6 h-6 rounded object-cover" />
                )}
                <span className="font-bold text-gray-700">{exam.category?.title || "No Category"}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-md font-bold text-(--main-color)">{exam.examType?.name}</h4>
              <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                {exam.examType?.description || "No description provided for this exam type."}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
              <span className="text-gray-500 font-medium">Show corrections to students after submission:</span>
              <span className={`font-bold px-2.5 py-0.5 rounded text-xs ${exam.showCorrection ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                {exam.showCorrection ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
        </div>

        {/* 📁 العمود الأيمن: قسم الملفات المرفقة مخصص بالكامل */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden sticky top-6">
            
            {/* هيدر قسم الملفات */}
            <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-extrabold text-gray-700 flex items-center gap-2">
                <FiFileText className="text-(--color-watermelon)" /> 
                Attached Files ({exam.files?.length || 0})
              </h3>
            </div>

            {/* لستة الملفات */}
            <div className="p-4 space-y-3">
              {exam.files && exam.files.length > 0 ? (
                exam.files.map((file: any) => (
                  <div 
                    key={file.id} 
                    className="p-3 rounded-xl border border-gray-100 hover:border-gray-200 bg-white transition-all shadow-sm flex items-center justify-between gap-3 group"
                  >
                    {/* معلومات الملف والـ Icon */}
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2.5 bg-red-50 text-red-500 rounded-lg shrink-0">
                        <FiFileText className="text-xl" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-gray-700 truncate" title={file.path}>
                          {getFileName(file.path)}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {new Date(file.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* لوحة التحكم والتحكم بالملف (أزرار الحذف والتعديل) */}
                    <div className="flex items-center gap-1 shrink-0">
                      
                      {/* زر معاينة / تحميل */}
                      <a 
                        href={`https://your-api-domain.com/${file.path}`} // ضعي رابط الدومين الأساسي للباك عندكِ هنا
                        target="_blank" 
                        rel="noreferrer"
                        className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-all"
                        title="View/Download File"
                      >
                        <FiEye size={16} />
                      </a>

                  

                      {/* زر الحذف */}
                      <button
                        onClick={() => handleFileDelete(file.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                        title="Delete File"
                      >
                        <FiTrash2 size={16} />
                      </button>

                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded-xl">
                  No attachments uploaded for this exam.
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};