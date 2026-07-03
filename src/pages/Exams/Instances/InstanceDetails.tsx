import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/Buttons/SubmitBtn";
import { useGetQuestionsQuery } from "../../../services/exams/questions/questionQuery";
import { QuestionCard } from "../../../components/Exam/Question/Cards/QuestionCard";
import { useState } from "react";
import { DeleteQuestModal } from "../../../components/Exam/Question/DeleteQuestModal";
import type { Question } from "../../../types/Question";

export const InstanceDetails=()=>{
    const {id}=useParams();
   
    const instId=Number(id)
    const navigate=useNavigate()
    const [isOpenDelete,setIsOpenDelete]=useState(false)
    const [selectedId,setSelectedId]=useState(0)
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const {data:questions}=useGetQuestionsQuery({
       examInstanceId: instId
    });
  

    return(
        <div>
            <div className="flex justify-between align-middle items-center">
                <h1 className="text-2xl">
                    Paper
                </h1>
                <div>
                    <Button name="Add Question" onClick={()=>navigate(`addQuestion`)}/>
                </div>
           
            </div>
            <div className="">
         {questions?.data.map((q)=> 
        { return (
           <div className="p-2" key={q.id}>
 <QuestionCard 
    question={q} 
    onEdit={() => {
      // ننتقل لصفحة التعديل ونمرر آيدي السؤال بالرابط
      navigate(`/exam-instance/${instId}/edit-question/${q.id}`);
    }} 
    onDelete={() => {
      setIsOpenDelete(true);
      setSelectedId(q.id);
    }}
  />
</div>
           
         )}
        
        )}
            </div>
            {/* {isOpenEdit && (
        <AddQuestModal
          open={isModalOpen}
          onClose={handleCloseModal}
          examInstanceId={1} 
          questionToEdit={selectedQuestion} 
        />
      )} */}
        <DeleteQuestModal
        open={isOpenDelete}
        onClose={()=>setIsOpenDelete(false)}
        id={selectedId}
        />
        </div>
    )
}