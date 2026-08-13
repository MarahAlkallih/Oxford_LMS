import { InputField } from "../Fields/InputField";
import CustomDropDown from "../Fields/DropDown";
import { RoleDropDown } from "../DropDown/Roles";
import { useGetLanguagesQuery } from "../../services/languages/languageService";
import type {  UserFormProps, } from "../../types/user";



export const UserForm = <T extends {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: string;
  languageId: number;
  role?: string;
}>({
  user,
  errors,
  onChange,
  showRole = false,
}: UserFormProps<T>) => {
  const { data: languages } = useGetLanguagesQuery();

  const genders = ["MALE", "FEMALE"];

  return (
    <>
      {/* First Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <InputField
          label="First Name"
          value={user.firstName}
          containerWidth="w-full"
          width="w-full"
          error={errors.firstName}
          onChange={(e) => onChange("firstName", e.target.value)}
        />

        <InputField
          label="Last Name"
          value={user.lastName}
          containerWidth="w-full"
          width="w-full"
          error={errors.lastName}
          onChange={(e) => onChange("lastName", e.target.value)}
        />

        <InputField
          label="User Name"
          value={user.userName}
          containerWidth="w-full"
          width="w-full"
          error={errors.userName}
          onChange={(e) => onChange("userName", e.target.value)}
        />
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* <InputField
          label="Email"
          value={user.email}
          containerWidth="w-full"
          width="w-full"
          error={errors.email}
          onChange={(e) => onChange("email", e.target.value)}
        />

        <InputField
          label="Password"
          value={user.password}
          containerWidth="w-full"
          width="w-full"
          error={errors.password}
          onChange={(e) => onChange("password", e.target.value)}
        /> */}

        <InputField
          label="Phone Number"
          value={user.phoneNumber}
          containerWidth="w-full"
          width="w-full"
          error={errors.phoneNumber}
          onChange={(e) => onChange("phoneNumber", e.target.value)}
        />
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {showRole && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Role
            </label>

            <RoleDropDown
              onSelect={(value) => onChange("role", value)}
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Gender
          </label>

          <CustomDropDown
            options={genders}
            placeholder="Select Gender"
            onSelect={(value) => onChange("gender", value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Language
          </label>

          <CustomDropDown
            options={languages?.map((l) => l.name) || []}
            placeholder="Select Language"
            onSelect={(value) => {
              const selected = languages?.find(
                (l) => l.name === value
              );

              if (selected?.id) {
                onChange("languageId", selected.id);
              }
            }}
          />
        </div>
      </div>
    </>
  );
};