import { useEffect, useState } from "react";
import { Button } from "../../Buttons/SubmitBtn";
import { InputField } from "../../Fields/InputField";
import { Modal } from "../../global/Modals";
import { CancelBtn } from "../../Buttons/CancelBtn";
import { useEditStartFormMutation } from "../../../services/exams/forms/startFormMutation";

import { useGetStartFormByIdQuery } from "../../../services/exams/forms/startFormQuery";

import { toast } from "react-toastify";
import { CheckBox } from "../../Fields/CheackBox";

interface EditStartFormModalProps {
  open: boolean;
  onClose: () => void;
  id: number;
 
}

export const EditStartFormModal = ({ open, onClose, id }: EditStartFormModalProps) => {

  const { data, isFetching } = useGetStartFormByIdQuery({ id }, { skip: !open || !id });

  const [editForm, { isLoading: isUpdating }] = useEditStartFormMutation();

  const [startForm, setStartForm] = useState({
    title: "",
    subTitle: "",
    description: "",
    showConfiguration: false,
    showCondition: false,
    image: "",
  });


  useEffect(() => {
    if (data) {
      setStartForm({
        title: data.title ,
        subTitle: data.subTitle ,
        description: data.description ,
        showConfiguration: data.showConfiguration ,
        showCondition: data.showCondition ,
        image: data.image ,
      });
    }
  }, [data]);

 const handleEditForm = async () => {
  try {
    // 1. اطبعي الداتا بالكونسول لتتأكدي إنو الـ State عم يتحدث صح وقت تكتبي بالـ Input
    console.log("Data to send:", startForm);

    // 2. طريقة الإرسال الصحيحة للـ RTK Query
    await editForm({
      id: id,
      data: startForm // <--- هاد هو السطر السحري! (إذا كان الميوتيشن بيستقبل data، اكتبي data: startForm)
    }).unwrap();

    toast.success("Edited Successfully");
    onClose(); 
    
  } catch (err) {
    console.log(err);
    toast.error("Edit Failed");
  }
};

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col gap-4 p-4 min-w-87.5">
        <h2 className="text-xl font-semibold text-center">Edit Start Form</h2>
        
        {/* إظهار رسالة تحميل إذا الداتا لسا عم تنزل */}
        {isFetching ? (
           <div className="text-center py-4 text-gray-500">Loading form data...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="flex flex-col gap-4">
              <InputField
                label="Title"
                value={startForm.title}
                onChange={(e) => setStartForm({ ...startForm, title: e.target.value })}
              />

              <InputField
                label="Sub Title"
                value={startForm.subTitle}
                onChange={(e) => setStartForm({ ...startForm, subTitle: e.target.value })}
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
            
            <div className="flex flex-col gap-4">
              <InputField
                label="Description"
                value={startForm.description}
                onChange={(e) => setStartForm({ ...startForm, description: e.target.value })}
              />
              
              <InputField
                label="Image URL"
                value={startForm.image}
                onChange={(e) => setStartForm({ ...startForm, image: e.target.value })}
              />
            </div>
          </div>
        )}

        <div className="flex gap-4 pt-4 mt-4 border-t">
          <div className="flex-1">
            <Button
              name={isUpdating ? "Saving..." : "Save Changes"}
              onClick={handleEditForm}
            />
          </div>
          <div className="flex-1">
            <CancelBtn name="Cancel" onClick={onClose} />
          </div>
        </div>
      </div>
    </Modal>
  );
};