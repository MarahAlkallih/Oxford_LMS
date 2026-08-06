import { useDeleteCourseFileMutation } from "../../../../services/courses/files/courseFiles";
import { useDeleteSessionFileMutation } from "../../../../services/sessions/files/sessionFiles";
import { ErrorHandler } from "../../../../utils/ErrorHandler";
import { ConfirmModal } from "../../../modals/ConfirmModal";

import { toast } from "react-toastify";
interface DeleteModalProps{
    open:boolean,
    onClose:()=>void,
    fileId:number

}
export const DeleteSessionFileModal=({open,onClose,fileId}:DeleteModalProps)=>{
  const [removeSessionFile,{isLoading}]=useDeleteSessionFileMutation()
  const handelDelete=async()=>{
    try{
      
    const res=await removeSessionFile({id:fileId}).unwrap()
     toast.success("Removed Successfully")
     onClose();
       
    
    }catch(error)
    {
 ErrorHandler.show(error)
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