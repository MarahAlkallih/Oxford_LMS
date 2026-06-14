import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { IconButton, Pagination, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetTraineesQuery } from "../../services/users/GetTrainees";

export const TraineesPage = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  const { data, isLoading } = useGetTraineesQuery({
    page,
    limit: pageSize,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          Trainees
        </h1>

        <span className="text-sm text-gray-500">
          Total: {data?.meta.totalRecords ?? 0}
        </span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        {data?.data.map((trainee) => (
          <div
            key={trainee.id}
            className="bg-white rounded-2xl shadow-md p-5 border hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start">

              <div className="flex gap-3">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                  <PersonOutlineOutlinedIcon />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    {trainee.account.firstName}{" "}
                    {trainee.account.lastName}
                  </h3>

                  <p className="text-xs text-gray-500">
                    ID: {trainee.account.id}
                  </p>
                </div>
              </div>

              <Tooltip title="View Details">
                <IconButton
                  onClick={() =>
                    navigate(`${trainee.account.id}`)
                  }
                >
                  <VisibilityOutlinedIcon />
                </IconButton>
              </Tooltip>

            </div>

            <div className="mt-4 space-y-2">

              <div className="flex items-center gap-2 text-sm">
                <EmailOutlinedIcon fontSize="small" />
                <span>{trainee.account.email}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <PhoneOutlinedIcon fontSize="small" />
                <span>
                  {trainee.account.phoneNumber || "No phone"}
                </span>
              </div>

              <div className="text-sm text-gray-600">
                Gender: {trainee.account.gender}
              </div>

              <div className="text-sm text-gray-600">
                Language: {trainee.account.language?.name}
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <Pagination
          page={page}
          count={data?.meta.totalPages || 1}
          color="standard"
          onChange={(_, value) => setPage(value)}
        />
      </div>

    </div>
  );
};