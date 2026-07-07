import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMeQuery} from "../../../services/trainer/getTrainers";
import { useEditTrainerMutation } from "../../../services/trainer/createTrainer";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { ErrorHandler } from "../../../utils/ErrorHandler";
import { toast } from "react-toastify";

export const EditTrainer = () => {
  const navigate = useNavigate();
  const {id}=useParams();
  const trainerId=Number(id)
  const { data: trainer, isLoading: isFetching } = useGetMeQuery(undefined);
  const [originalData, setOriginalData] = useState<typeof formData | null>(null);
  const [editTrainer, { isLoading: isUpdating }] = useEditTrainerMutation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    gender: "FEMALE",
    languageId: 1,
    phoneNumber: "",
    aboutMe: "",
    birthDate: "",
  });

  // دالة تنظيف التاريخ ليعرض داخل الـ input بصيغة YYYY-MM-DD
  const formatDateForInput = (dateString?: string) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

 useEffect(() => {
  if (trainer?.account) {
    const account = trainer.account;

    const data = {
      firstName: account.firstName || "",
      lastName: account.lastName || "",
      userName: account.userName || "",
      gender: account.gender || "FEMALE",
      languageId: account.languageId || 1,
      phoneNumber: account.phoneNumber || "",
      aboutMe: account.aboutMe || "",
      birthDate: formatDateForInput(account.birthDate),
    };

    setFormData(data);
    setOriginalData(data);
  }
}, [trainer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!originalData) return;

  const payload: Record<string, any> = {};

  if (formData.firstName !== originalData.firstName)
    payload.firstName = formData.firstName;

  if (formData.lastName !== originalData.lastName)
    payload.lastName = formData.lastName;

  if (formData.userName !== originalData.userName)
    payload.userName = formData.userName;

  if (formData.gender !== originalData.gender)
    payload.gender = formData.gender;

  if (Number(formData.languageId) !== Number(originalData.languageId))
    payload.languageId = Number(formData.languageId);

  if (formData.phoneNumber !== originalData.phoneNumber)
    payload.phoneNumber = formData.phoneNumber;

  if (formData.aboutMe !== originalData.aboutMe)
    payload.aboutMe = formData.aboutMe;

  if (formData.birthDate !== originalData.birthDate)
    payload.birthDate = formData.birthDate
      ? `${formData.birthDate}T00:00:00.000Z`
      : null;

  if (Object.keys(payload).length === 0) {
    toast.info("No changes detected");
    return;
  }

  console.log(payload);

  try {
    await editTrainer({
      id: trainerId,
      data: payload,
    }).unwrap();

    toast.success("Updated");
    navigate(-1);
  } catch (error) {
    ErrorHandler.show(error);
  }
};
  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-main-color"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-6">
      
      {/* زر إلغاء والعودة */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-main-color font-medium transition-colors text-sm"
      >
        <ArrowBackIosNewOutlinedIcon sx={{ fontSize: 14 }} />
        Cancel and back
      </button>

      {/* كارد الفورم الرئيسي */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
        <div>
          <h1 className="text-xl font-black text-main-color">Edit Personal Profile</h1>
          <p className="text-gray-400 text-xs mt-1">Keep your information accurate and updated for your trainees.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* الاسم الأول */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-main-color focus:ring-2 focus:ring-main-color/10 outline-none transition-all text-sm capitalize"
              />
            </div>

            {/* الاسم الأخير */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-main-color focus:ring-2 focus:ring-main-color/10 outline-none transition-all text-sm capitalize"
              />
            </div>

            {/* اسم المستخدم */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Username</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-main-color focus:ring-2 focus:ring-main-color/10 outline-none transition-all text-sm"
              />
            </div>

            {/* رقم الهاتف */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+963..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-main-color focus:ring-2 focus:ring-main-color/10 outline-none transition-all text-sm"
              />
            </div>

            {/* الجنس */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Gender Orientation</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-main-color focus:ring-2 focus:ring-main-color/10 outline-none transition-all text-sm bg-white"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>

            {/* تاريخ الميلاد */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Birth Date</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-main-color focus:ring-2 focus:ring-main-color/10 outline-none transition-all text-sm"
              />
            </div>

            {/* لغة التطبيق */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Preferred Language</label>
              <select
                name="languageId"
                value={formData.languageId}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-main-color focus:ring-2 focus:ring-main-color/10 outline-none transition-all text-sm bg-white"
              >
                <option value={1}>English</option>
                <option value={2}>Arabic</option>
              </select>
            </div>

            {/* نبذة عني */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">About Me / Bio</label>
              <textarea
                name="aboutMe"
                value={formData.aboutMe}
                onChange={handleChange}
                rows={4}
                placeholder="Share your coaching philosophy or background..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-main-color focus:ring-2 focus:ring-main-color/10 outline-none transition-all text-sm resize-none"
              />
            </div>

          </div>

          {/* أزرار التحكم والاتخاذ للإجراءات */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={isUpdating}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-all text-sm disabled:opacity-50"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isUpdating}
              className="flex items-center gap-2 bg-(--color-watermelon) hover:bg-(--color-watermelon)/90 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md transition-all text-sm disabled:opacity-70"
            >
              {isUpdating ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <SaveOutlinedIcon sx={{ fontSize: 18 }} />
              )}
              {isUpdating ? "Saving..." : "Save Profile"}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};