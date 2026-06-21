export interface Instance{
createdAt: string,
description: string,
endFormId: number,
id: number,
name: string,
startFormId: number,
updatedAt: string,
numberOfQuestions:number
}
export interface PaginationMeta {
  totalRecords: number;
  currentPage: number;
  limit: number;
  totalPages: number;
}

export interface InstanceResponse {
  data: Instance[];
  meta: PaginationMeta;
}