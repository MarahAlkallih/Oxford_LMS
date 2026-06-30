import { useState } from "react";
import { useGetAllQuestTypesQuery } from "../services/exams/quest-types/typeQuery";
import { useAddQuestWithFieldsMutation } from "../services/exams/questions/questionMutation";
import { toast } from "react-toastify";
import type { OptionField } from "../types/Question";

interface UseAddQuestionFormProps {
  examInstanceId: number;

}

export const useAddQuestionForm = ({ examInstanceId }: UseAddQuestionFormProps) => {
  const { data: questTypes } = useGetAllQuestTypesQuery({ page: 1, limit: 10 });
  const [addQuest, { isLoading }] = useAddQuestWithFieldsMutation();

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

  const handleTypeSelect = (typeName: string) => {
    const selected = questTypes?.data.find((s) => s.type === typeName);
    const selectedId = selected?.id || 0;
    
    setQuest(prev => ({ ...prev, questionTypeId: selectedId }));

    const lowerType = typeName.toLowerCase().trim();
    if (lowerType.includes("multiple")) {
      setOptions([{ field: '', isCorrect: true }, { field: '', isCorrect: false }]);
    } else if (lowerType.includes("written") || lowerType.includes("essay")) {
      setOptions([{ field: '', isCorrect: true }]); 
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

  const handleAdd = async () => {

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

      await addQuest(formData).unwrap();
      toast.success("Question added successfully", { style: { backgroundColor: '#4B5945', color: '#f4f3ec' } });
    
    } catch (error) {
      toast.error("Failed to add question", { style: { backgroundColor: '#E07A5F', color: '#fff' } });
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
    isLoading,
    currentSelectedType,
    isMultipleChoice,
    isTrueFalse,
    isWritten,
    handleTypeSelect,
    handleOptionTextChange,
    handleSelectCorrectOption,
    addOption,
    removeOption,
    handleAdd,
    setQuest
  };
};