export interface User {
    firstName:   string;
    lastName:    string;
    userName:    string;
    email:       string;
    password:    string;
    gender:      string;
    languageId:  number;
    phoneNumber: string;
    role:        string;
}
export interface Trainer {
    firstName:   string;
    lastName:    string;
    userName:    string;
    email:       string;
    password:    string;
    gender:      string;
    languageId:  number;
    phoneNumber: string;
   
}
export interface LoginUser {
 
    email:       string;
    password:    string;
  
}
export interface Admin {
  id: number;
  accountId: number;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserInfo {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  languageId: number;
  birthDate: string | null;
  aboutMe: string | null;
  image: string | null;
  roles?:string[],
  isActive: boolean;
  onNotification: boolean;

  createdAt: string;
  updatedAt: string;

  admin?: Admin;
}
export interface UserFormProps<T> {
  user: T;
  errors: Partial<Record<keyof T, string>>;
  onChange: (key: keyof T, value: string | number) => void;
  showRole?: boolean;
}