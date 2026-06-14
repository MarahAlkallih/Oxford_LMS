import { useState } from "react";
import { Button } from "../../../components/Buttons/SubmitBtn"
import { Edit, Delete } from "@mui/icons-material";
import { AddQuestionTypeModal } from "../../../components/Exam/Modals/AddQuestionType";
import { EditQuestionTypeModal } from "../../../components/Exam/Modals/EditQuestionType";
import { useGetAllQuestTypesQuery } from "../../../services/exams/quest-types/typeQuery";
import { DeleteQuestionTypeModal } from "../../../components/Exam/Modals/DeleteQuetionType";


export const QuestionTypes = () => {
    const [isAddExamType, setIsAddExamType] = useState(false);
    const [isEditExamType, setIsEditExamType] = useState(false);
    const [isDeletedExamType, setIsDeleteExamType] = useState(false);
    const [selectedId, setSelectedId] = useState<number>()
    const { data, isLoading } = useGetAllQuestTypesQuery();
    console.log("questtt",data)
    return (
        <div>
            <div className="flex justify-between align-middle items-center" >
                <h1 className="text-2xl">Question types</h1>
                <div>
                    <Button name="Add Type" onClick={() => setIsAddExamType(true)} />
                </div>

            </div>
            {isLoading ? <p>Loaading...</p> :
                <div className="grid grid-cols-3 gap-4 m-4">
                    {data?.map((t) =>
                        <div className="p-2 flex-col border rounded-md shadow-sm" key={t.id}>
                            <h1>Type: {t.type}</h1>
                            <p>Description:{t.description} </p>
                            <span>
                                <button className="cursor-pointer p-2 " onClick={() => {
                                    setSelectedId(t.id)
                                    setIsEditExamType(true)
                                }}>
                                    <Edit sx={{ color: "blue" }} />
                                </button>
                            </span>
                            <span>
                                <button className="cursor-pointer p-2" onClick={() => {
                                    setSelectedId(t.id)
                                    setIsDeleteExamType(true)
                                }}>
                                    <Delete sx={{ color: "red" }} />
                                </button>
                            </span>

                        </div>)}
                </div>

            }
            <AddQuestionTypeModal
                open={isAddExamType}
                onClose={() => setIsAddExamType(false)}
            />
            <EditQuestionTypeModal
                open={isEditExamType}
                onClose={() => setIsEditExamType(false)}
                id={selectedId}
            />
            <DeleteQuestionTypeModal
                open={isDeletedExamType}
                onClose={() => setIsDeleteExamType(false)}
                id={selectedId}
            />

        </div>


    )
}