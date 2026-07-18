import { baseApi } from "../../../../api/baseApi";

// {statuses}
const GetRegistrationStatusesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getStatuses: builder.query<string[], void>({
      query: () => "course-registration/admin/RegistrationStatus",

      
    }),
    })
})
export const {useGetStatusesQuery}=GetRegistrationStatusesApi;