import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { Button } from "../../components/Buttons/SubmitBtn";
import { rules } from "../../utils/validationRules";
import type { Trainer } from "../../types/user";
import { useCreateTrainerMutation } from "../../services/trainer/createTrainer";
import { toast } from "react-toastify";
import { UserForm } from "../../components/User/UserForm";

export const TrainerPage = () => {
  const navigate = useNavigate();

  const initialUser = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    gender: "",
    languageId: 0,
    phoneNumber: "",
   
  };
  const [user, setUser] = useState(initialUser);
  const [createUser, { isLoading, error }] = useCreateTrainerMutation();
  const [errors, setErrors] = useState<
    Partial<Record<keyof Trainer, string>>
  >({});
  const validate = () => {
    const newErrors: Partial<Record<keyof Trainer, string>> = {};

    newErrors.firstName = rules.required(user.firstName);
    newErrors.lastName = rules.required(user.lastName);
    newErrors.userName = rules.required(user.userName);
    newErrors.phoneNumber = rules.required(user.phoneNumber);

    newErrors.email =
      rules.required(user.email) ||
      rules.email(user.email);

    newErrors.password =
      rules.required(user.password) ||
      rules.minLength(8)(user.password);

    if (!user.gender)
      newErrors.gender = "Gender is required";

    if (!user.languageId)
      newErrors.languageId = "Language is required";

    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(
        ([_, value]) => value
      )
    );

    setErrors(filteredErrors);

    return Object.keys(filteredErrors).length === 0;
  };
  const handleChange = (key: keyof Trainer, value: string | number) => {
    setUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleAdd = async () => {
    console.log(user)
    if (!validate()) return;

    try {
      const res = await createUser(user).unwrap();
      console.log("success:", res);
      toast.success("User Added successfully!")
      setUser(initialUser)
    } catch (err: any) {

      const errorMessage = Array.isArray(err?.data?.message)
        ? err.data.message.join(" , ")
        : err?.data?.message || "Something went wrong";

      toast.error(errorMessage);
      if (error) {
        toast.error("Retry Add user")
      }
      // toast.error(error?.message || "Retry Add user")
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
      <UserForm<Trainer>
        user={user}
        errors={errors}
        onChange={handleChange}
       
      />

      {/* Submit Button */}
      <div className="flex justify-center mt-12">
        <div className="w-48">
          <Button
            name={isLoading ? "Loading..." : "Add Trainer"}
            onClick={handleAdd}
          />
        </div>
      </div>

    </div>

  );
}
