import { baseApi } from "../../../api/baseApi";
interface ExamTypes{
    id?: number;
  name: string;
  description: string;
  createdAt?: Date,
  updatedAt?:Date

}
const GetTypesApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllTypes:builder.query<ExamTypes[],void>({
            query:()=>"/exam-types",
            providesTags:["Exam-types"]
        })
    })
})
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