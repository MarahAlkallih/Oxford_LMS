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
  isTrainer: boolean;
  onTrainerChange: (value: boolean) => void;

  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
}

export const LoginForm = ({
  email,
  password,
  errors,
  isLoading,
  isTrainer,
  onTrainerChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) => {
  return (
    <>
      <div className="flex-col   " >
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
        <div className="flex items-center gap-2 mb-4">
          <input
            id="trainer"
            type="checkbox"

            checked={isTrainer}
            onChange={(e) =>
              onTrainerChange(e.target.checked)
            }
            className="w-4 h-4 cursor-pointer"
          />

          <label
            htmlFor="trainer"
            className="text-sm cursor-pointer"
          >
            Login as Trainer
          </label>
        </div>
        <Button
          name={isLoading ? "Logging in..." : "Login"}
          onClick={onSubmit}
        />
      </div>

    </>
  );
};