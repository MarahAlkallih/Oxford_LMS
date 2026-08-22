import { useNavigate } from "react-router-dom";
import {Button} from "../../components/Buttons/SubmitBtn"
import { useGetUsersQuery } from "../../services/users/User";
import type { GridColDef } from "@mui/x-data-grid";
import { IconButton, Stack, Tooltip } from "@mui/material";
import type { User, Account } from "../../types/user"
import CustomDataGrid from "../../components/DataGrid/DataGrid";
import { useState } from "react";
import { ActiveUserModal } from "../../components/User/ActiveUserModal";
import { DeActiveUserModal } from "../../components/User/DeActiveUserModal";
import { EditIcon,ToggleOff,ToggleOn, VisibilityIcon,AddCommentIcon } from "../../components/Icons";

const UsersPage = () => {
  const [isOpneActive,setIsOpenActive]=useState(false)
   const [isOpneDeActive,setIsOpenDeActive]=useState(false)
    const [isOpneChat,setIsOpenChat]=useState(false)
  const [selecetedId,setSelectedId]=useState(0)
  const [userName,setUserName]=useState("")
const navigate = useNavigate();
const {data,isLoading}=useGetUsersQuery();
console.log(data)
type UserRow = Pick<User, "id"> & {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  roles: string;
  account: Account;
};

const rows: UserRow[] =
  data?.map((user) => ({
    id: user.id,
    firstName: user.account.firstName,
    lastName: user.account.lastName,
    userName: user.account.userName,
    email: user.account.email,
    phoneNumber: user.account.phoneNumber,
    roles: user.roles.join(", "),
    account: user.account,
    isActive:user.account.isActive
  })) ?? [];

const columns: GridColDef<UserRow>[] = [
  { field: "firstName", headerName: "First Name", flex: 1, minWidth: 140 },
  { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 140 },
  { field: "userName", headerName: "User Name", flex: 1, minWidth: 150 },
  { field: "email", headerName: "Email", flex: 1.2, minWidth: 200 },
  { field: "phoneNumber", headerName: "Phone", flex: 1, minWidth: 140 },
  { field: "roles", headerName: "Role", flex: 0.8, minWidth: 120 },
  {
    field: "isActive",
    headerName: "Status",
    flex: 0.8,
    minWidth: 90,
    renderCell: (params) => (
      <div
        className={`p-2 mt-2 rounded-full text-xs font-semibold text-white align-middle items-center text-center ${
          params.value ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {params.value ? "Active" : "Inactive"}
      </div>
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    filterable: false,
    width: 160,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      // قراءة حالة المستخدم الحالية من السطر
      const isActive = params.row.account.isActive;

      return (
        <Stack direction="row" sx={{padding:"6px"}} spacing={0.5}>
          {/* زر العرض */}
          <Tooltip title="View">
            <IconButton
              size="small"
              sx={{ color: "#4B5945" }}
              onClick={() => navigate(`${params.row.id}`)}
            >
              <VisibilityIcon  size={24}/>
            </IconButton>
          </Tooltip>
             {/* <Tooltip title="Chat">
            <IconButton
              size="small"
              sx={{ color: "#4B5945" }}
              onClick={() => {
                setIsOpenChat(true);
                setSelectedId(params.row.id)
              }}
            >
              <AddCommentIcon  size={22}/>
            </IconButton>
          </Tooltip> */}
          {/* زر التعديل */}
          <Tooltip title="Edit">
            <IconButton
              size="small"
             
              onClick={() => navigate(`${params.row.id}/edit`)}
            >
             <EditIcon size={24}   color="#ff4d1c" />
            </IconButton>
          </Tooltip>

       
          <Tooltip title={isActive ? "Deactivate" : "Activate"}>
            <IconButton
              size="small"
           
              sx={{ color: isActive ? "#d32f2f" : "#2e7d32" }}
              onClick={() => {
                if (isActive) {
                setIsOpenDeActive(true)
                   setSelectedId(params.row.id)
                   setUserName(params.row.userName)
                
                } else {
                   setIsOpenActive(true)
                   setSelectedId(params.row.id)
                   setUserName(params.row.userName)
                }
              }}
            >
              {isActive ? (
        
                <ToggleOn size={24} />
              ) : (
     
                <ToggleOff size={24} />
              )}
            </IconButton>
          </Tooltip>
        </Stack>
      );
    },
  },
];
const getRowId = (row: UserRow) => row.id;

    return (
                <div className="p-8">
                        <div className="mx-auto flex max-w-7xl flex-col gap-6">
                                <div className="flex justify-between align-middle items-center">
                                  <h1 className="text-2xl font-bold">Users</h1>
                                    <div className="w-32">
                                        <Button name="Add User" onClick={() => navigate("/users/add")} />
                                    </div>
                                </div>

                                <div className="rounded-2xl bg-white p-6 shadow-md">
                                    {isLoading ? (
                                        <p className="text-center text-sm text-gray-500">Loading users...</p>
                                    ) : (

                                        <CustomDataGrid
                                            rows={rows}
                                            columns={columns}
                                            getRowId={getRowId}
                                            initialPageSize={10}
                                            pageSizeOptions={[5, 10, 20]}
                                            sx={{ minHeight: 520 }}
                                        />
                                    )}
                                </div>
            </div>
            <ActiveUserModal 
            open={isOpneActive} 
            onClose={()=>setIsOpenActive(false) } 
            id={selecetedId} 
            userName={userName}            
            />
             <DeActiveUserModal 
            open={isOpneDeActive} 
            onClose={()=>setIsOpenDeActive(false) } 
            id={selecetedId} 
            userName={userName}            
            />
            {/* <CreateDirectChatModal
            open={isOpneChat}
            onClose={()=>setIsOpenChat(false)}
            recipientAccountId={selecetedId}
            /> */}
        </div>
    );
};

export default UsersPage;