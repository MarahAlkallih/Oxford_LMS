import React from "react";
import CustomDropdown from "../Fields/DropDown";
import { useGetRequestStatusQuery } from "../../services/request-courses/requestStatus";

interface RequestStatusesProps {
  onSelect: (value: string) => void; 
  selectedValue?: string;       
}

export const RequestStatuses: React.FC<RequestStatusesProps> = ({ onSelect, selectedValue }) => {

  const { data: statuses, isLoading } = useGetRequestStatusQuery();

  return (
    <CustomDropdown
      placeholder={isLoading ? "Loading statuses..." : "Select status"}
      options={statuses?.map((status) => status.toString()) ?? []}
      onSelect={(value) => {
     
        onSelect(value);
      }}
    />
  );
};