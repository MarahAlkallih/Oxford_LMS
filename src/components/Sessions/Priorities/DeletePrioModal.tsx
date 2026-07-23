import { ConfirmModal } from "../../modals/ConfirmModal";
import { toast } from "react-toastify";
import { useDeleteSessionPrioMutation } from "../../../services/sessions/priorities/prioritiesMutation";
interface DeleteModalProps{
    open:boolean,
    onClose:()=>void,
   
    id:number}
export const DeleteSessionPrioModal=({open,onClose,id}:DeleteModalProps)=>{
  const [deletePrio,{isLoading}]=useDeleteSessionPrioMutation()
  const handelDelete=async()=>{
    try{
      
    const res=await deletePrio({id}).unwrap()
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
            isLoading={isLoading}     />
    )

}