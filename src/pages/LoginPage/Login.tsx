import { type JSX } from "react";
import { Photo } from "../../components/LoginComponents/Photo";
import { RightCard } from "../../components/LoginComponents/RightCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../components/LoginComponents/LoginForm"
import { useLoginMutation } from "../../services/auth/authService"
import { ToastContainer, toast } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"
import { useLoginTrainerMutation } from "../../services/trainer/login";

const Login = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isTrainer, setIsTrainer] =useState(false);
  const [login, { isLoading }] = useLoginMutation()
  const [loginTrainer,{isLoading:isLoadingTrainer}]=useLoginTrainerMutation();
  const navigate = useNavigate();
const handleLogin = async () => {
  const newErrors: { email?: string; password?: string } = {};

  if (!email.trim()) {
    newErrors.email = "Email is required";
  }

  if (!password.trim()) {
    newErrors.password = "Password is required";
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    return;
  }

  try {
    if (isTrainer) {
      const res = await loginTrainer({ email, password }).unwrap();

      console.log(res);
      toast.success("Login successful!");

      navigate("/courses");
      return;
    }

    const res = await login({ email, password }).unwrap();

    console.log(res);

    toast.success("Login successful!");

    const role = res.roles?.[0]; // أو حسب شكل الريسبونس

    switch (role) {
      case "SUPER_ADMIN":
      case "HR":
        navigate("/home");
        break;

      case "ATTENDANCE":
        navigate("/attendance");
        break;

      default:
        navigate("/");
        break;
    }
  } catch (err: any) {
    const errorMsg =
      err?.data?.message ||
      err?.message ||
      "Login failed. Please try again.";

    toast.error(errorMsg);
  }
};
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen w-full flex flex-col md:flex-row">
        <section className="relative w-full md:w-1/2 min-h-[40vh] md:min-h-screen flex items-center justify-center p-6 md:p-10">
          <div className=" z-20 w-full flex items-center justify-center px-0 sm:px-2 md:px-4">
            <RightCard>

              <LoginForm
                email={email}
                password={password}
                errors={errors}
                isLoading={isLoading}
                isTrainer={isTrainer}
                onTrainerChange={setIsTrainer}
                onEmailChange={(value) => {
                  setEmail(value);
                  if (errors.email) {
                    setErrors((prev) => ({
                      ...prev,
                      email: undefined,
                    }));
                  }
                }}
                onPasswordChange={(value) => {
                  setPassword(value);
                  if (errors.password) {
                    setErrors((prev) => ({
                      ...prev,
                      password: undefined,
                    }));
                  }
                }}
                onSubmit={handleLogin}
              />

            </RightCard>
          </div>
        </section>

        <section className="relative w-[50vw] h-full md:w-1/2 min-h-[40vh] md:min-h-screen 
      flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 hidden md:flex justify-end pointer-events-none">
            <Photo />
          </div>
        </section>


      </div>
    </>
  );
};

export default Login;