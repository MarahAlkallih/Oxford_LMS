import { useEffect, useState } from "react";
import { Button } from "../../Buttons/SubmitBtn";
import { InputField } from "../../Fields/InputField";
import { Modal } from "../../global/Modals";
import { CancelBtn } from "../../Buttons/CancelBtn";
import { toast } from "react-toastify";
import { useGetOneTypeQuery } from "../../../services/exams/exam-types/typeQuery";
import { useEditExamTypeMutation } from "../../../services/exams/exam-types/typeMutation";

interface EditExamTypeModalProps {
    open: boolean;
    onClose: () => void;
    id: number | undefined;
}

export const EditExamTypeModal = ({ open, onClose,id }: EditExamTypeModalProps) => {
const { data: et, isLoading: etLoad } =
  useGetOneTypeQuery(
    { id: id! },
    {
      skip: !id,
    }
  );
 const[ edit,{isLoading:editLoad,isSuccess}]=useEditExamTypeMutation()
 const [examType, setExamType] = useState({
    name:"",
    description:""
 });

const handleEdit = async () => {
  if (!id) return;

  try {
    await edit({
      id,
      data: {
        name: examType.name,
        description: examType.description,
      },
    }).unwrap();

    toast.success("Edit Successfully");

    setExamType({
      name: "",
      description: "",
    });

    onClose();
  } catch (err) {
    console.log(err);
    toast.error("Edit Failed");
  }
};
useEffect(() => {
  if (open && et) {
    setExamType({
      name: et.name,
      description: et.description,
    });
  }
}, [et, open]);


if (etLoad) {
  return (
    <Modal open={open} onClose={onClose}>
      <p>Loading...</p>
    </Modal>
  );
}
    return (
        <Modal open={open} onClose={onClose}>
  <div className="flex flex-col gap-4 p-4 min-w-87.5">

    <h2 className="text-xl font-semibold text-center">
      Edit Exam Type
    </h2>
   <div className="flex flex-col align-center ">
  <InputField
      label="Name"
      value={ examType.name}
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
          name={ editLoad ? "Editing...": "Edit"}
          onClick={handleEdit}
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
