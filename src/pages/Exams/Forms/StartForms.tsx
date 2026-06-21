import { useState } from "react"
import { Button } from "../../../components/Buttons/SubmitBtn"
import { AddStartFormModal } from "../../../components/Exam/Modals/AddStartForm"
import { useGetStartFormsQuery } from "../../../services/exams/forms/startFormQuery"
import { FormCard } from "../../../components/Exam/Cards/FormCard"
import { EditStartFormModal } from "../../../components/Exam/Modals/EditStartModal"
import { DeleteFormModal } from "../../../components/Exam/Modals/DeleteForm"
import { CustomPagination } from "../../../components/global/CustomPagination"
export const StartForms=()=>{
    const [isOpenAdd,setIsOpneModal]=useState(false)
     const [isOpenEdit,setIsOpenEdit]=useState(false)
        const [editId,setEditId]=useState<number|null>(null)
        const [isOpenDelete,setIsOpenDelete]=useState(false)
        const [type,setType]=useState("")
         const [page, setPage] = useState(1);
            const [pageSize] = useState(3);
    const {data,isLoading}=useGetStartFormsQuery({
        page,
        limit:pageSize
    })
    console.log(data)
   return(
    <div>
     <div className="flex justify-between align-middle items-center">
        <h1>
            Start Forms
        </h1>
        <div>
               <Button name="Start Forms" onClick={()=>{setIsOpneModal(true)}}/>
        </div>
        
     </div>
     {isLoading ? <p>Loaading...</p>: null}
       <div className="grid grid-cols-3 p-2">
              {data?.data.length === 0 ? (
                <p>No forms found.</p>
              ) : (
                data?.data.map((form) => {
                  return (
                    <FormCard
                      data={form}
                      onEdit={() => {setEditId(form.id); setIsOpenEdit(true);}}
                      onDelete={() => {setEditId(form.id); setIsOpenDelete(true); setType("endForm");}}
                    />
                  );
                })
              )}
              </div>
     <CustomPagination 
  currentPage={page} 
  totalPages={data?.meta.totalPages || 1} 
  onPageChange={(newPage) => setPage(newPage)} 
/>
    
     <AddStartFormModal
     open={isOpenAdd}
     onClose={()=>setIsOpneModal(false)}
     />
     <EditStartFormModal
     open={isOpenEdit}
     onClose={()=>setIsOpenEdit(false)}
     id={editId as number}
     />
     <DeleteFormModal 
     open={isOpenDelete}
     onClose={()=>setIsOpenDelete(false)}
     id={editId as number}
     type={type}
     
     />
    </div>
   )
}