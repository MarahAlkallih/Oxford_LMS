import { useEffect, useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface CustomDropdownProps {
  options: string[];
  placeholder?: string;
  onSelect?: (value: string) => void;
}

const CustomDropdown = ({
  options,
  placeholder = "Select an option",
  onSelect,
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);

    if (onSelect) {
      onSelect(value);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white border  rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer  transition-all duration-300"
      >
        <span className={`text-sm ${selected ? "text-black" : "text-zinc-400"}`}>
          {selected || placeholder}
        </span>
        <KeyboardArrowDownIcon
          className={`text-[var(--main-color)] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>
      <div
       className={`absolute top-full left-0 w-full mt-2 bg-white border rounded-xl overflow-hidden shadow-2xl z-50 transition-all duration-300 ${
  isOpen ? "block translate-y-0" : "hidden -translate-y-2"
}`}
      >
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleSelect(option)}
            className="px-4 py-3 text-black cursor-pointer hover:bg-grey-200 transition-all duration-200 border-b  last:border-none"
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomDropdown;