import { baseApi } from "../../../api/baseApi";
interface QuestionTypes{
    id?: number;
  type: string;
  description: string;
  createdAt?: Date,
  updatedAt?:Date

}
const GetQuestTypesApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllQuestTypes:builder.query<QuestionTypes[],void>({
            query:()=>"/question-types",
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