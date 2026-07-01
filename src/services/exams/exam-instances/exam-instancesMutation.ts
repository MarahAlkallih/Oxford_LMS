import { baseApi } from "../../../api/baseApi";

export const ExamInstancesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createExamInstance: builder.mutation<any, any>({
      query: (data) => ({
        url: "/exam-instances",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Exam-instances"],
    }),
  })
})
export const {useCreateExamInstanceMutation}=ExamInstancesApi;


export const EditExamInstancesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

   editExamInstance: builder.mutation({
      query: ({data,id}) => ({
        url: `/exam-instances/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["Exam-instances"],
    }),
  })
})
export const {useEditExamInstanceMutation}=EditExamInstancesApi;
const deleteExamInstanceApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        deleteExamInstance:builder.mutation({
        query:({id})=>({
            url:`/exam-instances/${id}`,
           
            method:"DELETE"
        }),
          invalidatesTags: ["Exam-instances"],
        })
    })
})
export const {useDeleteExamInstanceMutation}=deleteExamInstanceApi;