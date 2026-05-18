import { useNavigate } from "react-router-dom";
import {Button} from "../../components/Buttons/SubmitBtn"
import { useGetUsersQuery } from "../../services/users/User";
import type {User} from "../../types/user"
const UsersPage = () => {
const navigate = useNavigate();
const {data,isLoading,error}=useGetUsersQuery();

    return (
        <div>
            <div className=" w-fit">
                <Button name="Add User" onClick={() => navigate("/users/add")} />
                    {isLoading?<p>Load...</p>:<p>nodata</p>}
                    {data?.map((u)=><p>
                       { u.lastName}
                    </p>)}
            </div>
            
            
        </div>
    );
};

export default UsersPage;