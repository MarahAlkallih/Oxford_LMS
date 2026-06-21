import { baseApi } from "../../../api/baseApi";
interface QuestionTypes{
    id?: number;
  type: string;
  description: string;
  createdAt?: Date,
  updatedAt?:Date

}
export interface PaginationMeta {
  totalRecords: number;
  currentPage: number;
  limit: number;
  totalPages: number;
}

export interface QuestionTypesResponse {
  data: QuestionTypes[];
  meta: PaginationMeta;
}
const GetQuestTypesApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllQuestTypes:builder.query<QuestionTypesResponse,{page:number,limit:number}>({
            query:({page,limit})=>({
                url:"/question-types",
                params:{
                    page,
                    limit
                }
            }),
            providesTags:["Questions-types"]
        })
    })
})
const GetOneQuestTypeApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getOneQuestType:builder.query<QuestionTypes,{id:number}>({
            query:({id})=>`/question-types/${id}`,
            providesTags:["Questions-types"]
        })
    })
})
export const {useGetOneQuestTypeQuery}=GetOneQuestTypeApi

export const {useGetAllQuestTypesQuery}=GetQuestTypesApi