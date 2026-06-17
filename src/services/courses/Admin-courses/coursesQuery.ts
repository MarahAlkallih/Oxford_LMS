import { baseApi } from "../../../api/baseApi";
import type { Course } from "../../../types/Course";
// {statuses}
const GetCourseStatusesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getStatuses: builder.query<string[], void>({
      query: () => "/course/statuses",

      providesTags: ["Courses-statuses"],
    }),
    })
})
export const {useGetStatusesQuery}=GetCourseStatusesApi;
/////////////////////////////////////////////////////////////////////////////////////////
//{Active uncomping}
const GetActiveUncompingCourseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getActiveUncompingCourse: builder.query<Course[], void>({
      query: () => "/course/allActive",

      providesTags: ["Courses"],
    }),
    })
})
export const {useGetActiveUncompingCourseQuery}=GetActiveUncompingCourseApi;
/////////////////////////////////////////////////////////////////////////////////////////
//{online}
const GetOnlineCourseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getOnlineCourse: builder.query<Course[], void>({
      query: () => "/course/online",

      providesTags: ["Courses"],
    }),
    })
})
export const {useGetOnlineCourseQuery}=GetOnlineCourseApi;
/////////////////////////////////////////////////////////////////////////////////////////
//{unActive}
const GetUnActiveCourseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getUnActiveCourse: builder.query<Course[], void>({
      query: () => "/course/allUnActive",

      providesTags: ["Courses"],
    }),
    })
})
export const {useGetUnActiveCourseQuery}=GetUnActiveCourseApi;
/////////////////////////////////////////////////////////////////////////////////////////
//{onSite}
const GetOnSiteCourseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getOnSiteCourse: builder.query<Course[], void>({
      query: () => "/course/onSite",

      providesTags: ["Courses"],
    }),
    })
})
export const {useGetOnSiteCourseQuery}=GetOnSiteCourseApi;
/////////////////////////////////////////////////////////////////////////////////////////
//{cat id}
const GetByCatIdCourseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getByCatIdCourse: builder.query<Course[], {id:number}>({
      query: ({id}) => `/course/ByCategory/${id}`,

      providesTags: ["Courses"],
    }),
    })
})
export const {useGetByCatIdCourseQuery}=GetByCatIdCourseApi
/////////////////////////////////////////////////////////////////////////////////////////
//{vunue id}
const GetByVenuyIdCourseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getByVenueIdCourse: builder.query<Course[], {id:number}>({
      query: ({id}) => `/course/ByVenue/${id}`,

      providesTags: ["Courses"],
    }),
    })
})
export const {useGetByVenueIdCourseQuery}=GetByVenuyIdCourseApi;
/////////////////////////////////////////////////////////////////////////////////////////
//{by id}
const GetOneCourseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getOneCourse: builder.query<Course, {id:number}>({
      query: ({id}) =>`/course/${id}`,

      providesTags: ["Courses"],
    }),
    })
})
export const {useGetOneCourseQuery}=GetOneCourseApi;
