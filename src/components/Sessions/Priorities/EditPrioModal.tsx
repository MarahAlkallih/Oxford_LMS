import { useEffect, useState } from "react";
import { Button } from "../../Buttons/SubmitBtn";
import { InputField } from "../../Fields/InputField";
import { Modal } from "../../global/Modals";
import { CancelBtn } from "../../Buttons/CancelBtn";
import { useGetOneSPrioQuery } from "../../../services/sessions/priorities/prioritiesQuery";
import { useEditSessionPrioMutation } from "../../../services/sessions/priorities/prioritiesMutation";
import { ErrorHandler } from "../../../utils/ErrorHandler";
import { toast } from "react-toastify";
interface EditSessionTypeModalProps {
    open: boolean;
    onClose: () => void;
    id:number
}

export const EditSessionPrioModal = ({ open, onClose,id }: EditSessionTypeModalProps) => {
    const {data:Prio}=useGetOneSPrioQuery({id:id})
    const [editPrio,{isLoading}]=useEditSessionPrioMutation()
  const [prio, setPrio] = useState({
  name: "",
  description: "",
});
 useEffect(() => {
  if (Prio) {
    setPrio({
      name: Prio.name,
      description: Prio.description,
    });
  }
}, [Prio]);
 console.log(prio)


  const handleEditType = async () => {

    try {
     await editPrio({
    id,
    data: prio,
}).unwrap();

toast.success("Edited Successfully");
onClose();
     
      

    } catch (err) {
      ErrorHandler.show(err)
    }
  };
  

    return (
        <Modal open={open} onClose={onClose}>
  <div className="flex flex-col gap-4 p-4 min-w-87.5">

    <h2 className="text-xl font-semibold text-center">
      Edit Priority
    </h2>

    <InputField
      label="Name"
      value={prio.name}
      onChange={(e) =>
        setPrio(prev=>
            
           ( { ...prev, name: e.target.value })
        )
      }
    />

    <InputField
      label="Description"
      value={prio.description}
      onChange={(e) =>
        setPrio(prev=>
            
           ( { ...prev, description: e.target.value })
        )
      }
    />

    <div className="flex  pt-2">

      <div className="flex-1">
        <Button
          name={isLoading ? "Editing..." : "Edit "}
          onClick={handleEditType}
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
