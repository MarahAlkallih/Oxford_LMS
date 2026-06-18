import { useState } from "react"
import { Button } from "../../../components/Buttons/SubmitBtn"
import { useGetEndFormsQuery } from "../../../services/exams/forms/endFormQuery"
import { EditEndFormModal } from "../../../components/Exam/Modals/EditEndForm"
import { AddEndFormModal } from "../../../components/Exam/Modals/AddEndForm"
import { FormCard } from "../../../components/Exam/Cards/FormCard"
import { DeleteFormModal } from "../../../components/Exam/Modals/DeleteForm"

export const EndForms=()=>{
    const [isOpenAdd,setIsOpneModal]=useState(false)
    const [isOpenEdit,setIsOpenEdit]=useState(false)
    const [editId,setEditId]=useState<number|null>(null)
    const [isOpenDelete,setIsOpenDelete]=useState(false)
    const [type,setType]=useState("")
    const {data,isLoading}=useGetEndFormsQuery()
   return(
    <div>
     <div className="flex justify-between align-middle items-center">
        <h1>
            End Forms
        </h1>
        <div>
               <Button name="End Forms" onClick={()=>{setIsOpneModal(true)}}/>
        </div>
     
     </div>
     {isLoading ? <p>Loaading...</p>: null}
       <div className="grid grid-cols-3 p-2">
              {data?.map ((form)=>{
            return    <FormCard data={form} 
            onEdit={()=>{setEditId(form.id); setIsOpenEdit(true)}}
            onDelete={()=>{setEditId(form.id);setIsOpenDelete(true),setType("endForm")}}
            />
             })}
          </div>
     <AddEndFormModal
     open={isOpenAdd}
     onClose={()=>setIsOpneModal(false)}
     
     />
     <EditEndFormModal 
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