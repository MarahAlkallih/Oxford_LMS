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
  placeholder
}: InputProps & { placeholder?: string }) => {
  return (
    // 2. حذفنا الـ containerHeight تماماً ليأخذ الارتفاع الطبيعي للمحتوى فقط
    <div className={`flex flex-col ${containerWidth} ${gap} m-1`}>
      
      {label && (
        <p className="font-primary text-sm font-semibold text-gray-700 whitespace-nowrap">
          {label}
        </p>
      )}
      
      <input 
        value={value} 
        onChange={onChange} 
        type={type}
        placeholder={placeholder}
        className={`${width} ${height} bg-[#D9D9D9] border rounded-xl px-3 focus:outline-none transition-all ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      
      {error && (
        <span className="text-xs text-red-500 mt-0.5">
          {error}
        </span>
      )}

    </div>
  );
};