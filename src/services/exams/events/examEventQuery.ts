import { baseApi } from "../../../api/baseApi"
import type { Event, EventResponse } from "../../../types/Event"


const GetEventsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    
getExamEvents: builder.query<EventResponse, any>({
  query: (filters) => ({
    url: "/exam-events",
    method: "GET",
    params: filters,
  }),
  providesTags: ["Exam-events"],
})
    })
})
/////////////////////////////////////
const GetEventsWithoutFilterApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    
getExamEventsWithoutFilter: builder.query<EventResponse, any>({
  query: () => ({
    url: "/exam-events",
    method: "GET",
   
  }),
  providesTags: ["Exam-events"],
})
    })
})
/////////////////////////
const GetOneEventApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOneEvent: builder.query<Event, { id: number }>({
            query: ({ id }) => `/exam-events/${id}`,
            providesTags: ["Exam-events"]
        })
    })
})
export const { useGetOneEventQuery } = GetOneEventApi
export const {useGetExamEventsWithoutFilterQuery}=GetEventsWithoutFilterApi
export const { useGetExamEventsQuery } = GetEventsApi