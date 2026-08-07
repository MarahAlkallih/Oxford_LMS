import { baseApi } from "../../../api/baseApi"
import type { ExamSession,Datum } from "../../../types/Sessions/SessionExam"
import type { OneExamSession } from "../../../types/Sessions/OneExamSession"

const GetSessionEventsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    
getSessionEvents: builder.query<ExamSession, any>({
  query: (sessionId) => ({
    url: "/session-exam-events",
    method: "GET",
    params: sessionId,
  }),
  providesTags: ["SessionExams"],
})
    })
})
const GetOneSessionEventApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOneSessionEvent: builder.query<OneExamSession, { id: number }>({
            query: ({ id }) => `/session-exam-events/${id}`,
            providesTags: ["SessionExams"]
        })
    })
})
export const { useGetOneSessionEventQuery } = GetOneSessionEventApi

export const { useGetSessionEventsQuery } = GetSessionEventsApi