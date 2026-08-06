import { useParams, useNavigate } from "react-router-dom";
import { useGetTrainerQuery } from "../../../services/trainer/getTrainers";

export const TrainerInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = Number(id);

  const { data, isLoading } = useGetTrainerQuery(
    { id: userId },
    { skip: !id || isNaN(userId) }
  );

  const account = data?.account;

  const getInitials = () => {
    if (!account?.firstName) return "T";
    return `${account.firstName[0]}${account.lastName?.[0] || ""}`.toUpperCase();
  };

  return (
    <div className="w-full min-h-screen p-4 md:p-8 bg-gray-50/50">
      {/* السطر العلوي: العنوان وزر العودة */}
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Trainer Profile</h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back
        </button>
      </div>

      {/* حالة التحميل */}
      {isLoading ? (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[300px] gap-3">
          <div className="w-10 h-10 border-4
           border-(--sec-color) border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-400 font-medium animate-pulse">Loading Trainer Data...</span>
        </div>
      ) : !data ? (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center text-red-500 font-semibold">
          Trainer not found or error loading data.
        </div>
      ) : (
     
        <div className="max-w-3xl mx-auto bg-(--third-color) rounded-2xl shadow-xl shadow-gray-100/40 border border-gray-100 overflow-hidden">
          
          {/* بنر الهيدر العلوي */}
          <div className="relative h-24 bg-(--third-color)"></div>

          {/* معلومات الهوية الرئيسية (الافتار والاسم والحالة) */}
          <div className="px-6 pb-6 relative flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-10 mb-6 border-b border-gray-100">
           (
              <div className={`w-20 h-20 rounded-2xl border-4 border-white shadow-md flex items-center justify-center text-xl font-bold text-white relative z-10 ${
                account?.gender === "FEMALE" ? "bg-(--color-watermelon)" : "bg-blue-300"
              }`}>
                {getInitials()}
              </div>
            )

            <div className="flex-1 pt-2 sm:pt-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl font-bold text-white">
                  {account?.firstName} {account?.lastName}
                </h2>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide ${
                  account?.isActive ? "bg-green-50 text-green-600 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"
                }`}>
                  {account?.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-sm text-gray-800 font-medium mt-0.5">@{account?.firstName}</p>
            </div>
          </div>

          {/* شبكة البيانات التفصيلية */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* الإيميل */}
            <div className="flex items-center gap-3.5 p-3.5 bg-gray-50/60 rounded-xl border border-gray-100/50">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</span>
                <span className="text-sm font-bold text-gray-700 mt-0.5 truncate">{account?.email || "—"}</span>
              </div>
            </div>

            {/* الهاتف */}
            <div className="flex items-center gap-3.5 p-3.5 bg-gray-50/60 rounded-xl border border-gray-100/50">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.806-5.194-4.176-7-7l1.293-.97a1.125 1.125 0 0 0 .417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone Number</span>
                <span className="text-sm font-bold text-gray-700 mt-0.5">{account?.phoneNumber || "—"}</span>
              </div>
            </div>

            {/* الجنس */}
            <div className="flex items-center gap-3.5 p-3.5 bg-gray-50/60 rounded-xl border border-gray-100/50">
              <div className="p-2 bg-pink-50 text-pink-600 rounded-lg shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Gender</span>
                <span className="text-sm font-bold text-gray-700 mt-0.5 capitalize">{account?.gender?.toLowerCase() || "—"}</span>
              </div>
            </div>

            {/* اللغة المفضلة */}
            <div className="flex items-center gap-3.5 p-3.5 bg-gray-50/60 rounded-xl border border-gray-100/50">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Language</span>
                <span className="text-sm font-bold text-gray-700 mt-0.5">{account?.language?.name || "—"}</span>
              </div>
            </div>

            {/* نبذة عني (About Me) - يمتد على كامل العرض */}
            <div className="md:col-span-2 flex flex-col gap-1 p-3.5 bg-gray-50/60 rounded-xl border border-gray-100/50">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">About Me</span>
              <p className="text-sm font-medium text-gray-600 mt-1 italic">
                {account?.aboutMe || "No bio description provided yet."}
              </p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};