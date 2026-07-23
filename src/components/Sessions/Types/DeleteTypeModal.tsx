import { ConfirmModal } from "../../modals/ConfirmModal";
import { useDeleteSessionTypeMutation } from "../../../services/sessions/type/typeMutations";
import { toast } from "react-toastify";
interface DeleteModalProps{
    open:boolean,
    onClose:()=>void,
   
    id:number}
export const DeleteSessionTypeModal=({open,onClose,id}:DeleteModalProps)=>{
  const [deleteType,{isLoading}]=useDeleteSessionTypeMutation()
  const handelDelete=async()=>{
    try{
      
    const res=await deleteType({id}).unwrap()
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