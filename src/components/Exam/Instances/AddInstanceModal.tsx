import {  useState } from "react";
import { Button } from "../../Buttons/SubmitBtn";
import { InputField } from "../../Fields/InputField";
import { Modal } from "../../global/Modals";
import { CancelBtn } from "../../Buttons/CancelBtn";
import {useCreateExamInstanceMutation} from "../../../services/exams/exam-instances/exam-instancesMutation"
import { useGetStartFormsQuery } from "../../../services/exams/forms/startFormQuery";
import { useGetEndFormsQuery } from "../../../services/exams/forms/endFormQuery";
import { toast } from "react-toastify";
import CustomDropdown from "../../Fields/DropDown";
interface AddInstanceModalProps {
    open: boolean;
    onClose: () => void;
}

export const AddInstanceModal = ({ open, onClose }: AddInstanceModalProps) => {
  
 const [instance, setInstance] = useState({
    startFormId: 0,
    endFormId: 0,
    name: "",
    numberOfQuestions: 0,
    description: ""
 });
const [createInstance,{isLoading}]=useCreateExamInstanceMutation()
const [startPage] = useState(1);
const [endPage] = useState(1);

const { data: startsData } = useGetStartFormsQuery({
  page: startPage,
  limit: 100,
});

const { data: endsData } = useGetEndFormsQuery({
  page: endPage,
  limit: 100,
});
 const handleAddInstance = async () => {
  try {
    console.log(instance)
    await createInstance(instance).unwrap();
    toast.success("Instance added successfully");
    setInstance({
      startFormId: 0,
      endFormId: 0,
      name: "",
      numberOfQuestions: 0,
      description: ""
    });
    onClose();
  } catch (error) {
    toast.error("Failed to add instance");
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

  <InputField
      label="Number of Questions"
      value={String(instance.numberOfQuestions)}
      type="number"
      onChange={(e) =>
        setInstance({ ...instance, numberOfQuestions: parseInt(e.target.value) || 0 })
      }
    />
  
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
  options={startsData?.data.map((s) => s.title) || []}
  placeholder="Select Start Form"
  onSelect={(value) => {
    const selected = startsData?.data.find(
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
  options={endsData?.data.map((e) => e.title) || []}
  placeholder="Select End Form"
  onSelect={(value) => {
    const selected = endsData?.data.find(
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
          name={ isLoading ? "Adding...": "Add"}
          onClick={handleAddInstance}
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
