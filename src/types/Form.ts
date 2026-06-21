export interface Form{
    id:number,
    title:string,
    subTitle:string,
    description:string,
    image:string,
    createdAt:string,
    updatedAt:string,
    showConfiguration:boolean,
    showCondition:boolean
}
export interface PaginationMeta {
  totalRecords: number;
  currentPage: number;
  limit: number;
  totalPages: number;
}

export interface FormsResponse {
  data: Form[];
  meta: PaginationMeta;
}