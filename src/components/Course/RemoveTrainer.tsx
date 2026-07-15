import { ConfirmModal } from "../modals/ConfirmModal";
import { useRemoveCourseTrainerMutation } from "../../services/courses/Admin-courses/Course-Trainers/courseTrainersMutation";
import { toast } from "react-toastify";
interface DeleteModalProps{
    open:boolean,
    onClose:()=>void,
    trainerId:number,
    courseId:number

}
export const RemoveTrainerModal=({open,onClose,courseId,trainerId}:DeleteModalProps)=>{
  const [removeCourseTrainer,{isLoading}]=useRemoveCourseTrainerMutation()
  const handelDelete=async()=>{
    try{
      
    const res=await removeCourseTrainer({courseId:courseId,trainerId:trainerId}).unwrap()
     toast.success("Removed Successfully")
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