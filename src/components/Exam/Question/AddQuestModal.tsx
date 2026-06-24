
import CustomDropdown from "../../Fields/DropDown";
import { InputField } from "../../Fields/InputField";
import { CheckBox } from "../../Fields/CheackBox";
import { useAddQuestionForm } from "../../../hooks/useAddQuestionForm";
import { AnswerConfiguration } from "./AnswerConfiguration";
import { AttachmentUpload } from "./AttachmentUpload";
import { useParams } from "react-router-dom";



export const AddQuestModal = () => {
    const {id}=useParams();
    const examInstanceId=Number(id);
  const {
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
  } = useAddQuestionForm({ examInstanceId:examInstanceId });
  console.log(examInstanceId)
  return (
  
      // <div className="bg-(--light-color) p-8 rounded-2xl w-full max-w-5xl mx-auto 
      // overflow-y-auto max-h-[90vh] shadow-2xl text-left" dir="ltr">
        <div>
        <div className="mb-8 border-b-2 border-(--color-watermelon) pb-4">
          <h2 className="text-3xl font-extrabold text-(--main-color)">Add New Question</h2>
          <p className="text-gray-500 mt-1 text-sm">Fill in the details below to add a question to this exam instance.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
          <div className="flex flex-col gap-5">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
              <label className="block text-sm font-bold text-(--main-color) mb-3">Question Type</label>
              <CustomDropdown
                options={questTypes?.data.map((q) => q.type) || []}
                placeholder="Select Question Type..."
                onSelect={(value) => handleTypeSelect(value)}
              />
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
               <InputField
                label="Question Text"
                value={quest.questionText}
                onChange={(e) => setQuest(prev => ({ ...prev, questionText: e.target.value }))}
              />
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
              <InputField
                label="Question Number"
                type="number"
                value={String(quest.questionNumber)}
                onChange={(e) => setQuest(prev => ({ ...prev, questionNumber: parseInt(e.target.value) || 0 }))}
              />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 gap-4">
              <InputField
                label="Correct Grade"
                type="number"
                value={String(quest.correctAnswerGrade)}
                onChange={(e) => setQuest(prev => ({ ...prev, correctAnswerGrade: parseInt(e.target.value) || 0 }))}
              />
              <InputField
                label="Wrong Grade"
                type="number"
                value={String(quest.wrongAnswerGrade)}
                onChange={(e) => setQuest(prev => ({ ...prev, wrongAnswerGrade: parseInt(e.target.value) || 0 }))}
              />
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
              <InputField
                label="Hint (Optional)"
                value={quest.hint}
                onChange={(e) => setQuest(prev => ({ ...prev, hint: e.target.value }))}
              />
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
              <span className="text-sm font-bold text-(--main-color)">Student Visibility</span>
              <CheckBox
                checked={quest.showGrade}
                onChange={() => setQuest(prev => ({ ...prev, showGrade: !prev.showGrade }))}
                label="Show Grade to Student"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-300 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnswerConfiguration
            questionTypeId={quest.questionTypeId}
            currentSelectedType={currentSelectedType}
            isMultipleChoice={isMultipleChoice}
            isTrueFalse={isTrueFalse}
            isWritten={isWritten}
            options={options}
            trueFalseAnswer={trueFalseAnswer}
            setTrueFalseAnswer={setTrueFalseAnswer}
            handleOptionTextChange={handleOptionTextChange}
            handleSelectCorrectOption={handleSelectCorrectOption}
            addOption={addOption}
            removeOption={removeOption}
          />

          <AttachmentUpload file={file} setFile={setFile} />
        </div>

        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
          {/* <button onClick={onClose} className="px-8 py-3 font-bold text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all shadow-sm">
            Cancel
          </button> */}
          <button 
            onClick={handleAdd}
            disabled={isLoading}
            className={`px-8 py-3 font-bold text-white rounded-xl shadow-sm transition-all ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-(--color-watermelon) hover:bg-(--color-watermelon-dark) hover:-translate-y-0.5 hover:shadow-md'
            }`}
          >
            {isLoading ? 'Saving...' : 'Save Question'}
          </button>
        </div>

      </div>
  
  );
};