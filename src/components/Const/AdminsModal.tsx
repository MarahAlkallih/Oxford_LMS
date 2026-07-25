import React, { useState } from "react";
import CustomDropdown from "../Fields/DropDown";
import { useGetUsersQuery } from "../../services/users/User";
import { Modal } from "../global/Modals";
import { Button } from "../Buttons/SubmitBtn";
import { useAddSupervisorMutation } from "../../services/sessions/supervisor/admin/supervisorMutation";
import { CancelBtn } from "../Buttons/CancelBtn";
import { ErrorHandler } from "../../utils/ErrorHandler";
import { toast } from "react-toastify";
interface SupervisorProps {
 
  selectedValue?: string; 
  open:boolean
  onClose:()=>void      
  sessionId:number
}

export const Supervisors: React.FC<SupervisorProps> = ({open,onClose,sessionId }) => {
const {data:users,isLoading:isLoadingUsers}=useGetUsersQuery()
const filter=users?.filter((user)=>user.roles.some((role)=>role === "ATTENDANCE"))
 const [addSuper,{isLoading:isLoadingAdd}]=useAddSupervisorMutation()
 const [seper,setSuper]=useState({
   adminId: 0,
  sessionId: sessionId
 })
 const handelAdd=async()=>{
try{
 await addSuper(seper).unwrap()
 toast.success("Supervisor Added successfully!")
 onClose()
}catch(err){
ErrorHandler.show(err)
}
 }
  return (
    <Modal open={open} onClose={onClose}>
        <h1 className="text-2xl m-2" >Select Supervisor for Session</h1>
        <div className="m-2 ">
 <CustomDropdown
      placeholder={isLoadingUsers ? "Loading ..." : "Select supervisor"}
      options={filter?.map((user) => user.account.userName) ?? []}
      onSelect={(value) => {
                const selected = users?.find((u) => u.account.userName === value);
               setSuper({...seper,adminId:selected?.id || 0, sessionId: sessionId})
              }}
    />
        </div>

    <div className="flex mt-2">
     <Button name={isLoadingAdd ? "Adding.." :"Add"} onClick={handelAdd}/>
        <CancelBtn name="Cancel" onClick={onClose} />
    </div>
    </Modal>
   
  );
};