import React from "react";
import CustomDropdown from "../Fields/DropDown";

interface PriorityProps {
  onSelect: (value: string) => void;
  selectedValue?: string;
}

export const Priority: React.FC<PriorityProps> = ({
  onSelect,
  
}) => {
  const priorityOptions = ["HIGH", "MEDIUM", "LOW"];

  return (
    <CustomDropdown
      placeholder="Select Priority"
      options={priorityOptions}
     
      onSelect={(value) => {
        onSelect(value);
      }}
    />
  );
};