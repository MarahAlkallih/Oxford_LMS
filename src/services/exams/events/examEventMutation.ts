import { baseApi } from "../../../api/baseApi";

export const ExamEventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createExamEvent: builder.mutation<any, any>({
      query: (data) => ({
        url: "/exam-events",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Exam-events"],
    }),
  })
})
export const {useCreateExamEventMutation}=ExamEventApi;


export const EditExamEventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

   editExamEvent: builder.mutation({
      query: ({data,id}) => ({
        url: `/exam-events/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["Exam-events"],
    }),
  })
})
export const {useEditExamEventMutation}=EditExamEventsApi;
const deleteExamEventApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        deleteExamEvent:builder.mutation({
        query:({id})=>({
            url:`/exam-events/${id}`,
           
            method:"DELETE"
        }),
          invalidatesTags: ["Exam-events"],
        })
    })
})
export const {useDeleteExamEventMutation}=deleteExamEventApi;