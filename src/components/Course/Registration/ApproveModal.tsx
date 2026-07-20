import { useState } from "react";
import { Button } from "../../Buttons/SubmitBtn";
import { Modal } from "../../global/Modals";
import { CancelBtn } from "../../Buttons/CancelBtn";
import { useRejectRegistrationMutation } from "../../../services/courses/Admin-courses/course-registration/courseRegisterMuttation";
import { toast } from "react-toastify";

import { ErrorHandler } from "../../../utils/ErrorHandler";


interface ApproveModalProps {
  open: boolean;
  onClose: () => void;
  id: number;
  name:String
}

export const ApproveModal = ({ open, onClose, id ,name}: ApproveModalProps) => {

  const [editStatus, { isLoading }] = useRejectRegistrationMutation();

  const handelEditStatus = async () => {

  


    try {
     
      await editStatus({
        id: id,
       data:{ "status":"APPROVED"}
      }).unwrap();
      
      toast.success("Approved successfully!");
      
     
      onClose();
    } catch (err) {
      ErrorHandler.show(err);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col gap-5 p-5 min-w-95 max-w-md animate-[fadeIn_0.2s_ease-out]">
        
        <h2 className="text-xl font-bold text-gray-900 text-center border-b pb-2">
         Why are you approving this registration for {name}?
        </h2>

        <div className="flex gap-3 pt-2">
          <div className="flex-1">
            <Button
              name={isLoading ? "Approve..." : "Confirm"}
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