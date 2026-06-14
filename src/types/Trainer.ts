import type { Language } from "./Trainees";

export interface TrainerAccount {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  birthDate?:Date | null;
  aboutMe?:string | null;
  language?:Language
}

export interface Trainer {
  id: number;
  accountId: number;
  createdAt: string;
  updatedAt: string;
  account: TrainerAccount;
}

export interface TrainerResponse {
  data: Trainer[];
  meta: {
    currentPage: number;
    limit: number;
    totalPages: number;
    totalRecords: number;
  };
}
export interface TrainerInfo{
  account:TrainerAccount;
   id: number,
   accountId: number,
    createdAt: Date,
    updatedAt: Date,

}