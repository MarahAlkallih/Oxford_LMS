import {  useState } from "react";
import { Button } from "../../Buttons/SubmitBtn";
import { InputField } from "../../Fields/InputField";
import { Modal } from "../../global/Modals";
import { CancelBtn } from "../../Buttons/CancelBtn";
import { useAddExamMutation } from "../../../services/exams/exams/examMutation";
import { toast } from "react-toastify";
import { CheckBox } from "../../Fields/CheackBox";
import { useGetLanguagesQuery } from "../../../services/languages/languageService";
import { useGetCategoryQuery } from "../../../services/courses/catygory/getCategories";
import { useGetAllTypesQuery } from "../../../services/exams/exam-types/typeQuery";
import CustomDropdown from "../../Fields/DropDown";
import { ErrorHandler } from "../../../utils/ErrorHandler";
interface AddExamModalProps {
    open: boolean;
    onClose: () => void;
}

export const AddExamModal = ({ open, onClose }: AddExamModalProps) => {
  const [startPage] = useState(1);
  const [endPage] = useState(1);
  const {data:languages}=useGetLanguagesQuery()
  const {data:Caty}=useGetCategoryQuery()
  const {data:types}=useGetAllTypesQuery(
   { 
     page: startPage,
     limit: 100,}
  )
  const [exam,setExam]=useState({
    code: "",
    title: "",
    subTitle: "",
    image: "",
    gradePercentage: 0,
    languageId: 0,
    status: "Active",
    categoryId: 0,
    examTypeId: 0,
    examTime: 0,
    showCorrection: true
  })

const [createExam,{isLoading,isSuccess}]=useAddExamMutation()

 const handleAddForm = async () => {
  try {
    await createExam({
   code:exam.code,
   title:exam.title,
   image:exam.image,
   gradePercentage:exam.gradePercentage,
   languageId:exam.languageId,
   categoryId:exam.categoryId,
   examTypeId:exam.examTypeId,
   examTime:exam.examTime,
   showCorrection:exam.showCorrection,
   status: "Active",

    }).unwrap();

    toast.success("Added Successfully");

    setExam({
    code: "",
    title: "",
    subTitle: "",
    image: "",
    gradePercentage: 0,
    languageId: 0,
    status: "Active",
    categoryId: 0,
    examTypeId: 0,
    examTime: 0,
    showCorrection: true
    });

    onClose();
  } catch (err) {
  ErrorHandler.show(err)
  }
};

    return (
 <Modal open={open} onClose={onClose}>
  <div className="flex flex-col gap-4 p-4 min-w-87.5">

    <h2 className="text-xl font-semibold text-center">
      Add New Exam
    </h2>
   <div className="flex grid-cols-2 align-center ">
    <div>
 <InputField
      label="Title"
      value={exam.title}
      onChange={(e) =>
        setExam({ ...exam, title: e.target.value })
      }
    />
     <InputField
      label="Code"
      value={exam.code}
      onChange={(e) =>
        setExam({ ...exam, code: e.target.value })
      }
    />

  <InputField
      label="Sub Title"
      value={exam.subTitle}
      onChange={(e) =>
        setExam({ ...exam, subTitle: e.target.value })
      }
    />

     <InputField
      label="Grade Percentage"
      type="number"
      value={String(exam.gradePercentage)}
      onChange={(e) =>
        setExam({ ...exam, gradePercentage: Number(e.target.value) })
      }
    />
      <CheckBox
      checked={exam.showCorrection}
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

<div className="flex flex-col gap-2">
  <label className="text-sm font-medium">Image URL</label>

  <input
    type="url"
    value={exam.image ?? ""}
    onChange={(e) =>
      setExam(prev => ({
        ...prev,
        image: e.target.value,
      }))
    }
    className="w-[280px] h-10 rounded border border-gray-300 px-2 focus:outline-none"
  />
</div>
     <InputField
      label="Exam Time"
      type="number"
      value={String(exam.examTime)}
      onChange={(e) =>
        setExam({ ...exam, examTime: Number(e.target.value) })
      }
    />

    </div>
   
  
     
    
    
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
