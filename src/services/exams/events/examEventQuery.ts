import { baseApi } from "../../../api/baseApi"
import type { Event, EventResponse } from "../../../types/Event"


const GetEventsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getEvents: builder.query<EventResponse, void>({
            query: () => ({
                url: "/exam-events",
              
            }),
            providesTags: ["Exam-events"]
        }),

    })
})
const GetOneEventApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOneEvent: builder.query<Event, { id: number }>({
            query: ({ id }) => `/exam-events/${id}`,
            providesTags: ["Exam-events"]
        })
    })
})
export const { useGetOneEventQuery } = GetOneEventApi

export const { useGetEventsQuery } = GetEventsApi