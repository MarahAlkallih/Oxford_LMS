import { ConfirmModal } from "../../modals/ConfirmModal";
import { useDeleteFilesMutation } from "../../../services/exams/files/filesMutation";
import { toast } from "react-toastify";
interface DeleteModalProps{
    open:boolean,
    onClose:()=>void,
    id:number}
export const DeleteFileModal=({open,onClose,id}:DeleteModalProps)=>{
  const [deleteFile,{isLoading}]=useDeleteFilesMutation()
  const handelDelete=async()=>{
    try{
      
        const res=await deleteFile({id}).unwrap()
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