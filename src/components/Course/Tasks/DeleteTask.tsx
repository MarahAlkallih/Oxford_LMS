import { useDeleteTaskMutation } from "../../../services/courses/tasks/taskMutations";
import { ErrorHandler } from "../../../utils/ErrorHandler";
import { ConfirmModal } from "../../modals/ConfirmModal";
import { toast } from "react-toastify";
interface DeleteModalProps{
    open:boolean,
    onClose:()=>void,
    id:number}
export const DeleteTaskModal=({open,onClose,id}:DeleteModalProps)=>{
const [deleteTask,{isLoading}]=useDeleteTaskMutation()
  const handelDelete=async()=>{
    try{
      
        const res=await deleteTask({id}).unwrap()
     toast.success("Task Deleted Successfully")
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