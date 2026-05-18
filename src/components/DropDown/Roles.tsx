import CustomDropDown from "../Fields/DropDown";
import { useGetRolesQuery } from "../../services/users/GetRoles";
import { useState } from "react";

export const RoleDropDown = () => {
  // cast the query result to any to avoid strict typing issues with the returned shape
  const { data: roles, isLoading } = useGetRolesQuery({}) as any;

  const [role, setRole] = useState<string>("");

  function handleChange(_key: keyof any, value: string) {
    setRole(value);
    console.log(value);
  }

  return (
    <div>
      <CustomDropDown
        onSelect={(value) => handleChange("role", value)}
        options={
          isLoading
            ? []
            : roles?.data?.map((role: any) =>
                typeof role === "string"
                  ? role
                  : role?.name ?? String(role)
              ) ?? []
        }
        placeholder="Select a role"
      />
    </div>
  );
};