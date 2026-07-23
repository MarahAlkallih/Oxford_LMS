import { useState } from "react"
import { useGetSessionPrioQuery } from "../../services/sessions/priorities/prioritiesQuery"
import { Button } from "../../components/Buttons/SubmitBtn"
import { Delete, Edit } from "@mui/icons-material"
import { AddSessionPrioModal } from "../../components/Sessions/Priorities/AddPrioModal"
import {EditSessionPrioModal} from "../../components/Sessions/Priorities/EditPrioModal"
import { DeleteSessionPrioModal } from "../../components/Sessions/Priorities/DeletePrioModal"
export const PrioritiesPage=()=>{
   const [isOpenAdd,setIsOpenAdd]=useState(false)
      const [isOpenEdit,setIsOpenEdit]=useState(false)
      const [isOpenDelete,setIsOpenDelete]=useState(false)
      const [selectedId,setSelectedId]=useState<number>(0)
      const { data:allPrio, isLoading } = useGetSessionPrioQuery({});
      
      return(
          <div>
          <div className="flex justify-between align-middle items-center">
              <h1>
                  Session Priorities
              </h1>
              <div>
                  <Button name="Add Priorities" onClick={()=>{setIsOpenAdd(true)}}/>
              </div>
          </div>
          <div>
            {isLoading ? <p>Loaad..</p> : (
             allPrio?.length === 0 ? <p>No data</p>
             : allPrio?.map((type)=>(
              <div key={type.id} className="flex border justify-between rounded-md m-1 w-1/4 p-2 py-2">
                <p >{type.name}</p>
                <div>
                  <button className="text-(--main-color) cursor-pointer" onClick={()=>{setIsOpenEdit(true)
  
                      setSelectedId(type?.id || 0)
                  }}>
                    <Edit />
                  </button>
                   <button className="text-red-600 cursor-pointer" onClick={()=>{setIsOpenDelete(true)
                      setSelectedId(type?.id || 0)
                   }}>
                    <Delete />
                  </button>
                </div>
              </div>
             ))
            )}
          </div>
          <AddSessionPrioModal
          open={isOpenAdd}
          onClose={()=>setIsOpenAdd(false)}
          
          />
          <EditSessionPrioModal
          open={isOpenEdit}
          onClose={()=>setIsOpenEdit(false)}
          id={selectedId} 
          />
           <DeleteSessionPrioModal
           open={isOpenDelete}
           onClose={()=>setIsOpenDelete(false)}
           id={selectedId}
           />
          </div>
         
      )
}