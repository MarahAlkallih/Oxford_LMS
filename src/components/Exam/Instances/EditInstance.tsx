
import {  useEffect, useState } from "react";
import { Button } from "../../Buttons/SubmitBtn";
import { InputField } from "../../Fields/InputField";
import { Modal } from "../../global/Modals";
import { CancelBtn } from "../../Buttons/CancelBtn";
import { useGetOneInstanceQuery } from "../../../services/exams/exam-instances/exam-instancesQuery";
import { useGetStartFormsQuery } from "../../../services/exams/forms/startFormQuery";
import { useGetEndFormsQuery } from "../../../services/exams/forms/endFormQuery";
import { toast } from "react-toastify";
import CustomDropdown from "../../Fields/DropDown";
import { useEditExamInstanceMutation } from "../../../services/exams/exam-instances/exam-instancesMutation";
interface EditInstanceModalProps {
    open: boolean;
    onClose: () => void;
    id:number
}

export const EditInstanceModal = ({ open, onClose ,id}: EditInstanceModalProps) => {

 const [instance, setInstance] = useState({
    startFormId: 0,
    endFormId: 0,
    name: "",
    // numberOfQuestions:0,
    description: ""
 });


const {data:starts,isLoading:isStatrtLoad}=useGetStartFormsQuery();
const {data:ends,isLoading:isEndLoad}=useGetEndFormsQuery();
const {data:inst,isLoading:isLoadGet}=useGetOneInstanceQuery({id:id})
const [editInst,{isLoading:isEditLoading}]=useEditExamInstanceMutation()
 useEffect(()=>{
    if(inst){
        setInstance({
            startFormId:inst.startFormId,
            endFormId:inst.endFormId,
            name:inst.name,
            description:inst.description
        })
    }
 },[inst])
 const handleEditInstance = async () => {
  try {
    console.log(instance)
    await editInst({ data:instance, id:id }).unwrap();
    toast.success("Instance Edited successfully");
 
    onClose();
  } catch (error) {
    toast.error("Failed to edit instance");
  }
};



    return (
        <Modal open={open} onClose={onClose}>
  <div className="flex flex-col gap-4 p-4 min-w-87.5">

    <h2 className="text-xl font-semibold text-center">
      Add New Instance
    </h2>
   <div className="flex grid-cols-2 align-center ">
    <div>
 <InputField
      label="Name"
      value={instance.name}
      onChange={(e) =>
        setInstance({ ...instance, name: e.target.value })
      }
    />
{/* 
  <InputField
      label="Number of Questions"
      value={String(instance.numberOfQuestions)}
      type="number"
      onChange={(e) =>
        setInstance({ ...instance, numberOfQuestions: parseInt(e.target.value) || 0 })
      }
    /> */}
  
    </div>
    <div>
         <InputField
      label="Description"
      value={instance.description}
      onChange={(e) =>
        setInstance({ ...instance, description: e.target.value })
      }
    />
   <div className="p-4">
 <CustomDropdown
               options={starts?.map((s) => s.title) || []}
               placeholder="Select Start Form"
               onSelect={(value) => {
                 const selected = starts?.find(
                   (s) => s.title === value
                 );
   
                 setInstance({
                   ...instance,
                   startFormId: selected?.id || 0,
                 });
               }}
             />
                </div>
                <div className="p-4">
                   <CustomDropdown
               options={ends?.map((e) => e.title) || []}
               placeholder="Select End Form"
               onSelect={(value) => {
                 const selected = ends?.find(
                   (e) => e.title === value
                 );
   
                 setInstance({
                   ...instance,
                   endFormId: selected?.id || 0,
                 });
               }}
             />

                </div>
             

   
   
    
    </div>
 
 
   </div>
  
    <div className="flex  pt-2">

      <div className="flex-1">
        <Button
          name={ isEditLoading ? "Saving...": "Edit"}
          onClick={handleEditInstance}
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



//  <CustomDropdown
//             options={venues?.map((v) => v.venueTitle) || []}
//             placeholder="Select Venue"
//             onSelect={(value) => {
//               const selected = venues?.find(
//                 (v) => v.venueTitle === value
//               );

//               setCourse({
//                 ...course,
//                 venueId: selected?.id || 0,
//               });
//             }}
//           />
