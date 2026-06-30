import { baseApi } from "../../../api/baseApi";
import type { Exam,ExamsResponse ,GetExamsParams} from "../../../types/Exam";
const GetExamsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getExams: builder.query<ExamsResponse, GetExamsParams>({
      query: ({
        page,
        limit,
        languageId,
        categoryId,
        examTypeId,
        status,
      }) => ({
        url: "/exams",
        params: {
          page,
          limit,
          languageId,
          categoryId,
          examTypeId,
          status,
        },
      }),

      providesTags: ["Exam"],
    }),
  }),
});
const GetOneExamApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getOneExam:builder.query<Exam,{id:number}>({
            query:({id})=>`/exams/${id}`,
            providesTags:["Exam"]
        })
    })
})
export const {useGetOneExamQuery}=GetOneExamApi
export const { useGetExamsQuery } = GetExamsApi;
