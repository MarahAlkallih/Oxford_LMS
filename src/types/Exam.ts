export interface File{
     id: number;
    examId: number;
    createdAt: string,
    updatedAt: string,
    path: string,
   
}

export interface Exam{
            id: number,
            createdAt: string,
            updatedAt: string,
            code: string,
            ownerId: number,
            title: string,
            subTitle: string | null,
            image:string | null,
            gradePercentage: number,
            languageId: number,
            status: string,
            categoryId: number,
            examTypeId: number,
            examTime: number,
            showCorrection: boolean,
            files:File[]
}
export interface GetExamsParams {
  page?: number;
  limit?: number;

  languageId?: number;
  categoryId?: number;
  examTypeId?: number;
  status?: string;
}

export interface PaginationMeta {
  totalRecords: number;
  currentPage: number;
  limit: number;
  totalPages: number;
}

export interface ExamsResponse {
  data: Exam[];
  meta: PaginationMeta;
}