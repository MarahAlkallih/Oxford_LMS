import { useState } from "react";
import { Button } from "../../Buttons/SubmitBtn";
import { InputField } from "../../Fields/InputField";
import { Modal } from "../../global/Modals";
import { CancelBtn } from "../../Buttons/CancelBtn";
import { useCreateSessionTypeMutation } from "../../../services/sessions/type/typeMutations";
import { toast } from "react-toastify";
import { ErrorHandler } from "../../../utils/ErrorHandler";
interface AddSessionTypeModalProps {
    open: boolean;
    onClose: () => void;
}

export const AddSessionTypeModal = ({ open, onClose }: AddSessionTypeModalProps) => {

  const [type, setType] = useState({
    name:"",
    description:""
 });
  const [createSessionType, { isLoading ,isSuccess}] =
    useCreateSessionTypeMutation();

  const handleAddSessionType = async () => {

    try {

      const res = await createSessionType({
        name: type.name,
        description: type.description,
      }).unwrap();

      console.log(res);
      console.log(type)
      toast.success("Added successfully")
           

    setType({ name: "", description: "" });
      
       onClose();
      

    } catch (err) {
     ErrorHandler.show(err)
    }
  };
  

    return (
        <Modal open={open} onClose={onClose}>
  <div className="flex flex-col gap-4 p-4 min-w-87.5">

    <h2 className="text-xl font-semibold text-center">
      Add New Session Type
    </h2>

    <InputField
      label="Name"
      value={type.name}
      onChange={(e) =>
        setType({ ...type, name: e.target.value })
      }
    />

    <InputField
      label="Description"
      value={type.description}
      onChange={(e) =>
        setType({
          ...type,
          description: e.target.value,
        })
      }
    />

    <div className="flex  pt-2">

      <div className="flex-1">
        <Button
          name={isLoading ? "Adding..." : "Add Type"}
          onClick={handleAddSessionType}
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
