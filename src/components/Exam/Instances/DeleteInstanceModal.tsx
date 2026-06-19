import { ConfirmModal } from "../../modals/ConfirmModal";
import { useDeleteExamInstanceMutation } from "../../../services/exams/exam-instances/exam-instancesMutation";
import { toast } from "react-toastify";
interface DeleteModalProps{
    open:boolean,
    onClose:()=>void,
    id:number}
export const DeleteInstanceModal=({open,onClose,id}:DeleteModalProps)=>{
  const [deleteInst,{isLoading}]=useDeleteExamInstanceMutation()
  const handelDelete=async()=>{
    try{
      
        const res=await deleteInst({id}).unwrap()
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