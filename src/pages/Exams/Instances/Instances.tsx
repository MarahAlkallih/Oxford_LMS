import { useState } from "react"
import { Button } from "../../../components/Buttons/SubmitBtn"
import { AddInstanceModal } from "../../../components/Exam/Instances/AddInstanceModal"
import { useGetAllInstancesQuery } from "../../../services/exams/exam-instances/exam-instancesQuery"
import { ExamInstanceCard } from "../../../components/Exam/Instances/ExamInstanceCard"
import {EditInstanceModal} from "../../../components/Exam/Instances/EditInstance"
import { DeleteInstanceModal } from "../../../components/Exam/Instances/DeleteInstanceModal"
import { CustomPagination } from "../../../components/global/CustomPagination"
export const ExamInstances=()=>{
     const [isOpenAdd,setIsOpen]=useState(false)
     const [isOpenEdit,setIsOpenEdit]=useState(false)
     const [isOpenDelete,setIsOpenDelete]=useState(false)
     const [selectedId,setSelectedId]=useState(0)
      const [page, setPage] = useState(1);
    const [pageSize] = useState(3);
     const {data,isLoading}=useGetAllInstancesQuery({
        page,
        limit:pageSize
     })
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
               {isLoading ? <p>Loading...</p> : null}
            {data?.data.length === 0 ? <p>Instance is empty</p>:
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {data?.data.map((instance) => 
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
            }
          
         
           <CustomPagination 
  currentPage={page} 
  totalPages={data?.meta.totalPages || 1} 
  onPageChange={(newPage) => setPage(newPage)} 
/>
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