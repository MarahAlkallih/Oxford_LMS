import {  useState } from "react";
import { Button } from "../../Buttons/SubmitBtn";
import { InputField } from "../../Fields/InputField";
import { Modal } from "../../global/Modals";
import { CancelBtn } from "../../Buttons/CancelBtn";
import { useAddEndFormMutation } from "../../../services/exams/forms/endFormMutation";
import { toast } from "react-toastify";
import { CheckBox } from "../../Fields/CheackBox";
interface AddEndFormModalProps {
    open: boolean;
    onClose: () => void;
}

export const AddEndFormModal = ({ open, onClose }: AddEndFormModalProps) => {
  
 const [startForm, setStartForm] = useState({
       title: "",
    subTitle: "",
    description: "",
    showConfiguration: false,
    showCondition: false,
    image: ""
 });
const [createForm,{isLoading,isSuccess}]=useAddEndFormMutation()

 const handleAddForm = async () => {
  try {
    await createForm({
   title:startForm.title,
   subTitle: startForm.subTitle,
   description:startForm.description,
   showConfiguration:startForm.showConfiguration,
   showCondition:startForm.showCondition,
   image:startForm.image
    }).unwrap();

    toast.success("Added Successfully");

    setStartForm({
      title: "",
    subTitle: "",
    description: "",
    showConfiguration: false,
    showCondition: false,
    image: ""
    });

    onClose();
  } catch (err) {
    console.log(err);
    toast.error("Add Failed");
  }
};

    return (
        <Modal open={open} onClose={onClose}>
  <div className="flex flex-col gap-4 p-4 min-w-87.5">

    <h2 className="text-xl font-semibold text-center">
      Add New End Form
    </h2>
   <div className="flex grid-cols-2 align-center ">
    <div>
 <InputField
      label="Title"
      value={startForm.title}
      onChange={(e) =>
        setStartForm({ ...startForm, title: e.target.value })
      }
    />

  <InputField
      label="Sub Title"
      value={startForm.subTitle}
      onChange={(e) =>
        setStartForm({ ...startForm, subTitle: e.target.value })
      }
    />
     <CheckBox
      checked={startForm.showConfiguration}
      onChange={() => setStartForm({ ...startForm, showConfiguration: !startForm.showConfiguration })}
      label="Show Configuration"
    />
    <CheckBox
      checked={startForm.showCondition}
      onChange={() => setStartForm({ ...startForm, showCondition: !startForm.showCondition })}
      label="Show Condition"
    />
    </div>
    <div>
         <InputField
      label="Description"
      value={startForm.description}
      onChange={(e) =>
        setStartForm({ ...startForm, description: e.target.value })
      }
    />
     <InputField
  label="Image URL"
  value={startForm.image}
  onChange={(e) =>
    setStartForm({
      ...startForm,
      image: e.target.value,
    })
  }
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
</Modal>
    );
}
