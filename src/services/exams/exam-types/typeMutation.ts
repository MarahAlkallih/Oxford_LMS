import { baseApi } from "../../../api/baseApi";

export const ExamTypesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createExamType: builder.mutation<any, any>({
      query: (data) => ({
        url: "/exam-types",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Exam-types"],
    }),
  })
})
export const {useCreateExamTypeMutation}=ExamTypesApi;


export const EditExamTypesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

   editExamType: builder.mutation({
      query: ({data,id}) => ({
        url: `/exam-types/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["Exam-types"],
    }),
  })
})
export const {useEditExamTypeMutation}=EditExamTypesApi;
const deleteExamTypeApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        deleteExamType:builder.mutation({
        query:({id})=>({
            url:`/exam-types/${id}`,
           
            method:"DELETE"
        }),
          invalidatesTags: ["Exam-types"],
        })
    })
})
export const {useDeleteExamTypeMutation}=deleteExamTypeApi;