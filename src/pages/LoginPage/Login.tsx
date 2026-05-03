import { type JSX } from "react";
import { Photo } from "../../components/LoginComponents/Photo";
import { InputField } from "../../components/Fields/InputField";
import { RightCard } from "../../components/LoginComponents/LeftCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Buttons/SubmitBtn";
import logo from "../../assets/logo.png"
import { useLoginMutation } from "../../features/admin/auth/authService"
import { useAppDispatch } from "../../hooks/redux"
import { setTokens } from "../../features/admin/auth/authSlice"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const Login = (): JSX.Element => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
const [login,{isLoading}] = useLoginMutation()
const dispatch = useAppDispatch();
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
    const res = await login({ email, password }).unwrap()

    console.log(res)
    dispatch(setTokens(res))
    toast.success("Login successful!")
    navigate("/dashboard")

  } catch (err: any) {
    const errorMsg = err?.data?.message || err?.message || "Login failed. Please try again."
    toast.error(errorMsg)
  }
}
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen w-full flex flex-col md:flex-row">
      <section className="relative w-full md:w-1/2 min-h-[40vh] md:min-h-screen flex items-center justify-center p-6 md:p-10">
        <div className=" z-20 w-full flex items-center justify-center px-0 sm:px-2 md:px-4">
          <RightCard>
            <img src={logo} alt="Logo" className="w-75 h-12.5 mb-4" />
            <InputField
              label="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) {
                  setErrors((prev) => ({ ...prev, email: undefined }))
                }
              }}
              error={errors.email}
            />
            <InputField
              label="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password) {
                  setErrors((prev) => ({ ...prev, password: undefined }))
                }
              }}
              error={errors.password}
            />
            <Button name={isLoading ? "Logging in..." : "Login"} onClick={handleLogin} />
          </RightCard>
        </div>
      </section>

      <section className="relative w-full md:w-1/2 min-h-[40vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hidden md:flex justify-end pointer-events-none">
          <Photo />
        </div>
      </section>
      
    </div>
    </>
  );
};

export default Login;