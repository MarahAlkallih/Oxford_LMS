import CustomDropDown from "../Fields/DropDown";
import { useGetRolesQuery } from "../../services/users/GetRoles";

interface RoleDropDownProps {
  onSelect: (role: string) => void;
}

export const RoleDropDown = ({ onSelect }: RoleDropDownProps) => {
  const { data: roles, isLoading } = useGetRolesQuery();

  return (
   <CustomDropDown
  onSelect={onSelect}
  options={roles ?? []}
  placeholder="Select a role"
/>
  );
};