import { useNavigate } from "react-router-dom";
import {Button} from "../../components/Buttons/SubmitBtn"
import { useGetUsersQuery } from "../../services/users/User";
import type { GridColDef } from "@mui/x-data-grid";
import { IconButton, Stack, Tooltip } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import type { User } from "../../types/user"
import CustomDataGrid from "../../components/DataGrid/DataGrid";
const UsersPage = () => {
const navigate = useNavigate();
const {data,isLoading}=useGetUsersQuery();
console.log(data)
type UserRow = User & {
    id?: string | number;
};

const rows = (data ?? []) as UserRow[];

const columns: GridColDef<UserRow>[] = [
    { field: "firstName", headerName: "First Name", flex: 1, minWidth: 140 },
    { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 140 },
    { field: "userName", headerName: "User Name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1.2, minWidth: 200 },
    { field: "phoneNumber", headerName: "Phone", flex: 1, minWidth: 140 },
    { field: "roles", headerName: "Role", flex: 0.8, minWidth: 120 },
    {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        filterable: false,
        width: 160,
        align: "center",
        headerAlign: "center",
      renderCell: (params) => (
  <Stack direction="row" spacing={0.5}>
    
    <Tooltip title="View">
      <IconButton
        size="small"
        sx={{ color: "#1976d2" }}
        onClick={() => navigate(`${params.row.id}`)}
      >
        <VisibilityOutlinedIcon fontSize="small" />
      </IconButton>
    </Tooltip>

    <Tooltip title="Edit">
      <IconButton
        size="small"
        sx={{ color: "#f9a825" }}
        onClick={() => console.log("edit", params.row)}
      >
        <EditOutlinedIcon fontSize="small" />
      </IconButton>
    </Tooltip>

    <Tooltip title="Delete">
      <IconButton
        size="small"
        sx={{ color: "#d32f2f" }}
        onClick={() => console.log("delete", params.row)}
      >
        <DeleteOutlineOutlinedIcon fontSize="small" />
      </IconButton>
    </Tooltip>

  </Stack>
        ),
    },
];

const getRowId = (row: UserRow) => row.id ?? row.userName ?? row.email;

    return (
                <div className="p-8">
                        <div className="mx-auto flex max-w-7xl flex-col gap-6">
                                <div className="flex justify-end">
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
        </div>
    );
};

export default UsersPage;