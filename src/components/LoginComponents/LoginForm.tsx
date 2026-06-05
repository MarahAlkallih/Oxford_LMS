import logo from "../../assets/logo.png";
import { InputField } from "../Fields/InputField";
import { Button } from "../Buttons/SubmitBtn";

interface LoginFormProps {
  email: string;
  password: string;
  errors: {
    email?: string;
    password?: string;
  };
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
}

export const LoginForm = ({
  email,
  password,
  errors,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) => {
  return (
    <>
      <img
        src={logo}
        alt="Logo"
        className="w-75 h-auto mb-4"
      />

      <InputField
        label="Email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        error={errors.email}
      />

      <InputField
        label="Password"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        error={errors.password}
      />

      <Button
        name={isLoading ? "Logging in..." : "Login"}
        onClick={onSubmit}
      />
    </>
  );
};