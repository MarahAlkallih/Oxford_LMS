import { useState } from "react"
import { Button } from "../../../components/Buttons/SubmitBtn"
import { AddEventModal } from "../../../components/Exam/Events/AddEvent"
import { useGetEventsQuery } from "../../../services/exams/events/examEventQuery"
import { EventCard } from "../../../components/Exam/Events/EventCard"
import { EditEventModal } from "../../../components/Exam/Events/EditEvent"
import {DeleteEventModal} from "../../../components/Exam/Events/DeleteEvent"
export const EventsPage=()=>{
    const [isOpenAdd,setIsOpenAdd]=useState(false)
    const [isOpenEdit,setIsOpenEdit]=useState(false)
    const [isOpenDelete,setIsOpenDelete]=useState(false)
    const [selectedId,setSelectedId]=useState(0)
    const {data:events}=useGetEventsQuery()
    console.log("events",events)
    return(
        <div>
            <div className="flex justify-between align-middle items-center">
                <h1 className="text-2xl">
                    Events
                </h1>
                <div>
                    <Button
                name={"Add Events"}
                onClick={()=>{setIsOpenAdd(true)}}
                />
                
                </div>
                
            </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {events?.data.map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        onEdit={() => {
                        setIsOpenEdit(true)
                        setSelectedId(event.id)
                        }}
                        onDelete={() => {
                         setIsOpenDelete(true)
                         setSelectedId(event.id)
                        }}
                    />
                ))}
            </div>
              <AddEventModal
            open={isOpenAdd}
            onClose={()=>setIsOpenAdd(false)}
            />
            <EditEventModal
             open={isOpenEdit}
            onClose={()=>setIsOpenEdit(false)}
            id={selectedId}
            />
            <DeleteEventModal
             open={isOpenDelete}
            onClose={()=>setIsOpenDelete(false)}
            id={selectedId}
        
            />
        </div>
    )
}