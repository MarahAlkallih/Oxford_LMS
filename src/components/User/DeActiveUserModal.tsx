import { useDeActiveUserMutation } from "../../services/users/User";
import { Button } from "../Buttons/SubmitBtn";

import { Modal } from "../global/Modals";
import { CancelBtn } from "../Buttons/CancelBtn";
import { toast } from "react-toastify";
import { ErrorHandler } from "../../utils/ErrorHandler";

interface DeActiveModalProps {
    open: boolean;
    onClose: () => void;
    id:number
    userName:string
}

export const DeActiveUserModal = ({ open, onClose, id,userName }: DeActiveModalProps) => {
const [deactive,{isLoading}]=useDeActiveUserMutation()
  const handelDeActiveUser=async()=>{
    try{
await deactive({id:id}).unwrap()
toast.success("Deactivated successfully")
onClose()
    }catch(err){
        ErrorHandler.show(err)

    }
      
  }
    return (
        <Modal open={open} onClose={onClose}>
  <div className="flex flex-col align-middle gap-4 p-4 min-w-87.5">

    <h2 className="text-xl font-semibold text-center">
     DeActive User
    </h2>

       <p>
        Do you want to DeActive {userName} ?
       </p>
       <div>
        <div>
            
        </div>
 <Button
          name={isLoading?"Loading":"DeActive"}
          onClick={handelDeActiveUser}
        />
      </div>

      <div className="flex-1">
        <CancelBtn
          name="Cancel"
          onClick={onClose}
        />
      </div>
       </div>
       

    
</Modal>
    );
}
