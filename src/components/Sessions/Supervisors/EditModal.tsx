import React, { useState } from "react";
import CustomDropdown from "../../Fields/DropDown";
import { useGetUsersQuery } from "../../../services/users/User";
import { Modal } from "../../global/Modals";
import { Button } from "../../Buttons/SubmitBtn";
import {useEditSupervisorMutation}  from "../../../services/sessions/supervisor/admin/supervisorMutation"
import { CancelBtn } from "../../Buttons/CancelBtn";
import { ErrorHandler } from "../../../utils/ErrorHandler";
import { toast } from "react-toastify";
interface SupervisorProps {
 
  selectedValue?: string; 
  open:boolean
  onClose:()=>void      
  sessionId:number
  adminId:number
}

export const EditSupervisors: React.FC<SupervisorProps> = ({open,onClose,sessionId ,adminId}) => {
const {data:users,isLoading:isLoadingUsers}=useGetUsersQuery()
const filter=users?.filter((user)=>user.roles.some((role)=>role === "ATTENDANCE"))
 const [editSuper,{isLoading:isLoadingEdit}]=useEditSupervisorMutation()
 const [seper,setSuper]=useState({
   adminId: 0,
  sessionId: sessionId
 })
 const handelEdit=async()=>{
try{
 await editSuper({seper,id:adminId}).unwrap()
 toast.success("Supervisor Updated successfully!")
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
     <Button name={isLoadingEdit ? "Updating.." :"Update"} onClick={handelEdit}/>
        <CancelBtn name="Cancel" onClick={onClose} />
    </div>
    </Modal>
   
  );
};