import { useNavigate } from "react-router-dom"
import { useState } from "react";
import {Button} from "../../components/Buttons/SubmitBtn";
import {InputField} from "../../components/Fields/InputField"
import { RoleDropDown } from "../../components/DropDown/Roles";
import { useGetLanguagesQuery } from "../../services/languages/languageService";
import  CustomDropDown from "../../components/Fields/DropDown"
import type { User } from "../../types/user";
import { useCreateUserMutation } from "../../services/users/User";
import { toast } from "react-toastify";

export const AddUserPage=()=>{
    const navigate=useNavigate();
    const {data:languages}=useGetLanguagesQuery();
    const gender=["MALE","FEMALE"];
    const [user, setUser] = useState<User>({
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  gender: "",
  languageId: 0,
  phoneNumber: "",
  role: "HR",
});
const [createUser, { isLoading, error }] = useCreateUserMutation();
const [errors, setErrors] = useState<
  Partial<Record<keyof User, string>>
>({});
const validate = () => {
  const newErrors: Partial<Record<keyof User, string>> = {};

  if (!user.firstName.trim()) {
    newErrors.firstName = "First name is required";
  }

  if (!user.lastName.trim()) {
    newErrors.lastName = "Last name is required";
  }

  if (!user.userName.trim()) {
    newErrors.userName = "User name is required";
  }

  if (!user.email.trim()) {
    newErrors.email = "Email is required";
  }

  if (!user.password.trim()) {
    newErrors.password = "Password is required";
  }
  if (user.password.trim().length < 8) {
    newErrors.password = "Password must be at least 8 characters long";
  }
  if (!user.phoneNumber.trim()) {
    newErrors.phoneNumber = "Phone number is required";
  }

  if (!user.gender) {
    newErrors.gender = "Gender is required";
  }

  if (!user.languageId) {
    newErrors.languageId = "Language is required";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};
const handleChange = (key: keyof User, value: string | number) => {
  setUser((prev) => ({
    ...prev,
    [key]: value,
  }));
};
const handleAdd = async () => {

  if (!validate()) return;

  try {
    const res = await createUser(user).unwrap();
    console.log("success:", res);
    toast.success("User Added successfully!")
  } catch (err: any) {

  const errorMessage = Array.isArray(err?.data?.message)
    ? err.data.message.join(" , ")
    : err?.data?.message || "Something went wrong";

  toast.error(errorMessage);
}
};
    return (
  <div className="w-full min-h-screen p-8">

    {/* Back Button */}
    <div className="flex justify-end mb-6">
      <div className="w-32">
        <Button
          name="Back"
          onClick={() => navigate("/users/display")}
        />
      </div>
    </div>

    {/* Form Container */}
  {/* Main Layout */}
<div className="mx-auto max-w-5xl">

  {/* First Row */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

    <InputField
      label="First Name"
      value={user.firstName}
      containerWidth="w-full"
      width="w-full"
      error={errors.firstName}
      onChange={(e) =>
        handleChange("firstName", e.target.value)
      }
    />

    <InputField
      label="Last Name"
      value={user.lastName}
      containerWidth="w-full"
      width="w-full"
      error={errors.lastName}
      onChange={(e) =>
        handleChange("lastName", e.target.value)
      }
    />

    <InputField
      label="User Name"
      value={user.userName}
      containerWidth="w-full"
      width="w-full"
      error={errors.userName}
      onChange={(e) =>
        handleChange("userName", e.target.value)
      }
    />
  </div>

  {/* Second Row */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

    <InputField
      label="Email"
      value={user.email}
      containerWidth="w-full"
      width="w-full"
      error={errors.email}
      onChange={(e) =>
        handleChange("email", e.target.value)
      }
    />

    <InputField
      label="Password"
      value={user.password}
      containerWidth="w-full"
      width="w-full"
      error={errors.password}
      onChange={(e) =>
        handleChange("password", e.target.value)
      }
    />

    <InputField
      label="Phone Number"
      value={user.phoneNumber}
      containerWidth="w-full"
      width="w-full"
      error={errors.phoneNumber}
      onChange={(e) =>
        handleChange("phoneNumber", e.target.value)
      }
    />
  </div>

  {/* Third Row */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        Role
      </label>

      <RoleDropDown />
    </div>

    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        Gender
      </label>

      <CustomDropDown
        options={gender}
        placeholder="Select Gender"
        onSelect={(value) =>
          handleChange("gender", value)
        }
      />
    </div>

    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        Language
      </label>

      <CustomDropDown
        options={languages?.map((l) => l.name) || []}
        placeholder="Select Language"
        onSelect={(value) => {
          const selected = languages?.find(
            (l) => l.name === value
          );

          if (selected?.id) {
            handleChange("languageId", selected.id);
          }
        }}
      />
    </div>

  </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-12">
        <div className="w-48">
          <Button
            name={isLoading ? "Loading..." : "Add"}
            onClick={handleAdd}
          />
        </div>
      </div>

    </div>
  </div>
);}
 