import { useEffect, useState } from "react";
import { Button } from "../../Buttons/SubmitBtn";
import { InputField } from "../../Fields/InputField";
import { Modal } from "../../global/Modals";
import { CancelBtn } from "../../Buttons/CancelBtn";
import { toast } from "react-toastify";
import { useGetOneQuestTypeQuery } from "../../../services/exams/quest-types/typeQuery";
import { useEditQuestionTypeMutation } from "../../../services/exams/quest-types/typeMutation";

interface EditQuestionTypeModalProps {
    open: boolean;
    onClose: () => void;
    id: number | undefined;
}

export const EditQuestionTypeModal = ({ open, onClose,id }: EditQuestionTypeModalProps) => {
const { data: et, isLoading: etLoad } =
  useGetOneQuestTypeQuery(
    { id: id! },
    {
      skip: !id,
    }
  );
 const[ edit,{isLoading:editLoad,isSuccess}]=useEditQuestionTypeMutation()
 const [questType, setQuestType] = useState({
    type:"",
    description:""
 });

const handleEdit = async () => {
  if (!id) return;

  try {
    await edit({
      id,
      data: {
        type: questType.type,
        description: questType.description,
      },
    }).unwrap();

    toast.success("Edit Successfully");

    setQuestType({
      type: "",
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
    setQuestType({
      type: et.type,
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
      Edit Question Type
    </h2>
   <div className="flex flex-col align-center ">
  <InputField
      label="Type"
      value={ questType.type}
      onChange={(e) =>
        setQuestType({ ...questType, type: e.target.value })
      }
    />

    <InputField
      label="Description"
      value={questType.description}
      onChange={(e) =>
        setQuestType({
          ...questType,
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
