export interface Language {
  id?:number
  name: string;
}

export interface Account {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  birthDate: string | null;
  aboutMe: string | null;
  phoneNumber: string;
  languageId: number;
  languageName: string;
  gender: string;
  isActive: boolean;
}

export interface TraineeDetails {
  id: number;
  createdAt: string;
  updatedAt: string;
  accountId: number;
  googleId: string | null;
  url: string | null;
  account: Account;
}
export interface Trainee {
  id: number;
  accountId: number;
  googleId: string | null;
  url: string | null;
  createdAt: string;
  updatedAt: string;
  account: Account;
}
export interface PaginationMeta {
  totalRecords: number;
  currentPage: number;
  limit: number;
  totalPages: number;
}

export interface TraineesResponse {
  data: Trainee[];
  meta: PaginationMeta;
}