import { useNavigate } from "react-router-dom";
import { useGetMeQuery } from "../../../services/trainer/getTrainers";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

export const TrainerProfile = () => {
  const navigate = useNavigate();
  const { data: trainer, isLoading } = useGetMeQuery(undefined);

  // 1️⃣ حالة التحميل الـ Skeleton المتناسقة مع الألوان الجديدة
  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse p-6 max-w-5xl mx-auto">
        <div className="h-40 bg-gray-100 rounded-3xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-60 bg-gray-100 rounded-2xl"></div>
          <div className="h-60 md:col-span-2 bg-gray-100 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  const account = trainer?.account;
  
  // توليد الحروف الأولى للاسم كشعار شخصي بديل للصورة
  const initials = `${account?.firstName?.charAt(0) || ""}${account?.lastName?.charAt(0) || ""}`.toUpperCase();

  const formatValue = (value: unknown) => {
    if (value === null || value === undefined || value === "") {
      return <span className="text-gray-400 italic text-sm">Not Provided Yet</span>;
    }
    return String(value);
  };

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      
      {/* 2️⃣ الهيدر العلوي: كارد الغلاف التعريفي الذكي */}
      <div className="relative bg-gradient-to-r from-(--main-color) to-(--main-color)/80 text-white rounded-3xl p-6 md:p-8 shadow-lg overflow-hidden">
        {/* لمسة خلفية جمالية بلون البطيخي مخفف جداً لكسر الجمود */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-color-water-melon/10 rounded-full blur-2xl"></div>
        
        <div className="relative flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-5 text-center md:text-left">
            
            {/* الأفاتار الشخصي مع مؤشر الحساب النشط */}
            <div className="relative w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-md text-white font-bold text-3xl flex items-center justify-center border-2 border-white/20 shadow-inner shrink-0">
              {initials}
              {account?.isActive && (
                <span className="absolute -bottom-1 -right-1 block h-4 w-4 rounded-full bg-green-500 ring-4 ring-main-color animate-pulse" />
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h1 className="text-2xl md:text-3xl f capitalize">
                  {account?.firstName} {account?.lastName}
                </h1>
                {account?.emailVerifiedAt && (
                  <VerifiedUserOutlinedIcon className="text-color-water-melon" fontSize="small" titleAccess="Verified Coach" />
                )}
              </div>
              <p className="text-white/70 text-sm font-medium">@{account?.userName}</p>
            </div>
          </div>

          {/* 3️⃣ زر التعديل: يعتمد على لون الـ Water Melon ليكون واضحاً وجذاباً */}
          <button
            onClick={() => navigate(`edit/${trainer?.id}`)} // يوجه لصفحة التعديل التابعة لراوت البروفايل الحالي
            className="flex items-center gap-2 cursor-pointer bg-(--color-watermelon) hover:bg-(--color-watermelon)/90
             text-white font-semibold px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-sm whitespace-nowrap"
          >
            <EditOutlinedIcon fontSize="small" />
            Edit My Profile
          </button>
        </div>
      </div>

      {/* الجسم الرئيسي للبروفايل: تقسيم 3 أعمدة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* العمود الجانبي (يسار): معلومات سريعة ونبذة */}
        <div className="space-y-6">
          {/* كارد النبذة التعريفية */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-main-color tracking-wider uppercase mb-3 flex items-center gap-2">
              <PersonOutlineOutlinedIcon fontSize="small" className="text-color-water-melon" />
              About Me
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
              {account?.aboutMe ? account.aboutMe : (
                <span className="text-gray-400 italic">No bio written yet. Click edit to introduce yourself to your trainees!</span>
              )}
            </p>
          </div>

          {/* كارد إعدادات النظام الحالية */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-main-color tracking-wider uppercase flex items-center gap-2">
              <NotificationsOutlinedIcon fontSize="small" className="text-color-water-melon" />
              System Preferences
            </h3>
            
            <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2.5">
              <span className="text-gray-500 font-medium">Notifications</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                account?.onNotification ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
              }`}>
                {account?.onNotification ? "Enabled" : "Disabled"}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-medium">Trainer ID</span>
              <span className="font-mono text-gray-700 bg-gray-50 px-2 py-0.5 rounded text-xs">
                #{trainer?.id}
              </span>
            </div>
          </div>
        </div>

        {/* العمود الأساسي (يمين): البيانات الشخصية المنظمة */}
        <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6">
          
          {/* تفاصيل الحساب والمعلومات الأساسية */}
          <div>
            <h2 className="text-lg font-bold text-main-color mb-4 pb-2 border-b border-gray-100">
              Personal Credentials
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">First Name</label>
                <p className="text-gray-800 font-medium mt-1 capitalize">{formatValue(account?.firstName)}</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Last Name</label>
                <p className="text-gray-800 font-medium mt-1 capitalize">{formatValue(account?.lastName)}</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Gender Orientation</label>
                <p className="text-gray-800 font-medium mt-1 text-xs bg-gray-100 px-2.5 py-1 rounded-md inline-block">
                  {account?.gender || "Not Specified"}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Date of Birth</label>
                <div className="flex items-center gap-1.5 text-gray-800 font-medium mt-1">
                  <CalendarMonthOutlinedIcon fontSize="small" className="text-gray-400" />
                  <p>{account?.birthDate ? new Date(account.birthDate).toLocaleDateString() : <span className="text-gray-400 italic text-sm">Not Set</span>}</p>
                </div>
              </div>
            </div>
          </div>

          {/* تفاصيل الاتصال واللغة */}
          <div className="pt-2">
            <h2 className="text-lg font-bold text-main-color mb-4 pb-2 border-b border-gray-100">
              Contact & Language Settings
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</label>
                <div className="flex items-center gap-2 text-gray-800 font-medium mt-1.5">
                  <EmailOutlinedIcon fontSize="small" className="text-gray-400" />
                  <span className="truncate">{formatValue(account?.email)}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone Number</label>
                <div className="flex items-center gap-2 text-gray-800 font-medium mt-1.5">
                  <PhoneOutlinedIcon fontSize="small" className="text-gray-400" />
                  <span>{formatValue(account?.phoneNumber)}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">App Language</label>
                <div className="flex items-center gap-2 text-gray-800 font-medium mt-1.5">
                  <LanguageOutlinedIcon fontSize="small" className="text-gray-400" />
                  <span className="text-xs bg-main-color/5 text-main-color px-2 py-0.5 rounded font-bold">
                    {account?.languageName || "English"}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Profile Registry Date</label>
                <p className="text-gray-500 font-medium mt-1.5 text-xs">
                  Joined: {trainer?.createdAt ? new Date(trainer.createdAt).toLocaleString() : "N/A"}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};