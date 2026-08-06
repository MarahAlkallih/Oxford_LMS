import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../../services/users/User";

export const DisplayUserInfo = () => {
  const { id } = useParams();
  const userId = Number(id);

  const { data, isLoading } = useGetUserByIdQuery(userId, {
    skip: !id || isNaN(userId),
  });

 
  const userInfo = data; 
  const accountInfo = userInfo?.account;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">User Information</h1>

      {isLoading ? (
        <div className="flex items-center justify-center p-12 font-bold text-gray-400 animate-pulse text-lg">
          Loading Data....
        </div>
      ) : !userInfo ? (
        <div className="text-center p-12 font-bold text-red-400">
          No User Data Found!
        </div>
      ) : (
  
        <div className="bg-(--third-color) border border-gray-100 shadow-xl rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="flex flex-col p-3 bg-gray-50 rounded-xl">
            <span className="text-xs text-gray-400 font-semibold uppercase">First Name</span>
            <strong className="text-gray-700 text-base mt-0.5">{accountInfo?.firstName || "—"}</strong>
          </div>

          <div className="flex flex-col p-3 bg-gray-50 rounded-xl">
            <span className="text-xs text-gray-400 font-semibold uppercase">Last Name</span>
            <strong className="text-gray-700 text-base mt-0.5">{accountInfo?.lastName || "—"}</strong>
          </div>

          <div className="flex flex-col p-3 bg-gray-50 rounded-xl">
            <span className="text-xs text-gray-400 font-semibold uppercase">Username</span>
            <strong className="text-gray-700 text-base mt-0.5">@{accountInfo?.userName || "—"}</strong>
          </div>

          <div className="flex flex-col p-3 bg-gray-50 rounded-xl">
            <span className="text-xs text-gray-400 font-semibold uppercase">Email Address</span>
            <strong className="text-gray-700 text-base mt-0.5">{accountInfo?.email || "—"}</strong>
          </div>

          <div className="flex flex-col p-3 bg-gray-50 rounded-xl">
            <span className="text-xs text-gray-400 font-semibold uppercase">Phone Number</span>
            <strong className="text-gray-700 text-base mt-0.5">{accountInfo?.phoneNumber || "—"}</strong>
          </div>

          <div className="flex flex-col p-3 bg-gray-50 rounded-xl">
            <span className="text-xs text-gray-400 font-semibold uppercase">Gender</span>
            <strong className="text-gray-700 text-base mt-0.5">{accountInfo?.gender || "—"}</strong>
          </div>

          <div className="flex flex-col p-3 bg-gray-50 rounded-xl">
            <span className="text-xs text-gray-400 font-semibold uppercase">Language</span>
            <strong className="text-gray-700 text-base mt-0.5">{accountInfo?.languageName || "—"}</strong>
          </div>

          <div className="flex flex-col p-3 bg-gray-50 rounded-xl">
            <span className="text-xs text-gray-400 font-semibold uppercase">Roles</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {userInfo?.roles?.map((role, index) => (
                <span key={index} className="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full text-xs font-bold">
                  {role}
                </span>
              )) || <strong className="text-gray-700 text-base">—</strong>}
            </div>
          </div>

          <div className="flex flex-col p-3 bg-gray-50 rounded-xl md:col-span-2">
            <span className="text-xs text-gray-400 font-semibold uppercase">Account Status</span>
            <div className="mt-1 flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${accountInfo?.isActive ? "bg-green-500" : "bg-red-500"}`} />
              <strong className={`text-base font-bold ${accountInfo?.isActive ? "text-green-600" : "text-red-600"}`}>
                {accountInfo?.isActive ? "Active" : "Inactive"}
              </strong>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};