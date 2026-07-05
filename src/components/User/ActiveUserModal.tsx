import { useActiveUserMutation } from "../../services/users/User";
import { Button } from "../Buttons/SubmitBtn";

import { Modal } from "../global/Modals";
import { CancelBtn } from "../Buttons/CancelBtn";
import { toast } from "react-toastify";
import { ErrorHandler } from "../../utils/ErrorHandler";

interface ActiveModalProps {
    open: boolean;
    onClose: () => void;
    id:number
    userName:string
}

export const ActiveUserModal = ({ open, onClose, id,userName }: ActiveModalProps) => {
const [active,{isLoading}]=useActiveUserMutation()
  const handelActiveUser=async()=>{
    try{
await active({id:id}).unwrap()
toast.success("Activeted successfully")
onClose()
    }catch(err){
        ErrorHandler.show(err)

    }
      
  }
    return (
        <Modal open={open} onClose={onClose}>
  <div className="flex flex-col gap-4 p-4 min-w-87.5">

    <h2 className="text-xl font-semibold text-center">
     Active User
    </h2>

       <p>
        Do you want to active {userName} ?
       </p>
        <Button
          name={isLoading?"Loading":"Active"}
          onClick={handelActiveUser}
        />
      </div>

      <div className="flex-1">
        <CancelBtn
          name="Cancel"
          onClick={onClose}
        />
      </div>

    
</Modal>
    );
}
