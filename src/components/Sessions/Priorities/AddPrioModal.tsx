import { useState } from "react";
import { Button } from "../../Buttons/SubmitBtn";
import { InputField } from "../../Fields/InputField";
import { Modal } from "../../global/Modals";
import { CancelBtn } from "../../Buttons/CancelBtn";
import { useCreateSessionPrioMutation } from "../../../services/sessions/priorities/prioritiesMutation";
import { toast } from "react-toastify";
import { ErrorHandler } from "../../../utils/ErrorHandler";
interface AddSessionPrioModalProps {
    open: boolean;
    onClose: () => void;
}

export const AddSessionPrioModal = ({ open, onClose }: AddSessionPrioModalProps) => {

  const [prio, setPrio] = useState({
    name:"",
    description:""
 });
  const [createSessionPrio, { isLoading ,isSuccess}] =
    useCreateSessionPrioMutation();

  const handleAddSessionType = async () => {

    try {

      const res = await createSessionPrio({
        name: prio.name,
        description: prio.description,
      }).unwrap();

      console.log(res);
      console.log(prio)
      toast.success("Added successfully")
           

    setPrio({ name: "", description: "" });
      
       onClose();
      

    } catch (err) {
     ErrorHandler.show(err)
    }
  };
  

    return (
        <Modal open={open} onClose={onClose}>
  <div className="flex flex-col gap-4 p-4 min-w-87.5">

    <h2 className="text-xl font-semibold text-center">
      Add New Session Priorities
    </h2>

    <InputField
      label="Name"
      value={prio.name}
      onChange={(e) =>
        setPrio({ ...prio, name: e.target.value })
      }
    />

    <InputField
      label="Description"
      value={prio.description}
      onChange={(e) =>
        setPrio({
          ...prio,
          description: e.target.value,
        })
      }
    />

    <div className="flex  pt-2">

      <div className="flex-1">
        <Button
          name={isLoading ? "Adding..." : "Add Priorities"}
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
