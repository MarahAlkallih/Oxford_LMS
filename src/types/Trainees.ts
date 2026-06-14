export interface Language {
  name: string;
}

export interface Account {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthDate: string | null;
  aboutMe: string | null;
  gender: string;
  language: Language;
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