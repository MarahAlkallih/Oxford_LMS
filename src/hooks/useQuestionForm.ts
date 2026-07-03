import { useState, useEffect } from "react";
import { useGetAllQuestTypesQuery } from "../services/exams/quest-types/typeQuery";
import { useAddQuestWithFieldsMutation, useUpdateQuestionMutation } from "../services/exams/questions/questionMutation";
import { toast } from "react-toastify";
import type { OptionField, Question } from "../types/Question";
import { ErrorHandler } from "../utils/ErrorHandler";

interface UseQuestionFormProps {
  examInstanceId: number;
  initialData?: Question;
  isEdit?: boolean;
}

export const useQuestionForm = ({ examInstanceId, initialData, isEdit = false }: UseQuestionFormProps) => {
  const { data: questTypes } = useGetAllQuestTypesQuery({ page: 1, limit: 10 });
  const [addQuest, { isLoading }] = useAddQuestWithFieldsMutation();
  const [updateQuestion, { isLoading: isUpdating }] = useUpdateQuestionMutation();
  const loading = isLoading || isUpdating;

  const [quest, setQuest] = useState({
    examInstanceId: examInstanceId,
    questionTypeId: 0,
    questionText: "",
    questionNumber: 0,
    correctAnswerGrade: 0,
    wrongAnswerGrade: 0,
    hint: "",
    showGrade: false,
  });

  const [options, setOptions] = useState<OptionField[]>([
    { field: '', isCorrect: true },
    { field: '', isCorrect: false }
  ]);
  const [trueFalseAnswer, setTrueFalseAnswer] = useState<boolean>(true);
  const [file, setFile] = useState<File | null>(null);

  const currentSelectedType = questTypes?.data.find(t => t.id === quest.questionTypeId)?.type || "";
  const normalizedType = currentSelectedType.toLowerCase().trim();

  const isMultipleChoice = normalizedType.includes("multiple");
  const isTrueFalse = normalizedType.includes("true") || normalizedType.includes("false");
  const isWritten = normalizedType.includes("written") || normalizedType.includes("essay");
useEffect(() => {
    if (!initialData || !questTypes) return;

    setQuest({
        examInstanceId: initialData.examInstanceId,
        questionTypeId: initialData.questionTypeId,
        questionText: initialData.questionText,
        questionNumber: initialData.questionNumber,
        correctAnswerGrade: initialData.correctAnswerGrade,
        wrongAnswerGrade: initialData.wrongAnswerGrade,
        hint: initialData.hint ?? "",
        showGrade: initialData.showGrade,
    });

    // ✨ التعديل الذهبي: احتفظي بالـ id الخاص بكل خيار قادم من الباك إند
    if (initialData.fields) {
      setOptions(
          initialData.fields.map(f => ({
              id: f.id, // 🔥 أضيفي هذا السطر فوراً!
              field: f.field,
              isCorrect: f.isCorrect
          }))
      );
    }

    if ((initialData as any).trueFalseCorrectAnswer !== undefined) {
      setTrueFalseAnswer(String((initialData as any).trueFalseCorrectAnswer) === "true");
    }

}, [initialData, questTypes]);

  const handleTypeSelect = (typeName: string) => {
    const selected = questTypes?.data.find(s => s.type === typeName);
    const selectedId = selected?.id || 0;
    const typeChanged = selectedId !== quest.questionTypeId;

    setQuest(prev => ({
      ...prev,
      questionTypeId: selectedId
    }));

    if (isEdit && !typeChanged) return;

    const lowerType = typeName.toLowerCase();
    if (lowerType.includes("multiple")) {
      setOptions([
        { field: "", isCorrect: true },
        { field: "", isCorrect: false }
      ]);
    } else if (lowerType.includes("written") || lowerType.includes("essay")) {
      setOptions([
        { field: "", isCorrect: true }
      ]);
    }
  };

  const handleOptionTextChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index].field = value;
    setOptions(newOptions);
  };

  const handleSelectCorrectOption = (index: number) => {
    const newOptions = options.map((opt, idx) => ({
      ...opt,
      isCorrect: idx === index
    }));
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, { field: '', isCorrect: isWritten }]);
  
  const removeOption = (index: number) => {
    const minOptions = isMultipleChoice ? 2 : 1;
    if (options.length > minOptions) {
      setOptions(options.filter((_, idx) => idx !== index));
    }
  };

 const handleSubmit = async () => {
  if (!quest.questionTypeId) {
    toast.error("Please select a question type");
    return;
  }

  if (isMultipleChoice) {
    const hasCorrect = options.some(o => o.isCorrect && o.field.trim() !== "");
    if (!hasCorrect) {
      toast.error("Please provide text for the options and mark the correct one.");
      return;
    }
  }

  if (isWritten) {
    const hasModelAnswer = options.some(o => o.field.trim() !== "");
    if (!hasModelAnswer) {
      toast.error("Please provide at least one model answer for student review.");
      return;
    }
  }

  try {
    console.log("questtt", quest);
    const formData = new FormData();
    formData.append('examInstanceId', String(quest.examInstanceId));
    formData.append('questionTypeId', String(quest.questionTypeId));
    formData.append('questionText', quest.questionText);
    formData.append('questionNumber', String(quest.questionNumber));
    formData.append('correctAnswerGrade', String(quest.correctAnswerGrade));
    formData.append('wrongAnswerGrade', String(quest.wrongAnswerGrade));
    formData.append('showGrade', String(quest.showGrade));
    if (quest.hint) formData.append('hint', quest.hint);
    if (file) formData.append('file', file);

    if (isMultipleChoice) {
      formData.append('fields', JSON.stringify(options));
    } else if (isWritten) {
      const writtenAnswers = options
        .filter(o => o.field.trim() !== "")
        .map(o => ({ field: o.field, isCorrect: true }));
      formData.append('fields', JSON.stringify(writtenAnswers));
    } else if (isTrueFalse) {
      formData.append('trueFalseCorrectAnswer', String(trueFalseAnswer));
    }

    // 🔍 🚀 سطر السحر لطباعة محتويات الـ FormData بالكامل كـ Object واضح في الـ Console:
    console.log("🔥 ACTUAL FORM DATA PAYLOAD:", Object.fromEntries(formData.entries()));

    // ✨ المنطق يعمل الآن بشكل صحيح لأن الهوك أصبح يدرك قيمة `isEdit`
    if (isEdit && initialData) {
      await updateQuestion({
        id: initialData.id,
        body: formData,
      }).unwrap();
      toast.success("Question updated successfully");
    } else {
      await addQuest(formData).unwrap();
      toast.success("Question added successfully");
    }
  } catch (error) {
    ErrorHandler.show(error);
    toast.error(isEdit ? "Failed to update question" : "Failed to add question", {
      style: { backgroundColor: '#E07A5F', color: '#fff' }
    });
    console.error(error);
  }
};
  return {
    quest,
    questTypes,
    options,
    trueFalseAnswer,
    setTrueFalseAnswer,
    file,
    setFile,
    isLoading: loading, 
    currentSelectedType,
    isMultipleChoice,
    isTrueFalse,
    isWritten,
    handleTypeSelect,
    handleOptionTextChange,
    handleSelectCorrectOption,
    addOption,
    removeOption,
    handleSubmit,
    setQuest
  };
};