import { useEffect, useState } from "react";
import { Button } from "../../Buttons/SubmitBtn";
import { InputField } from "../../Fields/InputField";
import { Modal } from "../../global/Modals";
import { CancelBtn } from "../../Buttons/CancelBtn";
 import { useCreateExamTypeMutation } from "../../../services/exams/exam-types/typeMutation";
import { toast } from "react-toastify";
interface AddExamTypeModalProps {
    open: boolean;
    onClose: () => void;
}

export const AddExamTypeModal = ({ open, onClose }: AddExamTypeModalProps) => {
 const [examType, setExamType] = useState({
    name:"",
    description:""
 });
  const [createExamType, { isLoading ,isSuccess}] =useCreateExamTypeMutation();

 const handleAddType = async () => {
  try {
    await createExamType({
      name: examType.name,
      description: examType.description,
    }).unwrap();

    toast.success("Added Successfully");

    setExamType({
      name: "",
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
      Add New Exam Type
    </h2>
   <div className="flex flex-col align-center ">
  <InputField
      label="Name"
      value={examType.name}
      onChange={(e) =>
        setExamType({ ...examType, name: e.target.value })
      }
    />

    <InputField
      label="Description"
      value={examType.description}
      onChange={(e) =>
        setExamType({
          ...examType,
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
