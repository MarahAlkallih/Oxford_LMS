import { ConfirmModal } from "../../modals/ConfirmModal";
import { useDeleteSessionExamMutation } from "../../../services/exams/exam-session/examSessionMutation";
import { toast } from "react-toastify";
interface DeleteModalProps{
    open:boolean,
    onClose:()=>void,
    id:number}
export const DeleteSessionEventModal=({open,onClose,id}:DeleteModalProps)=>{
  const [deleteEvent,{isLoading}]=useDeleteSessionExamMutation()
  const handelDelete=async()=>{
    try{
      
        const res=await deleteEvent({id}).unwrap()
     toast.success("Deleted Successfully")
     onClose();
        
    
    }catch(error)
    {
  toast.error("An error occord!")
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