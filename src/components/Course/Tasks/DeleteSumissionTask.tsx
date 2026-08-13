import { useDeleteSubMutation } from "../../../services/courses/tasks/taskMutations";
import { ErrorHandler } from "../../../utils/ErrorHandler";
import { ConfirmModal } from "../../modals/ConfirmModal";
import { toast } from "react-toastify";
interface DeleteModalProps{
    open:boolean,
    onClose:()=>void,
    id:number}
export const DeleteSubModal=({open,onClose,id}:DeleteModalProps)=>{
const [deleteSub,{isLoading}]=useDeleteSubMutation()
  const handelDelete=async()=>{
    try{
      
        const res=await deleteSub({id}).unwrap()
     toast.success("Submission Deleted Successfully")
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
            isLoading={isLoading}
            />
    )

}