import { ConfirmModal } from "../../modals/ConfirmModal";
import { useDeleteEndFormMutation } from "../../../services/exams/forms/endFormMutation";
import { useDeleteStartFormMutation } from "../../../services/exams/forms/startFormMutation";
import { toast } from "react-toastify";
interface DeleteModalProps{
    open:boolean,
    onClose:()=>void,
    type:string,
    id:number}
export const DeleteFormModal=({open,onClose,type,id}:DeleteModalProps)=>{
 const [deleteForm,{isLoading}]=useDeleteEndFormMutation();
 const [deleteStartForm]=useDeleteStartFormMutation()
  const handelDelete=async()=>{
    try{
        if(type === "endForm"){
    const res=await deleteForm({id}).unwrap()
     toast.success("Deleted Successfully")
     onClose();
        }else{
          const res=await deleteStartForm({id}).unwrap()
     toast.success("Deleted Successfully")
     onClose();
        }
    
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