import { baseApi } from "../../api/baseApi";
import type { CourseRequest } from "../../types/courseRequest";
// {statuses}
const GetRequestsStatusesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getRequests: builder.query<CourseRequest[], void>({
      query: () => "/courseRequest/admin/all",
    providesTags:["Requests"]
      
    }),
    })
})
export const {useGetRequestsQuery}=GetRequestsStatusesApi;
/////////////////////////////////////////////////////////////
const GetOneRequestedCourseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getOneRequestedCourse: builder.query<CourseRequest, {id:number}>({
      query: ({id}) => `/courseRequest/${id}`,
      providesTags:["Requests"]
    }),
    })
})
export const {useGetOneRequestedCourseQuery}=GetOneRequestedCourseApi;
//////////////////////////////////////////////////////////////
export const EditRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

   editRequest: builder.mutation({
      query: ({data,id}) => ({
        url: `/courseRequest/${id}/review`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["Requests"],
    }),
  })
})
export const {useEditRequestMutation}=EditRequestApi;