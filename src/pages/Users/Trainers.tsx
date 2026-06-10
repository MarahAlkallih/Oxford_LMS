import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Buttons/SubmitBtn"
import { useGetTrainersQuery } from "../../services/trainer/getTrainers";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { IconButton, Stack, Tooltip } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CustomDataGrid from "../../components/DataGrid/DataGrid";
import type { Trainer } from "../../types/user";
import { useState } from "react";
export const Trainers = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const { data, isLoading } = useGetTrainersQuery({
        page: page + 1,
        limit: pageSize,
    });
    console.log(data)
    type TrainerRow = Trainer & {
        id?: string | number;
    };
    const columns: GridColDef[] = [
        { field: "firstName", headerName: "First Name", flex: 1, minWidth: 140 },
        { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 140 },
        { field: "email", headerName: "Email", flex: 1.2, minWidth: 200 },
        { field: "phoneNumber", headerName: "Phone", flex: 1, minWidth: 140 },

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
                            onClick={() => navigate(`${params.row.trainer.account.id}`)}
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

    const rows =
  data?.data.map((trainer) => ({
    id: trainer.id,

    firstName: trainer.account.firstName,
    lastName: trainer.account.lastName,
    email: trainer.account.email,
    phoneNumber: trainer.account.phoneNumber,

    trainer,
  })) || [];
    const getRowId = (row: TrainerRow) => row.id ?? row.userName ?? row.email;
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl">Trainers</h1>
                <div>
                    <Button name="Add Trainer" onClick={() => navigate("addtrainer")} />
                </div>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-md">
                {isLoading ? (
                    <p className="text-center text-sm text-gray-500">Loading users...</p>
                ) : (
      <CustomDataGrid
  rows={rows}
  columns={columns}
  loading={isLoading}
  paginationMode="server"
  rowCount={data?.meta.totalRecords || 0}
  paginationModel={{
    page,
    pageSize,
  }}
  onPaginationModelChange={(model) => {
    setPage(model.page);
    setPageSize(model.pageSize);
  }}
/>
                )}
            </div>


        </div>
    )
}