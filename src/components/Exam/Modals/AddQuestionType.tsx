import {  useState } from "react";
import { Button } from "../../Buttons/SubmitBtn";
import { InputField } from "../../Fields/InputField";
import { Modal } from "../../global/Modals";
import { CancelBtn } from "../../Buttons/CancelBtn";

import { toast } from "react-toastify";
import { useCreateQuestionTypeMutation } from "../../../services/exams/quest-types/typeMutation";
interface AddQuestionTypeModalProps {
    open: boolean;
    onClose: () => void;
}

export const AddQuestionTypeModal = ({ open, onClose }: AddQuestionTypeModalProps) => {
 const [questionType, setQuestionType] = useState({
    type:"",
    description:""
 });
  const [createQuestionType, { isLoading ,isSuccess}] =useCreateQuestionTypeMutation();

 const handleAddType = async () => {
  try {
    await createQuestionType({
      type: questionType.type,
      description: questionType.description,
    }).unwrap();

    toast.success("Added Successfully");

    setQuestionType({
      type: "",
      description: "",
    });

    onClose();
  } catch (err) {
    console.log(err);
    toast.error("Add Failed");
  }
};

    return (
        <Modal open={open} onClose={onClose}>
  <div className="flex flex-col gap-4 p-4 min-w-87.5">

    <h2 className="text-xl font-semibold text-center">
      Add New Question Type
    </h2>
   <div className="flex flex-col align-center ">
  <InputField
      label="Type"
      value={questionType.type}
      onChange={(e) =>
        setQuestionType({ ...questionType, type: e.target.value })
      }
    />

    <InputField
      label="Description"
      value={questionType.description}
      onChange={(e) =>
        setQuestionType({
          ...questionType,
          description: e.target.value,
        })
      }
    />


   </div>
  
    <div className="flex  pt-2">

      <div className="flex-1">
        <Button
          name={ isLoading ? "Adding...": "Add"}
          onClick={handleAddType}
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
}
