import { useState } from "react"
import { Button } from "../../../components/Buttons/SubmitBtn"
import { AddInstanceModal } from "../../../components/Exam/Instances/AddInstanceModal"
import { useGetAllInstancesQuery } from "../../../services/exams/exam-instances/exam-instancesQuery"
import { ExamInstanceCard } from "../../../components/Exam/Instances/ExamInstanceCard"
import {EditInstanceModal} from "../../../components/Exam/Instances/EditInstance"
import { DeleteInstanceModal } from "../../../components/Exam/Instances/DeleteInstanceModal"
export const ExamInstances=()=>{
     const [isOpenAdd,setIsOpen]=useState(false)
     const [isOpenEdit,setIsOpenEdit]=useState(false)
     const [isOpenDelete,setIsOpenDelete]=useState(false)
     const [selectedId,setSelectedId]=useState(0)
     const {data,isLoading}=useGetAllInstancesQuery()
     console.log(data)
    return(
       
        <div>
            <div className="flex justify-between align-middle items-center">
 <h1 className="text-2xl font-bold">Exam Instances</h1>
 <div>
                <Button 
                name="Add Instance"
                onClick={()=>{setIsOpen(true)}}
                />
            </div>
            </div>
            {isLoading ? <p>Loading...</p> : null}
            <div className="grid grid-cols-3 p-2 gap-2">
 {data?.map((instance) => 
            <ExamInstanceCard key={instance.id} data={instance} onEdit={
                ()=>{
                    
                      setSelectedId(instance.id),
                    setIsOpenEdit(true)

              
                }}
                onDelete={()=>{
                      setSelectedId(instance.id),
                    setIsOpenDelete(true)
                }}
                />
            )}
            </div>
           
            <AddInstanceModal
            open={isOpenAdd}
            onClose={()=>setIsOpen(false)}
            
            />
            <EditInstanceModal
            open={isOpenEdit}
            onClose={()=>setIsOpenEdit(false)}
            id={selectedId}
            />
            <DeleteInstanceModal
            open={isOpenDelete}
            onClose={()=>setIsOpenDelete(false)}
            id={selectedId}
            />
        </div>
    )
}