import { useState } from "react"
import { Button } from "../../components/Buttons/SubmitBtn"
import { AddSessionTypeModal } from "../../components/Sessions/Types/AddTypeModal"
import { useGetSessionTypesQuery } from "../../services/sessions/type/typeQuery"
import { Edit , Delete} from "@mui/icons-material"
import { EditSessionTypesApi } from "../../services/sessions/type/typeMutations"
import { EditSessionTypeModal } from "../../components/Sessions/Types/EditTypeModal"
import { DeleteSessionTypeModal } from "../../components/Sessions/Types/DeleteTypeModal"

export const SessionTypes=()=>{
    const [isOpenAdd,setIsOpenAdd]=useState(false)
    const [isOpenEdit,setIsOpenEdit]=useState(false)
    const [isOpenDelete,setIsOpenDelete]=useState(false)
    const [selectedId,setSelectedId]=useState<number>(0)
    const { data:allTypes, isLoading } = useGetSessionTypesQuery({});
    console.log(allTypes)
    return(
        <div>
        <div className="flex justify-between align-middle items-center">
            <h1>
                Session Types
            </h1>
            <div>
                <Button name="Add Type" onClick={()=>{setIsOpenAdd(true)}}/>
            </div>
        </div>
        <div>
          {isLoading ? <p>Loaad..</p> : (
           allTypes?.length === 0 ? <p>No data</p>
           : allTypes?.map((type)=>(
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
        <AddSessionTypeModal
        open={isOpenAdd}
        onClose={()=>setIsOpenAdd(false)}
        
        />
        <EditSessionTypeModal
        open={isOpenEdit}
        onClose={()=>setIsOpenEdit(false)}
        id={selectedId} 
        />
         <DeleteSessionTypeModal
         open={isOpenDelete}
         onClose={()=>setIsOpenDelete(false)}
         id={selectedId}
         />
        </div>
       
    )
}