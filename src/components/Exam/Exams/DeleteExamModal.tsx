import { ConfirmModal } from "../../modals/ConfirmModal";
import { useDeleteExamMutation } from "../../../services/exams/exams/examMutation";
import { toast } from "react-toastify";
interface DeleteModalProps{
    open:boolean,
    onClose:()=>void,
    id:number}
export const DeleteExamModal=({open,onClose,id}:DeleteModalProps)=>{
  const [deleteExam,{isLoading}]=useDeleteExamMutation()
  const handelDelete=async()=>{
    try{
      
        const res=await deleteExam({id}).unwrap()
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