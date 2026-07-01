import type { Exam } from "./Exam";

export interface Event{
    id: number,
    createdAt: string,
    updatedAt: string,
    examId: number,
    examInstanceId: number,
    startDate: string,
    endDate: string,
    exam:Exam
}
export interface PaginationMeta {
  totalRecords: number;
  currentPage: number;
  limit: number;
  totalPages: number;
}

export interface EventResponse {
  data: Event[];
  meta: PaginationMeta;
}