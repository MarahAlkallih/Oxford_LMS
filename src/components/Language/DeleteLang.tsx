import { ConfirmModal } from "../modals/ConfirmModal";
import { useDeleteLanguageMutation } from "../../services/languages/languageService";
import { toast } from "react-toastify";
interface DeleteModalProps{
    open:boolean,
    onClose:()=>void,
   
    id:number}
export const DeleteLangModal=({open,onClose,id}:DeleteModalProps)=>{
  const [deleteLang]=useDeleteLanguageMutation()
  const handelDelete=async()=>{
    try{
      
    const res=await deleteLang({id}).unwrap()
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