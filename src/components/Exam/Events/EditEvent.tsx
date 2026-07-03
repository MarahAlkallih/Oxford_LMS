import {  useEffect, useState } from "react";
import { Button } from "../../Buttons/SubmitBtn";
import { Modal } from "../../global/Modals";
import { CancelBtn } from "../../Buttons/CancelBtn";
import { toast } from "react-toastify";
import { useEditExamEventMutation } from "../../../services/exams/events/examEventMutation";
import { useGetExamsQuery } from "../../../services/exams/exams/examQuery";
import { useGetAllInstancesQuery } from "../../../services/exams/exam-instances/exam-instancesQuery";
import { useGetActiveUncompingCourseQuery } from "../../../services/courses/Admin-courses/coursesQuery";
import { useGetOneEventQuery } from "../../../services/exams/events/examEventQuery";
import CustomDropdown from "../../Fields/DropDown";
import { InputField } from "../../Fields/InputField";
import { ErrorHandler } from "../../../utils/ErrorHandler";
interface EditEventModalProps {
    open: boolean;
    onClose: () => void;
    id:number
}

export const EditEventModal = ({ open, onClose,id }: EditEventModalProps) => {
  const [startPage] = useState(1);
  const [endPage] = useState(1);
   const {data:currentEvent}=useGetOneEventQuery({id})
   const {data:courses}=useGetActiveUncompingCourseQuery()
  const {data:exams}=useGetExamsQuery({
    page:startPage,
    limit:100
  })
  
 const {data:inst}=useGetAllInstancesQuery({
    page:startPage,
    limit:100
 })
 const [event,setEvent]=useState({
    examId: 0,
    examInstanceId: 0,
    courseId:0,
    startDate: "" ,
    endDate: ""
 })
 useEffect(()=>{
    if(currentEvent){
        setEvent({
             examId:currentEvent.examId,
             examInstanceId: currentEvent.examInstanceId,
             courseId:currentEvent.courseId,
             startDate: currentEvent.startDate,
             endDate: currentEvent.endDate
        })
    }
 },[currentEvent])
 const [editEvent,{isLoading}]=useEditExamEventMutation()

 const handleEditForm = async () => {
  try {
    console.log("eventtttt", event);

   await editEvent({
    id,
    data: event,
}).unwrap();

    toast.success("Edited Successfully");

    onClose();
  } catch (err) {
    ErrorHandler.show(err);
  }
};
    return (
 <Modal open={open} onClose={onClose}>
  <div className="flex flex-col gap-4 p-4 min-w-87.5">

    <h2 className="text-xl font-semibold text-center">
      Edit Event
    </h2>
   <div className="flex grid-cols-2 align-center ">
    <div>

   
    </div>
    <div className="flex-col">
 <div className="p-4 ">
     <CustomDropdown
  options={exams?.data.map((e) => e.title) || []}
  placeholder="Select Exam"
  onSelect={(value) => {
    const selected = exams?.data.find(
      (e) => e.title === value
    );

   setEvent(prev => ({
  ...prev,
  examId: selected?.id || 0,
}));
  }}
/>
 </div>
 <div className="p-4 ">
     <CustomDropdown
  options={courses?.map((c) => c.title) || []}
  placeholder="Select Course"
  onSelect={(value) => {
    const selected = courses?.find(
      (c) => c.title === value
    );

   setEvent(prev => ({
  ...prev,
  courseId: selected?.id || 0,
}));
  }}
/>
 </div>
 <div className="p-4">
<CustomDropdown
  options={inst?.data.map((i) => i.name) || []}
  placeholder="Select Instance"
  onSelect={(value) => {
    const selected = inst?.data.find(
      (i) => i.name === value
    );

    setEvent(prev => ({
      ...prev,
      examInstanceId: selected?.id || 0,
    }));
  }}
/>
<InputField
  label="Start Date"
  type="datetime-local"
  value={event.startDate ? event.startDate.slice(0, 16) : ""}
  onChange={(e) =>
    setEvent(prev => ({
      ...prev,
      startDate: e.target.value
        ? new Date(e.target.value).toISOString()
        : "",
    }))
  }
/>
<InputField
  label="End Date"
  type="datetime-local"
  value={event.endDate ? event.endDate.slice(0, 16) : ""}
  onChange={(e) =>
    setEvent(prev => ({
      ...prev,
      endDate: e.target.value
        ? new Date(e.target.value).toISOString()
        : "",
    }))
  }
/>
 </div>


  
 
    
    </div>
 
 
   </div>
  
    <div className="flex  pt-2">

      <div className="flex-1">
        <Button
          name={ isLoading ? "Editing...": "Edit Event"}
          onClick={handleEditForm}
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
}
