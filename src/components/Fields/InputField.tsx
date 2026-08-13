import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import type { InputProps } from "../../types/input";

export const InputField = ({
  label,
  value,
  onChange,
  containerWidth = "w-full",
  width = "w-full",
  height = "h-10",
  gap = "gap-1.5",
  error,
  type,
  placeholder,
  showPasswordToggle = false,
}: InputProps & { placeholder?: string }) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" && showPasswordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className={`flex flex-col ${containerWidth} ${gap} m-1`}>
      {label && (
        <p className="font-primary text-sm font-semibold text-gray-700 whitespace-nowrap">
          {label}
        </p>
      )}

      <div className="relative w-full">
        <input
          value={value}
          onChange={onChange}
          type={inputType}
          placeholder={placeholder}
          className={`${width} ${height} bg-[#D9D9D9] border rounded-xl px-3 ${
            showPasswordToggle && type === "password" ? "pr-10" : ""
          } focus:outline-none transition-all ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />

        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <VisibilityOffIcon fontSize="small" />
            ) : (
              <VisibilityIcon fontSize="small" />
            )}
          </button>
        )}
      </div>

      {error && (
        <span className="text-xs text-red-500 mt-0.5">
          {error}
        </span>
      )}
    </div>
  );
};