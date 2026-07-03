import { useParams, useNavigate } from "react-router-dom";
import { QuestionForm } from "./QuestionForm";
import { useGetQuestionsQuery } from "../../../services/exams/questions/questionQuery"; // هاد الـ hook تبع الـ Get عندكِ

export const EditQuestionPage = () => {
  const { examInstanceId, questionId } = useParams();
  const navigate = useNavigate();
  console.log(examInstanceId)
  // 1. جلب بيانات السؤال الحالي من الباك إند بناءً على الـ ID بالرابط
  const { data: questionData, isLoading, error } = useGetQuestionsQuery({
    examInstanceId: Number(examInstanceId),
    // questionId: Number(questionId)
  });
  console.log(questionData)
  if (isLoading) {
    return <div className="text-center p-10 font-bold text-gray-500">Loading Question Data...</div>;
  }

  if (error || !questionData) {
    return <div className="text-center p-10 text-red-500 font-bold">Failed to load question.</div>;
  }

  const currentQuestion = (questionData.data ?? questionData)?.find(
    (q: { id: number }) => q.id === Number(questionId)
  );

  if (!currentQuestion) {
    return <div className="text-center p-10 text-red-500 font-bold">Question not found.</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* زر اختياري للرجوع لورا */}
      <button 
        onClick={() => navigate(-1)} 
        className="mb-4 text-sm font-bold text-gray-500 hover:text-(--main-color) flex items-center gap-1"
      >
        ← Back to Questions
      </button>

      {/* 2. رندر الفورم وتمرير البيانات الجاهزة له */}
      <QuestionForm 
        examInstanceId={Number(examInstanceId)} 
        initialData={currentQuestion}
        isEdit={true} 
      />
    </div>
  );
};