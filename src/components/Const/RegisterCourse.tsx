import React from "react";
import CustomDropdown from "../Fields/DropDown";
import { useGetStatusesQuery } from "../../services/courses/Admin-courses/course-registration/courseRegisterQuery";
interface RegistrationStatusesProps {
  onSelect: (value: string) => void; 
  selectedValue?: string;       
}

export const RegistrationStatuses: React.FC<RegistrationStatusesProps> = ({ onSelect, selectedValue }) => {
const {data:regs,isLoading}=useGetStatusesQuery()
 
  return (
    <CustomDropdown
      placeholder={isLoading ? "Loading statuses..." : "Select status"}
      options={regs?.map((status) => status.toString()) ?? []}
      onSelect={(value) => {
     
        onSelect(value);
      }}
    />
  );
};