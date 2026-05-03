import type { InputProps } from "../../types/input";
export const InputField = ({
  label,
  value,
  onChange,
  containerWidth = "w-full sm:w-[22rem] md:w-[26rem]",
  containerHeight = "min-h-[6.5rem] sm:min-h-[7rem]",
  width = "w-[280px]",
  height = "h-10",
  gap = "gap-2",
  error,
}: InputProps) => {
  return (
    <div className={`flex flex-col ${containerWidth} ${containerHeight} ${gap}`}>
      <p className="font-primary font-md">{label}</p>
      <input value={value} onChange={onChange}
        className={`${width} ${height} bg-[#D9D9D9] border rounded px-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && (
        <span className="text-sm text-red-500">
          {error}
        </span>
      )}

    </div>
  );
};