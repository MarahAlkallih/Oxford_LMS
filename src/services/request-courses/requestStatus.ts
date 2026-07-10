import { baseApi } from "../../api/baseApi";

const GetStatusApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getRequestStatus: builder.query<String[], void>({
      query: () => "/courseRequest/admin/requestStatuses",

     
    }),
    })
})
export const {useGetRequestStatusQuery}=GetStatusApi