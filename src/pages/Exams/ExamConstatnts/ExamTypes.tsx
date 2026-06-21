import { useState } from "react";
import { Button } from "../../../components/Buttons/SubmitBtn"
import { Edit, Delete } from "@mui/icons-material";
import { AddExamTypeModal } from "../../../components/Exam/Modals/AddExamType";
import { EditExamTypeModal } from "../../../components/Exam/Modals/EditExamType";
import { useGetAllTypesQuery } from "../../../services/exams/exam-types/typeQuery";
import { DeleteExamTypeModal } from "../../../components/Exam/Modals/DeleteExamType";
import { CustomPagination } from "../../../components/global/CustomPagination";


export const ExamTypes = () => {
    const [isAddExamType, setIsAddExamType] = useState(false);
    const [isEditExamType, setIsEditExamType] = useState(false);
    const [isDeletedExamType, setIsDeleteExamType] = useState(false);
    const [selectedId, setSelectedId] = useState<number>()
    const [page, setPage] = useState(1);
    const [pageSize] = useState(3);
    const { data, isLoading } = useGetAllTypesQuery({
        page,
        limit:pageSize 
    });
    return (
        <div>
            <div className="flex justify-between align-middle items-center" >
                <h1 className="text-2xl">Exam types</h1>
                <div>
                    <Button name="Add Type" onClick={() => setIsAddExamType(true)} />
                </div>

            </div>
            {isLoading ? <p>Loaading...</p> :
                <div className="grid grid-cols-3 gap-4 m-4">
                   {data?.data.map((t) => (
  <div
    className="p-2 flex-col border rounded-md shadow-sm"
    key={t.id}
  >
    <h1>Name: {t.name}</h1>
    <p>Description: {t.description}</p>

    <button
      className="cursor-pointer p-2"
      onClick={() => {
        setSelectedId(t.id);
        setIsEditExamType(true);
      }}
    >
      <Edit sx={{ color: "blue" }} />
    </button>

    <button
      className="cursor-pointer p-2"
      onClick={() => {
        setSelectedId(t.id);
        setIsDeleteExamType(true);
      }}
    >
      <Delete sx={{ color: "red" }} />
    </button>
  </div>
))}

                </div>


            }
          <CustomPagination 
  currentPage={page} 
  totalPages={data?.meta.totalPages || 1} 
  onPageChange={(newPage) => setPage(newPage)} 
/>
            <AddExamTypeModal
                open={isAddExamType}
                onClose={() => setIsAddExamType(false)}
            />
            <EditExamTypeModal
                open={isEditExamType}
                onClose={() => setIsEditExamType(false)}
                id={selectedId}
            />
            <DeleteExamTypeModal
                open={isDeletedExamType}
                onClose={() => setIsDeleteExamType(false)}
                id={selectedId}
            />

        </div>


    )
}