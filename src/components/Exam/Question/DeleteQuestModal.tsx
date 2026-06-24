import { ConfirmModal } from "../../modals/ConfirmModal";
import { useDeleteQuestionMutation } from "../../../services/exams/questions/questionMutation";
import { toast } from "react-toastify";
interface DeleteModalProps{
    open:boolean,
    onClose:()=>void,
   
    id:number}
export const DeleteQuestModal=({open,onClose,id}:DeleteModalProps)=>{
  const [deleteQuest]=useDeleteQuestionMutation()
  const handelDelete=async()=>{
    try{
      
    const res=await deleteQuest({id}).unwrap()
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