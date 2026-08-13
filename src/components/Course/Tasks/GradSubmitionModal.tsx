import { useState } from "react";
import { Button } from "../../Buttons/SubmitBtn";
import { InputField } from "../../Fields/InputField";
import { Modal } from "../../global/Modals";
import { CancelBtn } from "../../Buttons/CancelBtn";
import { toast } from "react-toastify";
import { useGradSubmissionMutation } from "../../../services/courses/tasks/taskMutations";
import { ErrorHandler } from "../../../utils/ErrorHandler";
interface GradSubmissionModalProps {
  open: boolean;
  onClose: () => void;
  taskId: number;
}

export const GradSubmissionModal = ({ open, onClose, taskId }: GradSubmissionModalProps) => {
    const [gradSub,{isLoading}]=useGradSubmissionMutation()
      const [grad,setGrad]=useState({
  grade: 0,
  feedback: ""
})
const  handelEditGrad=async()=>{
    try{
 await gradSub({data:grad,id:taskId}).unwrap()
   toast.success("Grad Submition edited")
       setGrad({
         grade: 0,
  feedback: ""
    })
   onClose()
    }catch(err){
    ErrorHandler.show(err)
    }
  
 }

  const handleClose = () => {
    setGrad({
         grade: 0,
  feedback: ""
    })
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
  
      <div className="p-4 sm:p-6 w-full max-w-2xl max-h-[85vh] overflow-y-auto space-y-4">
        <h2 className="text-xl font-bold text-center text-gray-800 border-b border-gray-100 pb-2">
          Edit Grad Submission
        </h2>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Task Title (Full Width) */}
          <div className="md:col-span-2">
            <InputField
              label="Feed Back "
              value={grad.feedback}
              onChange={(e) =>
                setGrad((prev) => ({
                  ...prev,
                  feedback: e.target.value,
                }))
                }
              
            />
          </div>

      
          
            <InputField
              label="Max Score"
              type="number"
              value={String(grad.grade)}
              onChange={(e) =>
                setGrad((prev) => ({
                  ...prev,
                  grade: Number(e.target.value),
                }))
              }
            />
        

        
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-3 border-t border-gray-100">
          <div className="flex-1">
            <Button
              name={isLoading ? "Editing...": "Edit Grad"}
              onClick={handelEditGrad}
            />
          </div>

          <div className="flex-1">
            <CancelBtn name="Cancel" onClick={handleClose} />
          </div>
        </div>
      </div>
    </Modal>
  );
};