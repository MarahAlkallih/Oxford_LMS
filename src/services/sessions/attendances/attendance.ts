import { baseApi } from "../../../api/baseApi";
import type { Joins } from "../../../types/Sessions/Joins";

const GetJoinsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJoins: builder.query<
      Joins,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/session-attendance/session/${id}/requests`,
      
      }),
      providesTags: ["Session-priorities"],
    }),
  }),
});
export const {useGetJoinsQuery}=GetJoinsApi;
//////////////////////////////////////////////////
export const EditAttendanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

   editAttendance: builder.mutation({
      query: ({data,id}) => ({
        url: `/session-attendance/${id}/status`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["Session-priorities"],
    }),
  })
})
export const {useEditAttendanceMutation}=EditAttendanceApi;