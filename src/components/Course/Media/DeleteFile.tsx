import { useDeleteCourseFileMutation } from "../../../services/courses/files/courseFiles";
import { ErrorHandler } from "../../../utils/ErrorHandler";
import { ConfirmModal } from "../../modals/ConfirmModal";

import { toast } from "react-toastify";
interface DeleteModalProps{
    open:boolean,
    onClose:()=>void,
    fileId:number

}
export const DeleteCourseFileModal=({open,onClose,fileId}:DeleteModalProps)=>{
  const [removeCourseFile,{isLoading}]=useDeleteCourseFileMutation()
  const handelDelete=async()=>{
    try{
      
    const res=await removeCourseFile({id:fileId}).unwrap()
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