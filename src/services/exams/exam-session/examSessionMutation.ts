import { baseApi } from "../../../api/baseApi";

export const SessionExamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createSessionExam: builder.mutation<any, any>({
      query: (data) => ({
        url: "/session-exam-events",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["SessionExams"],
    }),
  })
})
export const {useCreateSessionExamMutation}=SessionExamApi;


export const EditSessionExamsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

   editSessionExam: builder.mutation({
      query: ({data,id}) => ({
        url: `/session-exam-events/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["SessionExams"],
    }),
  })
})
export const {useEditSessionExamMutation}=EditSessionExamsApi;
const deleteSessionExamApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        deleteSessionExam:builder.mutation({
        query:({id})=>({
            url:`/session-exam-events/${id}`,
           
            method:"DELETE"
        }),
          invalidatesTags: ["SessionExams"],
        })
    })
})
export const {useDeleteSessionExamMutation}=deleteSessionExamApi;