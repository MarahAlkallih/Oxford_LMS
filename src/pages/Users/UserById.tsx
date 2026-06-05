import { useParams } from "react-router-dom"
import { useGetUserByIdQuery } from "../../services/users/User";

export const DisplayUserInfo=()=>{
const { id } = useParams();

const userId = Number(id);

const { data, isLoading } = useGetUserByIdQuery(userId, {
  skip: !id || isNaN(userId),
});
console.log(data?.roles?.join(", "))
    return (
      
    <div >
      <h1 className="p-2 text-2xl font-bold">User Information</h1>
      {isLoading ? (<div>Loading Data....</div>):<div className="grid grid-cols-2 gap-4 p-2">
<div>
    <strong>First Name:</strong> {data?.firstName}
  </div>

  <div>
    <strong>Last Name:</strong> {data?.lastName}
  </div>

  <div>
    <strong>Username:</strong> {data?.userName}
  </div>

  <div>
    <strong>Email:</strong> {data?.email}
  </div>

  <div>
    <strong>Phone:</strong> {data?.phoneNumber}
  </div>

  <div>
    <strong>Gender:</strong> {data?.gender}
  </div>

  <div>
    <strong>Status:</strong>
    {data?.isActive ? " Active" : " Inactive"}
  </div>

  <div>
    <strong>Role:</strong>
    {data?.roles?.join(", ")}
  </div>
</div>

     }  </div>
  
    )
}