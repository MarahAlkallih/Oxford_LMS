import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Buttons/SubmitBtn";
import { useGetTrainersQuery, useGetInActiveTrainersQuery } from "../../../services/trainer/getTrainers";
import { type GridColDef } from "@mui/x-data-grid";
import { IconButton, Stack, Tooltip } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import CustomDataGrid from "../../../components/DataGrid/DataGrid";
import type { Trainer } from "../../../types/user";
import { useState } from "react";
import { ActiveTrainerModal } from "../../../components/User/Trainer/ActiveModal";
import { DeActiveTrainerModal } from "../../../components/User/Trainer/DeActiveModal";

export const Trainers = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [statusFilter, setStatusFilter] = useState<"active" | "inactive">("active");

    const [isOpneActive, setIsOpenActive] = useState(false);
    const [isOpneDeActive, setIsOpenDeActive] = useState(false);
    const [selecetedId, setSelectedId] = useState(0);
    const [userName, setUserName] = useState("");

    const { data: activeData, isLoading: isActiveLoading } = useGetTrainersQuery(
        { page: page + 1, limit: pageSize },
        { skip: statusFilter !== "active" } 
    );

 
    const { data: inactiveData, isLoading: isInactiveLoading } = useGetInActiveTrainersQuery(
        { page: page + 1, limit: pageSize }, 
        { skip: statusFilter !== "inactive" } 
    );


    const currentData = statusFilter === "active" ? activeData : inactiveData;
    const isLoading = statusFilter === "active" ? isActiveLoading : isInactiveLoading;

    type TrainerRow = Trainer & {
        id?: string | number;
        isActive?: boolean;
    };

    const columns: GridColDef[] = [
        { field: "firstName", headerName: "First Name", flex: 1, minWidth: 140 },
        { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 140 },
        { field: "email", headerName: "Email", flex: 1.2, minWidth: 200 },
        { field: "languageName", headerName: "Language", flex: 1.2, minWidth: 160 },
        
        { 
            field: "isActive", 
            headerName: "Status", 
            flex: 1, 
            minWidth: 120,
            renderCell: (params) => {
                const active = params.value;
                return (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                        {active ? "Active" : "Inactive"}
                    </span>
                );
            }
        },

        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            filterable: false,
            width: 200, 
            align: "center",
            headerAlign: "center",
        
            renderCell: (params) => {
                const active = params.row.isActive;

                return (
                    <Stack direction="row" spacing={0.5}>
                        
                        <Tooltip title={active ? "Deactivate" : "Activate"}>
                            <IconButton
                                size="small"
                                sx={{ color: active ? "#2e7d32" : "#757575" }} 
                                onClick={() => {
                                    setSelectedId(Number(params.row.trainer.id));
                                    setUserName(`${params.row.firstName} ${params.row.lastName}`);
                                    
                                    if (active) {
                                        setIsOpenDeActive(true);
                                    } else {
                                        setIsOpenActive(true);
                                    }
                                }}
                            >
                                {active ? <ToggleOnIcon fontSize="medium" /> : <ToggleOffIcon fontSize="medium" />}
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="View">
                            <IconButton
                                size="small"
                                sx={{ color: "#1976d2" }}
                                onClick={() => navigate(`${params.row.trainer.id}`)}
                            >
                                <VisibilityOutlinedIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Edit">
                            <IconButton
                                size="small"
                                sx={{ color: "#f9a825" }}
                                onClick={() => navigate(`${params.row.trainer.id}/edit`)}
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
                );
            },
        },
    ];


    const rows =
        currentData?.data.map((trainer) => ({
            id: trainer.id,
            firstName: trainer.account.firstName,
            lastName: trainer.account.lastName,
            email: trainer.account.email,
            languageName: trainer.account.languageName,
            isActive: trainer.account.isActive, 
            trainer,
        })) || [];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Trainers Management</h1>
                <div>
                    <Button name="Add Trainer" onClick={() => navigate("addtrainer")} />
                </div>
            </div>

            {/* أزرار التبديل الـ Tabs */}
            <div className="flex border-b border-gray-200 mb-4 gap-2">
                <button
                    onClick={() => {
                        setStatusFilter("active");
                        setPage(0); 
                    }}
                    className={`pb-2 px-4 text-sm font-medium border-b-2 transition-all ${
                        statusFilter === "active"
                            ? "border-green-500 text-green-600 font-bold"
                            : "border-transparent text-gray-400 hover:text-gray-600"
                    }`}
                >
                    Active Trainers
                </button>
                <button
                    onClick={() => {
                        setStatusFilter("inactive");
                        setPage(0); 
                    }}
                    className={`pb-2 px-4 text-sm font-medium border-b-2 transition-all ${
                        statusFilter === "inactive"
                            ? "border-red-500 text-red-600 font-bold"
                            : "border-transparent text-gray-400 hover:text-gray-600"
                    }`}
                >
                    Inactive / Archived
                </button>
            </div>

            {/* جدول عرض البيانات المشترك */}
            <div className="rounded-2xl bg-white p-6 shadow-md">
                {isLoading ? (
                    <p className="text-center text-sm text-gray-500">Loading users...</p>
                ) : (
                    <CustomDataGrid
                        rows={rows}
                        columns={columns}
                        loading={isLoading}
                        paginationMode="server"
                        rowCount={currentData?.meta?.totalRecords || 0}
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

            <ActiveTrainerModal
                open={isOpneActive}
                onClose={() => setIsOpenActive(false)}
                id={selecetedId}
                userName={userName} 
            />
            <DeActiveTrainerModal
                open={isOpneDeActive}
                onClose={() => setIsOpenDeActive(false)}
                id={selecetedId}
                userName={userName} 
            />
        </div>
    );
};