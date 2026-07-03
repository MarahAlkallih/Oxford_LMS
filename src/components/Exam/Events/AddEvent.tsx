import {  useState } from "react";
import { Button } from "../../Buttons/SubmitBtn";
import { Modal } from "../../global/Modals";
import { CancelBtn } from "../../Buttons/CancelBtn";
import { toast } from "react-toastify";
import { useGetActiveUncompingCourseQuery } from "../../../services/courses/Admin-courses/coursesQuery";
import { useCreateExamEventMutation } from "../../../services/exams/events/examEventMutation";
import { useGetExamsQuery } from "../../../services/exams/exams/examQuery";
import { useGetAllInstancesQuery } from "../../../services/exams/exam-instances/exam-instancesQuery";
import CustomDropdown from "../../Fields/DropDown";
import { InputField } from "../../Fields/InputField";
import { ErrorHandler } from "../../../utils/ErrorHandler";
interface AddEventModalProps {
    open: boolean;
    onClose: () => void;
}

export const AddEventModal = ({ open, onClose }: AddEventModalProps) => {
  const [startPage] = useState(1);
  const [endPage] = useState(1);
  const {data:exams}=useGetExamsQuery({
    page:startPage,
    limit:100
  })
  
 const {data:inst}=useGetAllInstancesQuery({
    page:startPage,
    limit:100
 })
 const {data:courses}=useGetActiveUncompingCourseQuery()
 const [event,setEvent]=useState({
    examId: 0,
    courseId: 0,
    examInstanceId: 0,
    startDate: "" ,
    endDate: ""
 })
 const [createEvent,{isLoading}]=useCreateExamEventMutation()
 const handleAddForm = async () => {
  try {
    
   const res=  await createEvent(event).unwrap();
      console.log(event.endDate)
    toast.success("Added Successfully");

   setEvent({
    examId: 0,
    courseId:0,
    examInstanceId: 0,
    startDate: "",
    endDate: ""
   })
    onClose();
  } catch (err) {
   ErrorHandler.show(err)
  }
};

    return (
 <Modal open={open} onClose={onClose}>
  <div className="flex flex-col gap-4 p-4 min-w-87.5">

    <h2 className="text-xl font-semibold text-center">
      Add New Event
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

    setEvent({
      ...event,
      examId: selected?.id || 0,
    });
  }}
/>
<div className="p-4">

</div>
    <CustomDropdown
  options={courses?.map((c) => c.title) || []}
  placeholder="Select Course"
  onSelect={(value) => {
    const selected = courses?.find(
      (c) => c.title === value
    );

    setEvent({
      ...event,
      courseId: selected?.id || 0,
    });
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

    setEvent({
      ...event,
      examInstanceId: selected?.id || 0,
    });
  }}
/>
<InputField
  label="Start Date"
  type="datetime-local"
  // نقوم بالقص هنا فقط ليقبلها الحقل للعرض (من أول محرف للمحرف 16)
  value={event.startDate ? event.startDate.slice(0, 16) : ""}
  // هنا نخزن الصيغة الكاملة بالـ State لتُرسل كاملة للباك إند
  onChange={(e) => setEvent({ 
    ...event, 
    startDate: e.target.value ? new Date(e.target.value).toISOString() : "" 
  })}
/>

<InputField
  label="End Date"
  type="datetime-local"
  value={event.endDate ? event.endDate.slice(0, 16) : ""}
  onChange={(e) => setEvent({ 
    ...event, 
    endDate: e.target.value ? new Date(e.target.value).toISOString() : "" 
  })}
/>
 </div>


  
  
     
    
    
    </div>
 
 
   </div>
  
    <div className="flex  pt-2">

      <div className="flex-1">
        <Button
          name={ isLoading ? "Adding...": "Add Event"}
          onClick={handleAddForm}
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
