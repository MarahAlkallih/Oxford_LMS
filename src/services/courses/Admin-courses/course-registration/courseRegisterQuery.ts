import { baseApi } from "../../../../api/baseApi";
import type { Accepted, AllRegistration, OneRegisteration, Pendining } from "../../../../types/Course/Registration/Rigistrations";

// {statuses}
const GetRegistrationStatusesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getStatuses: builder.query<string[], void>({
      query: () => "course-registration/admin/RegistrationStatus",

      providesTags:["Registrations"]
    }),
    })
})
export const {useGetStatusesQuery}=GetRegistrationStatusesApi;
/////////////////////////////////////////////////
// {registration}
const GetAllRegistrationsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getAllRegistrations: builder.query<AllRegistration[], { courseId: number }>({
      query: ({ courseId }) => `/course-registration/course/${courseId}/all`,
         providesTags:["Registrations"]
    }),
    })
})
export const {useGetAllRegistrationsQuery}=GetAllRegistrationsApi;
/////////////////////////////////////////////////
// {pendining}
const GetPendinigRegistrationsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getPendingRegistrations: builder.query<Pendining[], { courseId: number }>({
      query: ({ courseId }) => `/course-registration/course/${courseId}/pending`,
         providesTags:["Registrations"]
    }),
    })
})
export const {useGetPendingRegistrationsQuery}=GetPendinigRegistrationsApi;
/////////////////////////////////////////////////
// {accepted}
const GetAcceptedRegistrationsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getAcceptedRegistrations: builder.query<Accepted[], { courseId: number }>({
      query: ({ courseId }) => `/course-registration/course/${courseId}/accepted`,
         providesTags:["Registrations"]
    }),
    })
})
export const {useGetAcceptedRegistrationsQuery}=GetAcceptedRegistrationsApi;
// {one}
const GetOneRegistrationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getOneRegistration: builder.query<OneRegisteration, { id: number }>({
      query: ({ id }) => `/course-registration/getRegistrationByIdWithInvoice/${id}`,
         providesTags:["Registrations"]
    }),
    })
})
export const {useGetOneRegistrationQuery}=GetOneRegistrationApi;