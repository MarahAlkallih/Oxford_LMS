import {  useState } from "react";
import { Button } from "../Buttons/SubmitBtn";
import { Modal } from "../global/Modals";
import { CancelBtn } from "../Buttons/CancelBtn";
import {  useGetTrainersQuery } from "../../services/trainer/getTrainers";
import { useGetActiveUncompingCourseQuery } from "../../services/courses/Admin-courses/coursesQuery";
import { toast } from "react-toastify";
import { useAssignCourseTrainerMutation } from "../../services/courses/Admin-courses/Course-Trainers/courseTrainersMutation";

import CustomDropdown from "../Fields/DropDown";
import { ErrorHandler } from "../../utils/ErrorHandler";
interface AssignCourseTrainerModalProps {
    open: boolean;
    onClose: () => void;
    courseId:number
}

export const AssignCourseTrainerModal = ({ open, onClose , courseId}:AssignCourseTrainerModalProps) => {
  const [startPage] = useState(1);
  const [endPage] = useState(1);
  const {data:courses}=useGetActiveUncompingCourseQuery()
  const {data:trainers}=useGetTrainersQuery({
    page:startPage,
    limit:100
  })
  const [courseTrainer,setCourseTrainer]=useState({
      courseId:courseId,
    trainerId:0
  })
  const [assign,{isLoading}]=useAssignCourseTrainerMutation()
 const handleAddForm = async () => {
   console.log("corseTrainer",courseTrainer)
  try {
     await assign(courseTrainer).unwrap()
    toast.success("Added Successfully");

   
    onClose();
  } catch (err) {
  ErrorHandler.show(err)
  }
};

    return (
 <Modal open={open} onClose={onClose}>
  <div className="flex flex-col gap-4 p-4 min-w-87.5">

    <h2 className="text-xl font-semibold text-center">
      Assign Trainer
    </h2>
   <div className="flex flex-col align-center  ">
    <div>
 
 {/* <div className="p-4">
<CustomDropdown
  options={courses?.map((c) => c.title) || []}
  placeholder="Select Course"
  onSelect={(value) => {
    const selected = courses?.find(
      (c) => c.title === value
    );

    setCourseTrainer({
      ...courseTrainer,
      courseId: selected?.id || 0,
    });
  }}
/>
 </div> */}
  <div className="p-4">
<CustomDropdown
  options={trainers?.data.map((t) => t.account.userName
) || []}
  placeholder="Select Trainer"
  onSelect={(value) => {
    const selected = trainers?.data.find(
      (t) => t.account.userName === value
    );

    setCourseTrainer({
      ...courseTrainer,
      trainerId: selected?.id || 0,
    });
  }}
/>
 </div>

 
 
   </div>
  
    <div className="flex  pt-2">

      <div className="flex-1">
        <Button
          name={ isLoading ? "Adding...": "Add"}
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
  </div>
</Modal>
    );
}
