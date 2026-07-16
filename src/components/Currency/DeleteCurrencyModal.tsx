import { ConfirmModal } from "../modals/ConfirmModal";
import { useDeleteCurrencyMutation } from "../../services/currency/currencyMutation";
import { toast } from "react-toastify";
interface DeleteModalProps{
    open:boolean,
    onClose:()=>void,
    id:number}
export const DeleteCurrModal=({open,onClose,id}:DeleteModalProps)=>{
 const [deleteCurr,{isLoading}]=useDeleteCurrencyMutation()
  const handelDelete=async()=>{
    try{
      
        const res=await deleteCurr({id}).unwrap()
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