import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "../../../components/Buttons/SubmitBtn";

import type { CreateTrainer } from "../../../types/user";

import { useGetTrainerQuery } from "../../../services/trainer/getTrainers";
import { useEditTrainerMutation } from "../../../services/trainer/createTrainer"; // 💡 تأكدي من مسار هوك التعديل لديكِ
import { toast } from "react-toastify";
import { UserForm } from "../../../components/User/UserForm";

export const EditTrainerPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 1. جلب الـ id من الرابط
  const userId = Number(id);

  // 2. استدعاء راوت جلب بيانات الترينر الحالي
  const { data: fetchedData, isLoading: isFetching } = useGetTrainerQuery(
    { id: userId },
    { skip: !id || isNaN(userId) }
  );

  // 3. استدعاء هوك تعديل الترينر
  const [editTrainer, { isLoading: isUpdating }] = useEditTrainerMutation();

  const initialUser = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "", // نتركه فارغاً في التعديل
    gender: "",
    languageId: 0,
    phoneNumber: "",
  };

  const [user, setUser] = useState(initialUser);
  const [errors, setErrors] = useState<Partial<Record<keyof CreateTrainer, string>>>({});

  // 🌟 4. الـ useEffect لتعبئة الفورم من كائن account الراجع من الباك إند
  useEffect(() => {
    if (fetchedData?.account) {
      const account = fetchedData.account;
      setUser({
        firstName: account.firstName || "",
        lastName: account.lastName || "",
        userName: account.userName || "",
        email: account.email || "",
        password: "", // نتركه فارغاً لأسباب أمنية
        gender: account.gender || "",
        languageId: account.language?.id || 0,
        phoneNumber: account.phoneNumber || "",
      });
    }
  }, [fetchedData]);

  
  const handleChange = (key: keyof CreateTrainer, value: string | number) => {
    setUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

//   // 6. دالة حفظ التعديلات وإرسال الداتا المعدلة فقط
  const handleEdit = async () => {
    
   
    try {
      const payload: any = {};
      const account = fetchedData?.account;

      // 🔄 فلترة الحقول وإضافة المعدل منها فقط إلى الـ payload
      if (user.firstName !== (account?.firstName || "")) payload.firstName = user.firstName;
      if (user.lastName !== (account?.lastName || "")) payload.lastName = user.lastName;
      if (user.userName !== (account?.userName || "")) payload.userName = user.userName;
      if (user.email !== (account?.email || "")) payload.email = user.email;
      if (user.gender !== (account?.gender || "")) payload.gender = user.gender;
       if (user.languageId !== (account?.language?.id || 0)) payload.languageId = user.languageId;
      if (user.phoneNumber !== (account?.phoneNumber || "")) payload.phoneNumber = user.phoneNumber;

      // إذا تم إدخال باسوورد جديد نرسله
      if (user.password.trim() !== "") {
        payload.password = user.password;
      }

      // فحص إذا لم يتغير أي شيء
      if (Object.keys(payload).length === 0) {
        toast.info("No changes detected.");
        return;
      }

      console.log("🔥 Sending Only Modified Trainer Fields:", payload);

      // إرسال الـ id والـ data المفصلة للميوتيشن كما يتوقع الـ API
      await editTrainer({
        id: userId,
        data: payload,
      }).unwrap();

      toast.success("Trainer Updated successfully!");
      navigate("/users/trainer"); // العودة لجدول العرض
    } catch (err: any) {
      const errorMessage = Array.isArray(err?.data?.message)
        ? err.data.message.join(" , ")
        : err?.data?.message || "Something went wrong";

      toast.error(errorMessage);
    }
  };

  // واجهة لودينج أثناء جلب البيانات الأصلية من السيرفر
  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-bold text-gray-400 animate-pulse">
        Loading Trainer Data...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-8">
      {/* Back Button */}
      <div className="flex justify-end mb-6">
        <div className="w-32">
          <Button name="Back" onClick={() => navigate("/users/display")} />
        </div>
      </div>

      {/* Form Container */}
      <UserForm<CreateTrainer>
        user={user}
        errors={errors}
        onChange={handleChange}
        isEdit={true}
      />

      {/* Submit Button */}
      <div className="flex justify-center mt-12">
        <div className="w-48">
          <Button
            name={isUpdating ? "Saving..." : "Save Changes"}
            onClick={handleEdit}
          />
        </div>
      </div>
    </div>
  );
};