import { ConfirmModal } from "../../../../../../components/modals/ConfirmModal";
import { useDeleteAssignmentTraineesMutation } from "../../../../../../services/exams/assignment/assignmentMutation";
import { toast } from "react-toastify";
import { ErrorHandler } from "../../../../../../utils/ErrorHandler";
interface DeleteModalProps{
    open:boolean,
    onClose:()=>void,
    traineeId:number,
   

}
export const DeleteTraineeModal=({open,onClose,traineeId}:DeleteModalProps)=>{
  const [deleteAssignmentTrainees,{isLoading}]=useDeleteAssignmentTraineesMutation()
  const handelDelete=async()=>{
    try{
      console.log(traineeId)
    const res=await deleteAssignmentTrainees({id:traineeId}).unwrap()
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