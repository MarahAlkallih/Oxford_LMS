import { useEffect, useState } from "react";
import { Button } from "../../Buttons/SubmitBtn";
import { InputField } from "../../Fields/InputField";
import { Modal } from "../../global/Modals";
import { CancelBtn } from "../../Buttons/CancelBtn";
import {useGetOneSTypeQuery} from "../../../services/sessions/type/typeQuery"
import { useEditSessionTypeMutation } from "../../../services/sessions/type/typeMutations";
import { ErrorHandler } from "../../../utils/ErrorHandler";
import { toast } from "react-toastify";
interface EditSessionTypeModalProps {
    open: boolean;
    onClose: () => void;
    id:number
}

export const EditSessionTypeModal = ({ open, onClose,id }: EditSessionTypeModalProps) => {
    const {data:Type}=useGetOneSTypeQuery({id:id})
    const [editType,{isLoading}]=useEditSessionTypeMutation()
  const [type, setType] = useState({
  name: "",
  description: "",
});
 useEffect(() => {
  if (Type) {
    setType({
      name: Type.name,
      description: Type.description,
    });
  }
}, [Type]);
 console.log(type)


  const handleEditType = async () => {

    try {
     await editType({
    id,
    data: type,
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
      Edit Type
    </h2>

    <InputField
      label="Name"
      value={type.name}
      onChange={(e) =>
        setType(prev=>
            
           ( { ...prev, name: e.target.value })
        )
      }
    />

    <InputField
      label="Description"
      value={type.description}
      onChange={(e) =>
        setType(prev=>
            
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
