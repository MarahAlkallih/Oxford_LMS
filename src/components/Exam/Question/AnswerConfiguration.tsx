import type { OptionField } from "../../../types/Question";

interface AnswerConfigurationProps {
  questionTypeId: number;
  currentSelectedType: string;
  isMultipleChoice: boolean;
  isTrueFalse: boolean;
  isWritten: boolean;
  options: OptionField[];
  trueFalseAnswer: boolean;
  setTrueFalseAnswer: (val: boolean) => void;
  handleOptionTextChange: (idx: number, val: string) => void;
  handleSelectCorrectOption: (idx: number) => void;
  addOption: () => void;
  removeOption: (idx: number) => void;
}

export const AnswerConfiguration = ({
  questionTypeId,
  currentSelectedType,
  isMultipleChoice,
  isTrueFalse,
  isWritten,
  options,
  trueFalseAnswer,
  setTrueFalseAnswer,
  handleOptionTextChange,
  handleSelectCorrectOption,
  addOption,
  removeOption
}: AnswerConfigurationProps) => {
  if (questionTypeId === 0) {
    return (
      <div className="p-6 bg-gray-50 rounded-xl border border-dashed border-gray-300 h-full flex items-center justify-center">
        <p className="text-gray-400 text-sm font-medium">Select a question type to configure answers.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-(--main-color)/5 rounded-xl border border-(--main-color)/20 h-full">
      <h3 className="text-lg font-bold text-(--main-color) mb-4">
        Answer Configuration ({currentSelectedType})
      </h3>

      {isMultipleChoice && (
        <div className="flex flex-col gap-3">
          <p className="text-xs text-gray-500 mb-1">Type options and select the correct one using the radio buttons:</p>
          {options.map((opt, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
              <input
                type="radio"
                name="correct-option-group"
                checked={opt.isCorrect}
                onChange={() => handleSelectCorrectOption(idx)}
                className="accent-(--main-color) w-4 h-4 cursor-pointer"
              />
              <input
                type="text"
                placeholder={`Option ${idx + 1}`}
                className="flex-1 border-0 focus:ring-0 text-sm p-1 outline-none"
                value={opt.field}
                onChange={(e) => handleOptionTextChange(idx, e.target.value)}
              />
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(idx)}
                  className="text-gray-400 hover:text-(--color-watermelon-dark) text-xs font-semibold px-2"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addOption}
            className="self-start mt-2 text-(--color-watermelon) hover:text-(--color-watermelon-dark) text-sm font-bold transition-colors flex items-center gap-1"
          >
            <span>+</span> Add Another Option
          </button>
        </div>
      )}

      {isTrueFalse && (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-gray-700">Select the correct statement:</p>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2 cursor-pointer bg-white px-5 py-3 rounded-lg border border-gray-200 shadow-sm hover:border-(--color-watermelon) transition-all">
              <input type="radio" name="tf" checked={trueFalseAnswer === true} onChange={() => setTrueFalseAnswer(true)} className="accent-(--color-watermelon) w-4 h-4" />
              <span className="font-semibold text-(--main-color)">True</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer bg-white px-5 py-3 rounded-lg border border-gray-200 shadow-sm hover:border-(--color-watermelon) transition-all">
              <input type="radio" name="tf" checked={trueFalseAnswer === false} onChange={() => setTrueFalseAnswer(false)} className="accent-(--color-watermelon) w-4 h-4" />
              <span className="font-semibold text-(--main-color)">False</span>
            </label>
          </div>
        </div>
      )}

      {isWritten && (
        <div className="flex flex-col gap-3">
          <p className="text-xs text-gray-500 mb-2">
            Enter one or more model answers / keywords. Students will see these after exam submission to review their mistakes:
          </p>
          {options.map((opt, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-(--color-watermelon) ml-2" />
              <input
                type="text"
                placeholder={`Model Answer / Key phrase ${idx + 1}`}
                className="flex-1 border-0 focus:ring-0 text-sm p-1 outline-none"
                value={opt.field}
                onChange={(e) => handleOptionTextChange(idx, e.target.value)}
              />
              {options.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeOption(idx)}
                  className="text-gray-400 hover:text-(--color-watermelon-dark) text-xs font-semibold px-2"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addOption}
            className="self-start mt-2 text-(--color-watermelon) hover:text-(--color-watermelon-dark) text-sm font-bold transition-colors flex items-center gap-1"
          >
            <span>+</span> Add Alternative Model Answer
          </button>
        </div>
      )}

      {!isMultipleChoice && !isTrueFalse && !isWritten && (
        <p className="text-sm text-gray-500 italic">Custom question type detected. Standard text submission will be supported.</p>
      )}
    </div>
  );
};