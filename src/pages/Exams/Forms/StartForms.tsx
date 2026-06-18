import { useState } from "react"
import { Button } from "../../../components/Buttons/SubmitBtn"
import { AddStartFormModal } from "../../../components/Exam/Modals/AddStartForm"
import { useGetStartFormsQuery } from "../../../services/exams/forms/startFormQuery"
import { FormCard } from "../../../components/Exam/Cards/FormCard"
import { EditStartFormModal } from "../../../components/Exam/Modals/EditStartModal"
import { DeleteFormModal } from "../../../components/Exam/Modals/DeleteForm"
export const StartForms=()=>{
    const [isOpenAdd,setIsOpneModal]=useState(false)
     const [isOpenEdit,setIsOpenEdit]=useState(false)
        const [editId,setEditId]=useState<number|null>(null)
        const [isOpenDelete,setIsOpenDelete]=useState(false)
        const [type,setType]=useState("")
    const {data,isLoading}=useGetStartFormsQuery()
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
     <div className="grid grid-cols-3 p-2">
         {data?.map ((form)=>{
       return    <FormCard data={form}
        onEdit={()=>{setEditId(form.id); setIsOpenEdit(true)}}
        onDelete={()=>{setEditId(form.id);setIsOpenDelete(true),setType("startForm")}}
       />
        })}
     </div>
    
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