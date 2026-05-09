import { type JSX } from "react";
import { Photo } from "../../components/LoginComponents/Photo";
import { InputField } from "../../components/Fields/InputField";
import { RightCard } from "../../components/LoginComponents/RightCard";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Buttons/SubmitBtn";
import logo from "../../assets/logo.png"
import { useLoginMutation } from "../../features/admin/auth/authService"
import { toast } from "react-toastify"
import { useForm } from "../../hooks/useForm"
import { rules } from "../../utils/validationRules"
import { AppToastContainer } from "../../components/global/Toast"
import { persistAuthSession } from "../../features/admin/auth/authStorage"
const Login = (): JSX.Element => {
  const { values, errors, handleChange, validate } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validations: {
      email: [rules.required, rules.email],
      password: [rules.required, rules.minLength(8)],
    },
  })
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate();
 const handleLogin = async () => {
  if (!validate()) return;

  try {
    const res = await login(values).unwrap();

    persistAuthSession(res); 

    toast.success("Login successful!");
    navigate("/dashboard");

  } catch (err: any) {
    const msg =
      err?.data?.message ||
      err?.message ||
      "Login failed";

    toast.error(msg);
  }
};
  return (
    <>
      <AppToastContainer />
      <div className="min-h-screen w-full flex flex-col md:flex-row">
        <section className="relative w-full md:w-1/2 min-h-[40vh]
         md:min-h-screen flex items-center justify-center p-6 md:p-10">
          <div className=" z-20 w-full flex
           items-center justify-center px-0 sm:px-2 md:px-4">
            <RightCard>
              <img src={logo} alt="Logo" className="w-75 h-12.5 mb-4" />
              <InputField
                label="Email"
                value={values.email}
                onChange={(e) => handleChange("email", e.target.value)}
                error={errors.email}
              />

              <InputField
                label="Password"
                value={values.password}
                onChange={(e) => handleChange("password", e.target.value)}
                error={errors.password}
              />

              <Button name={isLoading ? "Logging in..." : "Login"} onClick={handleLogin} />
            </RightCard>
          </div>
        </section>

        <section className="relative w-full 
        md:w-1/2 min-h-[40vh] md:min-h-screen flex items-center 
        justify-center overflow-hidden">
          <div className="absolute inset-0
           hidden md:flex justify-end pointer-events-none">
            <Photo />
          </div>
        </section>

      </div>
    </>
  );
};

export default Login;