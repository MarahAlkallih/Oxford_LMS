import { ConfirmModal } from "../../modals/ConfirmModal";
import { toast } from "react-toastify";
import { useDeleteSupervisorMutation } from "../../../services/sessions/supervisor/admin/supervisorMutation";
import { ErrorHandler } from "../../../utils/ErrorHandler";
interface DeleteModalProps{
    open:boolean,
    onClose:()=>void,
   
    id:number}
export const DeleteSupervisorModal=({open,onClose,id}:DeleteModalProps)=>{
  const [deleteSupervisor,{isLoading}]=useDeleteSupervisorMutation()
  const handelDelete=async()=>{
    try{
      
    const res=await deleteSupervisor({id}).unwrap()
     toast.success("Deleted Successfully")
     onClose();
       
    
    }catch(error)
    {
ErrorHandler.show(error)
    }
  }
    return(
        <ConfirmModal
            open={open}
            onClose={onClose} 
            onConfirm={handelDelete }   
            isLoading={isLoading}     />
    )

}