import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Buttons/SubmitBtn";
import { rules } from "../../utils/validationRules";
import type { User, CreateUser } from "../../types/user";
import { useGetUserByIdQuery } from "../../services/users/User";
import {useEditUserMutation} from "../../services/users/User"
import { toast } from "react-toastify";
import { UserForm } from "../../components/User/UserForm";
import { ErrorHandler } from "../../utils/ErrorHandler";

export const EditUserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 1. جلب الـ ID من رابط الصفحة (مثال: /users/edit/26)
  const userId = Number(id);

  // 2. استدعاء راوت جلب بيانات اليوزر الحالي (getOneUser)
  const { data: fetchedData, isLoading: isFetching } = useGetUserByIdQuery(userId, {
    skip: !id || isNaN(userId),
  });

  // 3. استدعاء هوك التعديل من الباك إند
  const [updateUser, { isLoading: isUpdating }] = useEditUserMutation();
  const [originalUser, setOriginalUser] = useState<CreateUser | null>(null);
  const initialUser: CreateUser = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "", // في التعديل نتركه فارغاً إلا لو أرادوا تغييره
    gender: "",
    languageId: 0,
    phoneNumber: "",
    role: "",
  };

  const [user, setUser] = useState<CreateUser>(initialUser);
  const [errors, setErrors] = useState<Partial<Record<keyof CreateUser, string>>>({});

  useEffect(() => {
  if (fetchedData) {
    const account = fetchedData.account;

    const userData = {
      firstName: account.firstName,
      lastName: account.lastName,
      userName: account.userName,
      email: account.email,
      password: "",
      gender: account.gender,
      languageId: account.languageId,
      phoneNumber: account.phoneNumber,
      role: fetchedData.roles?.[0] || "",
    };

    setUser(userData);
    setOriginalUser(userData);
  }
}, [fetchedData]);
  const validate = () => {
    const newErrors: Partial<Record<keyof CreateUser, string>> = {};

    newErrors.firstName = rules.required(user.firstName);
    newErrors.lastName = rules.required(user.lastName);
    newErrors.userName = rules.required(user.userName);
    newErrors.phoneNumber = rules.required(user.phoneNumber);

    newErrors.email = rules.required(user.email) || rules.email(user.email);

    // 💡 في التعديل: نتحقق من الباسورد فقط "إذا" قام المستخدم بكتابة شيء فيه
    if (user.password) {
      newErrors.password = rules.minLength(8)(user.password);
    }

    if (!user.gender) newErrors.gender = "Gender is required";
    if (!user.languageId) newErrors.languageId = "Language is required";

    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, value]) => value)
    );

    setErrors(filteredErrors);
    return Object.keys(filteredErrors).length === 0;
  };

  const handleChange = (key: keyof CreateUser, value: string | number) => {
    setUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

 const handleEdit = async () => {
  if (!validate()) return;

  if (!originalUser) return;

  const payload: Partial<CreateUser> = {};

  (Object.keys(user) as (keyof CreateUser)[]).forEach((key) => {
    if (user[key] !== originalUser[key]) {
      payload[key] = user[key] as any;
    }
  });

  delete payload.password;

  console.log("original", originalUser);
  console.log("current", user);
  console.log("payload", payload);

  try {
    await updateUser({
      id: userId,
      data: payload,
    }).unwrap();

    toast.success("User Updated successfully!");
    navigate("/users/display");
  } catch (err) {
    ErrorHandler.show(err);
  }
};
  // إذا كانت الداتا لسه بتتحمل من السيرفر نعرض لودينج واجهة كاملة
  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-bold text-gray-400 animate-pulse">
        Loading User Data...
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
      <UserForm<CreateUser>
        user={user}
        errors={errors}
        onChange={handleChange}
        showRole
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