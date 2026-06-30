import {  useEffect, useState } from "react";
import { Button } from "../../Buttons/SubmitBtn";
import { InputField } from "../../Fields/InputField";
import { Modal } from "../../global/Modals";
import { CancelBtn } from "../../Buttons/CancelBtn";
import { toast } from "react-toastify";
import { CheckBox } from "../../Fields/CheackBox";
import { useGetLanguagesQuery } from "../../../services/languages/languageService";
import { useGetCategoryQuery } from "../../../services/courses/catygory/getCategories";
import { useGetAllTypesQuery } from "../../../services/exams/exam-types/typeQuery";
import { useGetOneExamQuery } from "../../../services/exams/exams/examQuery";
import { useEditExamMutation } from "../../../services/exams/exams/examMutation";
import CustomDropdown from "../../Fields/DropDown";
import type { Exam } from "../../../types/Exam";
interface EditExamModalProps {
    open: boolean;
    onClose: () => void;
    id:number
}

export const EditExamModal = ({ open, onClose,id }: EditExamModalProps) => {
  const [startPage] = useState(1);
  const [endPage] = useState(1);
  const {data:examOldData,isLoading:isLoadingExam}=useGetOneExamQuery({id:id})
  const [editExam,{isLoading:isLoadingEditing}]=useEditExamMutation()
  const {data:languages}=useGetLanguagesQuery()
  const {data:Caty}=useGetCategoryQuery()
  const {data:types}=useGetAllTypesQuery(
   { 
     page: startPage,
     limit: 100,}
  )
  const [examOld, setExamOld] = useState<Exam>();
const [exam, setExam] = useState<Partial<Exam>>({});
 
useEffect(() => {
    if (!examOldData) return;

    setExamOld(examOldData);
    setExam({});
}, [examOldData]);
 

console.log(examOld)
 const handleEditForm = async () => {
  try {
    await editExam({
     id:id,
     data:exam
    }).unwrap();

    toast.success("Edited Successfully");

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
      Edit New Exam
    </h2>
   <div className="flex grid-cols-2 align-center ">
    <div>
 <InputField
      label="Title"
      value={exam.title ?? examOld?.title ?? ""}
   onChange={(e)=>
    setExam(prev=>({
        ...prev,
        title:e.target.value
    }))
}
    />
     <InputField
      label="Code"
      value={exam.code ?? examOld?.code ?? ""}
      onChange={(prev) =>
        setExam({ ...prev, code: prev.target.value })
      }
    />

  <InputField
      label="Sub Title"
      value={exam.subTitle ?? examOld?.subTitle ?? ""}
      onChange={(prev) =>
        setExam({ ...prev, subTitle: prev.target.value })
      }
    />

     <InputField
      label="Grade Percentage"
      type="number"
      value={String(exam.gradePercentage) ?? String(examOld?.gradePercentage)}
      onChange={(prev) =>
        setExam({ ...prev, gradePercentage: Number(prev.target.value) })
      }
    />
      <CheckBox
      checked={exam.showCorrection ?? examOld?.showCorrection ?? false}
      onChange={() => setExam({ ...exam, showCorrection: !exam.showCorrection })}
      label="Show Configuration"
    />
   
    </div>
    <div className="flex-col">
 <div className="p-4 ">
     <CustomDropdown
  options={languages?.map((l) => l.name) || []}
  placeholder="Select Language"
  onSelect={(value) => {
    const selected = languages?.find(
      (l) => l.name === value
    );

    setExam({
      ...exam,
      languageId: selected?.id || 0,
    });
  }}
/>
 </div>
 <div className="p-4">
<CustomDropdown
  options={Caty?.map((c) => c.title) || []}
  placeholder="Select Catygory"
  onSelect={(value) => {
    const selected = Caty?.find(
      (c) => c.title === value
    );

    setExam({
      ...exam,
      categoryId: selected?.id || 0,
    });
  }}
/>
 </div>
<div className="p-4">
<CustomDropdown
  options={types?.data.map((t) => t.name) || []}
  placeholder="Select Exam Type"
  onSelect={(value) => {
    const selected = types?.data.find(
      (t) => t.name === value
    );

    setExam({
      ...exam,
      examTypeId: selected?.id || 0,
    });
  }}
/>
</div>

   <div className="p-4">

  <InputField
  label="Image URL"
  value={exam.image ?? examOld?.image ?? ""}
  onChange={(prev) =>
    setExam({
      ...prev,
      image: prev.target.value,
    })
  }
/>
     <InputField
      label="Exam Time"
      type="number"
      value={String(exam.examTime) || String(examOld?.examTime)}
      onChange={(prev) =>
        setExam({ ...prev, examTime: Number(prev.target.value) })
      }
    />

    </div>
   
  
     
    
    
    </div>
 
 
   </div>
  
    <div className="flex  pt-2">

      <div className="flex-1">
        <Button
          name={ isLoadingEditing ? "Editing...": "Edit"}
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
