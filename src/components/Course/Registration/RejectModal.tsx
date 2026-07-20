import { useState } from "react";
import { Button } from "../../Buttons/SubmitBtn";
import { Modal } from "../../global/Modals";
import { CancelBtn } from "../../Buttons/CancelBtn";
import { useRejectRegistrationMutation } from "../../../services/courses/Admin-courses/course-registration/courseRegisterMuttation";
import { toast } from "react-toastify";
import { RequestStatuses } from "../../Const/RequestedCourse";
import { ErrorHandler } from "../../../utils/ErrorHandler";
import { InputField } from "../../Fields/InputField";

interface RejectModalProps {
  open: boolean;
  onClose: () => void;
  id: number;
}

export const RejectModal = ({ open, onClose, id }: RejectModalProps) => {
  // 1. تعريف حالات الـ State لكل حقل بشكل منفصل لتسهيل التحكم والتحقق
  const [rejectReason, setRejectReason] = useState<string>("");
 

  const [editStatus, { isLoading }] = useRejectRegistrationMutation();

  const handelEditStatus = async () => {

    const payload: any = {
        
    status:"REJECTED",
    rejectReason:rejectReason
    
    };


    try {
        console.log(payload)
      await editStatus({
        id: id,
        data: payload,
      }).unwrap();
      
      toast.success("Rejected successfully!");
      
      setRejectReason("")
      onClose();
    } catch (err) {
      ErrorHandler.show(err);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col gap-5 p-5 min-w-[380px] max-w-md animate-[fadeIn_0.2s_ease-out]">
        
        <h2 className="text-xl font-bold text-gray-900 text-center border-b pb-2">
         Why are you rejecting this registration?
        </h2>
        
     <InputField
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Enter rejection reason..." label={""}     />

      

        {/* أزرار التحكم في الأسفل */}
        <div className="flex gap-3 pt-2">
          <div className="flex-1">
            <Button
              name={isLoading ? "Editing..." : "Edit"}
              onClick={handelEditStatus}
            />
          </div>

          <div className="flex-1">
            <CancelBtn
              name="Cancel"
              onClick={onClose}
            />
          </div>
        </div>

      </div>
    </Modal>
  );
};