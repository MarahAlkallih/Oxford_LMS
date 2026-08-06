import {VisibilityIcon} from "../../../components/Icons/index"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import GTranslateIcon from "@mui/icons-material/GTranslate"; // أيقونة تعبر عن جوجل أو الحساب المرتبط
import { IconButton, Pagination, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetTraineesQuery } from "../../../services/users/GetTrainees";

export const TraineesPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6); 

  const { data, isLoading } = useGetTraineesQuery({
    page,
    limit: pageSize,
  });


  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

 
  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="h-8 w-40 bg-gray-200 rounded-lg"></div>
          <div className="h-5 w-20 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-gray-50 h-48 rounded-2xl border border-gray-100"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
   
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Trainees</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage and monitor platform students</p>
        </div>
        <span className="bg-blue-50 text-(--main-color) text-xs font-semibold px-3 py-1.5 rounded-full">
          Total: {data?.meta.totalRecords ?? 0}
        </span>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {data?.data.map((trainee) => {
          const account = trainee.account;
          const initials = getInitials(account.firstName, account.lastName);

          return (
            <div
              key={trainee.id}
              className="group bg-linear-to-r from-(--sec-color) to-(--third-color) rounded-2xl p-5 border border-gray-100
               hover:border-(--main-color) shadow-sm hover:shadow-md hover:-translate-y-1 
               transition-all duration-300 flex flex-col justify-between"
            >
              <div>
              
                <div className="flex justify-between items-start gap-2">
                  <div className="flex gap-3.5 items-center">
                
                    <div className="relative w-12 h-12 rounded-full bg-linear-to-br from-blue-50 to-indigo-50 text-(--main-color) font-bold text-sm flex items-center justify-center border border-blue-100/50 shrink-0">
                      {initials}
                      {account.isActive && (
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
                      )}
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-100 text-base  transition-colors capitalize line-clamp-1">
                        {account.firstName} {account.lastName}
                      </h3>
                      <p className="text-xs text-gray-200 font-bold mt-0.5">
                        @{account.userName}
                      </p>
                    </div>
                  </div>

                  <Tooltip title="View Full Profile" arrow>
                    <IconButton
                      size="small"
                      className="text-gray-100 hover:text-(--main-color) hover:bg-blue-50"
                      onClick={() => navigate(`${trainee.id}`)} 
                    >
                      <VisibilityIcon color="white" size={24} />
                    </IconButton>
                  </Tooltip>
                </div>

                <div className="mt-5 space-y-2.5 border-t border-gray-50 pt-4">
                  <div className="flex items-center gap-2.5 text-gray-200 text-sm">
                    <EmailOutlinedIcon sx={{fontSize:"24px"}} className="text-(--light-color)" />
                    <span className="truncate" title={account.email}>
                      {account.email}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 text-gray-600 text-sm">
                    <LanguageOutlinedIcon sx={{fontSize:"24px"}} className="text-(--orange-color)" />
                    <span className="font-medium text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
                      {account.languageName}
                    </span>
                  </div>
                </div>
              </div>

              {/* الجزء السفلي: ميزات إضافية مأخوذة من المودل (مثل الربط بجوجل) */}
              <div className="mt-4 pt-3 border-t border-dashed border-gray-100 flex justify-between items-center text-[11px] text-gray-200">
                <span>ID: #{trainee.id}</span>
                {trainee.googleId && (
                  <span className="flex items-center gap-1 text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded">
                    <GTranslateIcon sx={{ fontSize: 12 }} /> Google Connected
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* أزرار التنقل (Pagination) بتنسيق مركزي مريح */}
      <div className="flex justify-center pt-4">
        <Pagination
          page={page}
          count={data?.meta.totalPages || 1}
          variant="outlined"
          shape="rounded"
        
          onChange={(_, value) => setPage(value)}
          sx={{
            '& .MuiPaginationItem-root': {
              borderColor: '#4B5945',
            }
          }}
        />
      </div>
    </div>
  );
};