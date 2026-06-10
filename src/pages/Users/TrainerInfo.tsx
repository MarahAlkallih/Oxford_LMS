import { useParams } from "react-router-dom";
import {useGetTrainerQuery} from "../../services/trainer/getTrainers"

export const TrainerInfo =()=>{
    const { id } = useParams();
   const userId = Number(id);
   
   const { data, isLoading } = useGetTrainerQuery({ id: userId }, {
     skip: !id || isNaN(userId),
   });
   console.log(data)
       return (
         
       <div >
         <h1 className="p-2 text-2xl font-bold">Trainer Information</h1>
         {isLoading ? (<div>Loading Data....</div>):<div className="grid grid-cols-2 gap-4 p-2">
   <div>
       <strong>First Name:</strong> {data?.account.firstName}
     </div>
   
     <div>
       <strong>Last Name:</strong> {data?.account.lastName}
     </div>
   
     <div>
       <strong>Username:</strong> {data?.account.email}
     </div>
   
     <div>
       <strong>Email:</strong> {data?.account.email}
     </div>
   
     <div>
       <strong>Phone:</strong> {data?.account.phoneNumber}
     </div>
   
   
   
  
   </div>
   
        }  </div>
     
       )

}