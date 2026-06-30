import type { Question, QuestionField } from "../../../../types/Question";

interface QuestionCardProps {
  question: Question;
  onEdit: (question: Question) => void;
  onDelete: (id: number) => void;
  onAddNext?: (currentOrder: number) => void; // زر إضافة سؤال بعده أو تكراره
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onEdit,
  onDelete,
  onAddNext,
}) => {
  // دالة ذكية لمعرفة نوع السؤال وعرض الـ Badge المناسب له بصرياً
  const getQuestionTypeDetails = (typeId: number, fields: QuestionField[]) => {
    const allCorrect = fields.every((f) => f.isCorrect);
    
    if (typeId === 2 || (fields.length === 2 && fields.some(f => f.field.toLowerCase() === 'true'))) {
      return { label: "True / False", color: "bg-blue-50 text-blue-700 border-blue-200" };
    }
    if (typeId === 3 || allCorrect) {
      return { label: "Written / Essay", color: "bg-purple-50 text-purple-700 border-purple-200" };
    }
    return { label: "Multiple Choice", color: "bg-indigo-50 text-indigo-700 border-indigo-200" };
  };

  const typeDetails = getQuestionTypeDetails(question.questionTypeId, question.fields);

  return (
    <div 
      className="group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-xs hover:shadow-xl hover:border-gray-200/80 transition-all duration-300 flex flex-col justify-between overflow-hidden"
      dir="ltr"
    >
      {/* الشريط الجمالي الجانبي الذي يتغير لونه عند الـ Hover */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--main-color, #4B5945)] opacity-40 group-hover:bg-[var(--color-watermelon, #E07A5F)] group-hover:opacity-100 transition-all duration-300" />

      {/* الرأس (Header): رقم السؤال، التايب، العلامات، وأزرار التحكم */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* رقم السؤال */}
          <span className="flex items-center justify-center bg-(--main-color,#4B5945)/10 text-(--main-color,#4B5945) text-xs font-black w-9 h-9 rounded-xl
           group-hover:bg-(--color-watermelon,#E07A5F)/10 group-hover:text-(--color-watermelon,#E07A5F) transition-all duration-300">
            #{question.questionNumber}
          </span>

          {/* نوع السؤال */}
          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${typeDetails.color}`}>
            {typeDetails.label}
          </span>

          {/* درجات السؤال */}
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-green-50 text-green-700 border border-green-100">
              +{question.correctAnswerGrade} Pts
            </span>
            {question.wrongAnswerGrade > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-red-50 text-red-600 border border-red-100">
                -{question.wrongAnswerGrade} Pts
              </span>
            )}
          </div>
        </div>

        {/* أزرار الأكشن الاحترافية الثلاثة */}
        <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100 opacity-90 group-hover:opacity-100 group-hover:bg-gray-100/50 transition-all">
       

          {/* 2. زر تعديل السؤال */}
          <button
            onClick={() => onEdit(question)}
            title="Edit Question"
            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-white rounded-lg shadow-2xs hover:shadow-sm transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
          </button>

          {/* 3. زر حذف السؤال */}
          <button
            onClick={() => onDelete(question.id)}
            title="Delete Question"
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-white rounded-lg shadow-2xs hover:shadow-sm transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.34 9m-4.72 0-.34-9m9.96-3.2h-3.48V4.17c0-.96-.72-1.75-1.68-1.75H11.04c-.96 0-1.68.79-1.68 1.75v1.63H5.82c-.96 0-1.68.79-1.68 1.75v1.17c0 .12.01.24.04.36L5.64 20.24c.12.96.94 1.76 1.92 1.76h8.88c.98 0 1.8-.8 1.92-1.76l1.4-12.13c.03-.12.04-.24.04-.36V7.57c0-.96-.72-1.75-1.68-1.75H5.82Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* متن السؤال (Body) */}
      <div className="mb-4 flex-1">
        <h3 className="text-gray-800 font-bold text-base md:text-lg leading-snug wrap-break-word group-hover:text-(--main-color,#4B5945) transition-colors duration-200">
          {question.questionText}
        </h3>

        {/* التلميحات والملفات المرفقة (Hints & Attachments) */}
        <div className="flex flex-wrap items-center gap-2 mt-2.5">
          {question.hint && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50/60 px-2 py-0.5 rounded border border-amber-100">
              <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
              Hint: {question.hint}
            </span>
          )}

          {/* معالجة حالة وجود ملف مرفق ديناميكياً */}
          {question.files && question.files.length > 0 ? (
            question.files.map((file) => (
              <a
                key={file.id}
                href={`http://153.92.210.41:3000/${file.filePath}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100/80 px-2 py-0.5 rounded border border-blue-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32a1.5 1.5 0 0 1-2.12-2.12l10.34-10.34" />
                </svg>
                Attachment Included
              </a>
            ))
          ) : (
            <span className="inline-flex items-center text-[11px] font-medium text-gray-400 bg-gray-50/50 px-2 py-0.5 rounded border border-gray-100">
              No Attachments
            </span>
          )}
        </div>
      </div>

      {/* الخيارات والإجابات (Fields Section) */}
      {question.fields && question.fields.length > 0 && (
        <div className="mt-2 pt-3.5 border-t border-gray-100 flex flex-col gap-2">
          {question.fields.map((fieldObj) => (
            <div
              key={fieldObj.id}
              className={`flex items-center justify-between p-2.5 rounded-xl text-xs md:text-sm transition-all duration-200 ${
                fieldObj.isCorrect
                  ? "bg-green-50/60 border border-green-200 text-green-900 font-semibold shadow-2xs"
                  : "bg-gray-50/80 border border-gray-100 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {fieldObj.isCorrect ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-600 shrink-0">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.14-.082l3.75-5.25Z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0 ml-1.5" />
                )}
                <span className="truncate">{fieldObj.field}</span>
              </div>

              {fieldObj.isCorrect && (
                <span className="text-[9px] uppercase font-bold tracking-wider bg-green-600 text-white px-1.5 py-0.5 rounded-md shadow-3xs">
                  Correct Answer
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};