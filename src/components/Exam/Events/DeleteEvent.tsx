import { ConfirmModal } from "../../modals/ConfirmModal";
import { useDeleteExamEventMutation } from "../../../services/exams/events/examEventMutation";
import { toast } from "react-toastify";
interface DeleteModalProps{
    open:boolean,
    onClose:()=>void,
    id:number}
export const DeleteEventModal=({open,onClose,id}:DeleteModalProps)=>{
  const [deleteEvent,{isLoading}]=useDeleteExamEventMutation()
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
            onConfirm={handelDelete }        />
    )

}