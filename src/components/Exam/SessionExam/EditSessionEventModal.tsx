import React, { useState } from "react";
import CustomDropdown from "../../Fields/DropDown";
import { useGetExamEventsQuery } from "../../../services/exams/events/examEventQuery";
import { Modal } from "../../global/Modals";
import { Button } from "../../Buttons/SubmitBtn";
import {useEditSessionExamMutation} from "../../../services/exams/exam-session/examSessionMutation"
import { CancelBtn } from "../../Buttons/CancelBtn";
import { ErrorHandler } from "../../../utils/ErrorHandler";
import { toast } from "react-toastify";
import { Event } from "@mui/icons-material";
interface SupervisorProps {
 
  selectedValue?: string; 
  open:boolean
  onClose:()=>void      
  sessionId:number
  courseId:number
  eventId:number
}

export const EditSessionEvent: React.FC<SupervisorProps> = ({open,onClose,sessionId,courseId,eventId }) => {
const {data:events,isLoading:isLoadingEvents}=useGetExamEventsQuery({courseId})
const [event,setEvent]=useState<{ sessionId: number; examEventId: number | null }>({
    sessionId:sessionId,
    examEventId:null
})
const [editSession,{isLoading:isLoadEdit}]=useEditSessionExamMutation()
 const handelAdd=async()=>{
try{
    await editSession({id:eventId,data:event}).unwrap()

 toast.success("Event Edited successfully!")
 onClose()
}catch(err){
ErrorHandler.show(err)
}
 }
  return (
    <Modal open={open} onClose={onClose}>
        <h1 className="text-2xl m-2" >Select Exam Event for Session</h1>
        <div className="m-2 ">
<CustomDropdown
  placeholder={isLoadingEvents ? "Loading ..." : "Select exam event"}
  options={events?.data?.map((e) => e.exam.title) ?? []}
  onSelect={(value) => {
    const selected = events?.data?.find(
      (e) => e.exam.title === value
    );

    setEvent({
      ...event,
      examEventId: selected?.id || 0
    });
  }}
/>
        </div>

    <div className="flex mt-2">
     <Button name={isLoadEdit ? "Editing.." :"Edit"} onClick={handelAdd}/>
        <CancelBtn name="Cancel" onClick={onClose} />
    </div>
    </Modal>
   
  );
};