import { baseApi } from "../../../api/baseApi";
interface ExamTypes{
    id?: number;
  name: string;
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

export interface ExamTypesResponse {
  data: ExamTypes[];
  meta: PaginationMeta;
}
const GetTypesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTypes: builder.query<
      ExamTypesResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: "/exam-types",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["Exam-types"],
    }),
  }),
});
const GetOneTypeApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getOneType:builder.query<ExamTypes,{id:number}>({
            query:({id})=>`/exam-types/${id}`,
            providesTags:["Exam-types"]
        })
    })
})
export const {useGetOneTypeQuery}=GetOneTypeApi

export const {useGetAllTypesQuery}=GetTypesApi