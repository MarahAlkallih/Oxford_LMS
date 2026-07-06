export interface User {
    id:        number;
    createdAt: Date;
    updatedAt: Date;
    accountId: number;
    roles:     string[];
    account:   Account;
}

export interface Account {
    id:           number;
    createdAt:    Date;
    updatedAt:    Date;
    firstName:    string;
    lastName:     string;
    userName:     string;
    email:        string;
    phoneNumber:  string;
    languageId:   number;
    languageName: string;
    gender:       string;
    isActive:     boolean;
}

export interface TrainersResponse {
  data: Trainer[];
  meta: PaginationMeta;
}

export interface PaginationMeta {
  totalRecords: number;
  currentPage: number;
  limit: number;
  totalPages: number;
}
export interface CreateTrainer {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  gender: string;
  languageId: number;
  phoneNumber: string;
}

export interface Trainer {
  id: number;
  accountId: number;
  createdAt: string;
  updatedAt: string;
  account: TrainerAccount;
}

export interface TrainerAccount {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  languageId: number;
  languageName: string;
  isActive: boolean;

  // خليهم اختياريين لأنهم مو موجودين بالريسبونس الحالي
  phoneNumber?: string;
  gender?: string;
  password?: string;
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

// 1. مودل الحساب الداخلي المسؤول عن البيانات الشخصية
export interface AccountInfo {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  gender: "MALE" | "FEMALE" | string;
  isActive: boolean;
  languageId: number;
  languageName: string;
  createdAt: string;
  updatedAt: string;
}

// 2. المودل الأساسي لبيانات اليوزر (UserInfo)
export interface UserInfo {
  id: number;
  accountId: number;
  roles: string[];
  createdAt: string;
  updatedAt: string;
  account: AccountInfo; // 🌟 الكائن الجديد المضمن بالداخل
}

// 3. شكل الاستجابة الراجعة بالكامل من الهوك
export interface UserByIdResponse {
  data: UserInfo;
}
export interface UserFormProps<T> {
  user: T;
  errors: Partial<Record<keyof T, string>>;
  onChange: (key: keyof T, value: string | number) => void;
  showRole?: boolean;
}
export interface CreateUser {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    gender: string;
    languageId: number;
    phoneNumber: string;
    role: string;
}