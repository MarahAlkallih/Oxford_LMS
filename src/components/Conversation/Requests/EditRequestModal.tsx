import {  useEffect, useState } from "react";
import { Button } from "../../Buttons/SubmitBtn";
import { Modal } from "../../global/Modals";
import { CancelBtn } from "../../Buttons/CancelBtn";
import { toast } from "react-toastify";
import { InputField } from "../../Fields/InputField";
import { ErrorHandler } from "../../../utils/ErrorHandler";
import {useGetOneReqQuery,useEditRequestTypeMutation} from "../../../services/conversation/SuperAdmin/requestsMutation"
import { Priority } from "../../Const/Priority";
interface EditRequestTypeModalProps {
    open: boolean;
    onClose: () => void;
    requestId: number;
}

export const EditRequestTypeModal = ({ open, onClose, requestId }: EditRequestTypeModalProps) => {

const [requestType,setRequestType]=useState({
 name: "",
  priority: ""
})
const [originalReq, setOriginalReq] = useState({
  name: "",
  priority: "",
});
const { data: fetchedReq } = useGetOneReqQuery({ id: requestId }, {
  skip: !requestId,
});
useEffect(() => {
  if (fetchedReq) {
    const data = {
      name: fetchedReq.name,
      priority: fetchedReq.priority,
    };

    setRequestType(data);
    setOriginalReq(data);
  }
}, [fetchedReq]);
 const [editReq,{isLoading}]=useEditRequestTypeMutation()
 const handleEditReq = async () => {
  try {
    const payload: Partial<typeof requestType> = {};

    if (requestType.name !== originalReq.name) {
      payload.name = requestType.name;
    }

    if (requestType.priority !== originalReq.priority) {
      payload.priority = requestType.priority;
    }

    // ما تغير شي
    if (Object.keys(payload).length === 0) {
      toast.info("No changes detected");
      return;
    }

    console.log("reqq", payload);

    await editReq({
      id: requestId,
      data: payload,
    }).unwrap();

    toast.success("Updated Successfully");
    onClose();

  } catch (err) {
    ErrorHandler.show(err);
  }
};
    return (
 <Modal open={open} onClose={onClose}>
  <div className="flex flex-col gap-4 p-4 min-w-87.5">

    <h2 className="text-xl font-semibold text-center">
      Edit Request Type
    </h2>
   <div className="flex flex-col align-center ">
    <div>

   
    </div>
    <div className="flex-col">
 
<InputField
  label=" Name"

  value={requestType.name}
  onChange={(e) => setRequestType({ ...requestType, name: e.target.value })}
/>
 <div  className="p-2">
                            <Priority onSelect={(value) => {
                                setRequestType({ ...requestType, priority: value });
                            }} />
                        </div>



 
   </div>
  
    <div className="flex  pt-2">

      <div className="flex-1">
        <Button
          name={ isLoading ? "Editing...": "Edit Request"}
          onClick={handleEditReq}
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
   </div>
</Modal>
    );}
