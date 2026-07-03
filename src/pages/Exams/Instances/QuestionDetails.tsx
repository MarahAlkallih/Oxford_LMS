import { useParams, useNavigate } from "react-router-dom";
import { useGetOneQuestionQuery } from "../../../services/exams/questions/questionQuery"; // الهوك الخاص بجلب سؤال واحد
import { 
  FiArrowLeft, FiCheckCircle, FiXCircle, 
  FiFileText, FiEye, FiHelpCircle, FiAward 
} from "react-icons/fi";

export const QuestionDetails = () => {
  const { examInstanceId, questionId } = useParams();
  const navigate = useNavigate();

  // جلب بيانات السؤال من الباك إند
  const { data:question, isLoading, error } = useGetOneQuestionQuery({ id: Number(questionId) });
  


  if (isLoading) {
    return <div className="text-center p-20 font-bold text-gray-500 animate-pulse">Loading Question Details...</div>;
  }

  if (error || !question) {
    return <div className="text-center p-20 text-red-500 font-bold">Failed to load question details.</div>;
  }

  // دالة لتنظيف اسم الملف المرفق
  const getFileName = (path: string) => {
    const baseName = path.split("/").pop() || "Attachment.pdf";
    return baseName.length > 30 ? baseName.substring(36) : baseName;
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 text-left" dir="ltr">
      
      {/* 1. زر العودة والهيدر */}
      <div className="flex items-center justify-between border-b pb-4 border-gray-200">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-all"
            title="Back"
          >
            <FiArrowLeft size={18} />
          </button>
          <div>
            <span className="text-xs font-black text-gray-400 uppercase tracking-wider">
              Question #{question.questionNumber}
            </span>
            <h1 className="text-2xl font-black text-[var(--main-color)]">Question Overview</h1>
          </div>
        </div>

        {/* زر سريع للتعديل إذا احتجتِ */}
        {/* <button
          onClick={() => navigate(`/exam-instance/${examInstanceId}/edit-question/${question.id}`)}
          className="px-4 py-2 text-xs font-bold text-white bg-[var(--main-color)] hover:opacity-90 rounded-xl shadow-sm transition-all"
        >
          Edit Question
        </button> */}
      </div>

      {/* 2. نص السؤال الرئيسي */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-red-50 text-[var(--color-watermelon)] rounded-md">
          Question Text
        </span>
        <h2 className="text-xl font-extrabold text-gray-800 mt-3 leading-relaxed">
          {question.questionText}
        </h2>
      </div>

      {/* 3. شبكة تفاصيل العلامات والخيارات */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* العمود الأيسر (الخيارات / الأجوبة) */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider flex items-center gap-2 px-1">
            <FiHelpCircle /> Answer Options / Fields
          </h3>

          <div className="space-y-3">
            {question.fields && question.fields.length > 0 ? (
              question.fields.map((field: any, index: number) => (
                <div 
                  key={field.id}
                  className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                    field.isCorrect 
                      ? "bg-emerald-50/60 border-emerald-200 text-emerald-900 shadow-sm" 
                      : "bg-white border-gray-100 text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                      field.isCorrect ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-400"
                    }`}>
                      {String.fromCharCode(65 + index)} {/* تحويل الأرقام لأحرف A, B, C, D */}
                    </span>
                    <p className="font-bold text-sm">{field.field}</p>
                  </div>

                  {/* أيقونة الحالة صح أم خطأ */}
                  <div>
                    {field.isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-black text-emerald-600 bg-emerald-100/80 px-2.5 py-1 rounded-full">
                        <FiCheckCircle /> Correct Answer
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
                        <FiXCircle /> Incorrect
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 bg-gray-50 border border-dashed rounded-xl text-center text-gray-400 text-sm">
                No option fields defined for this question (e.g., True/False or Essay setup).
              </div>
            )}
          </div>
        </div>

        {/* العمود الأيمن (العلامات، الـ Hint، والملفات) */}
        <div className="space-y-6">
          
          {/* كرت العلامات والظهور */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-2 border-b pb-2">
              <FiAward /> Grading & Visibility
            </h3>
            
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                <p className="text-[10px] text-emerald-600 font-black uppercase">Correct</p>
                <p className="text-xl font-black text-emerald-700">+{question.correctAnswerGrade}</p>
              </div>
              <div className="p-3 bg-red-50/50 border border-red-100 rounded-xl">
                <p className="text-[10px] text-red-500 font-black uppercase">Wrong</p>
                <p className="text-xl font-black text-red-700">{question.wrongAnswerGrade}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-2">
              <span className="text-gray-400 font-bold">Show Grade to Student:</span>
              <span className={`px-2 py-0.5 rounded font-black ${
                question.showGrade ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
              }`}>
                {question.showGrade ? "YES" : "NO"}
              </span>
            </div>
          </div>

          {/* كرت التلميح Hint */}
          {question.hint && (
            <div className="bg-amber-50/40 border border-amber-100 p-5 rounded-2xl shadow-sm">
              <h4 className="text-xs font-black text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
                💡 Question Hint
              </h4>
              <p className="text-sm font-bold text-amber-900 mt-2 bg-white/80 p-3 rounded-xl border border-amber-100/60 shadow-inner">
                {question.hint}
              </p>
            </div>
          )}

          {/* قسم الملفات المرفقة بالسؤال */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <h4 className="text-xs font-black text-gray-700 flex items-center gap-2">
                <FiFileText className="text-[var(--color-watermelon)]" /> 
                Question Attachments ({question.files?.length || 0})
              </h4>
            </div>
            
            <div className="p-4">
              {question.files && question.files.length > 0 ? (
                question.files.map((file: any) => (
                  <div 
                    key={file.id}
                    className="p-3 rounded-xl border border-gray-100 bg-gray-50/50 flex items-center justify-between gap-3 group hover:border-gray-200 transition-all"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="p-2 bg-red-100 text-red-600 rounded-lg shrink-0">
                        <FiFileText size={16} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-gray-700 truncate" title={file.path}>
                          {getFileName(file.path)}
                        </p>
                      </div>
                    </div>

                    {/* زر المعاينة والتحميل */}
                    <a 
                      href={`https://your-api-domain.com/${file.path}`} // ضعي نطاق سيرفر الباك إند هنا
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all shrink-0"
                      title="View Attachment"
                    >
                      <FiEye size={16} />
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-xs text-gray-400 font-medium">
                  No files attached to this question.
                </p>
              )}
            </div>
          </div>

          {/* طوابع تاريخ التعديل والإنشاء */}
          <div className="text-[10px] text-gray-400 font-medium space-y-1 px-1">
            <p>Created: {new Date(question.createdAt).toLocaleString()}</p>
            <p>Last Update: {new Date(question.updatedAt).toLocaleString()}</p>
          </div>

        </div>

      </div>

    </div>
  );
};