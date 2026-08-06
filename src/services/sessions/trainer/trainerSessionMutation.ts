import { baseApi } from "../../../api/baseApi";

export const StartSessionPrioApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

   StartSessionPrio: builder.mutation({
      query: ({id}) => ({
        url: `/sessions/${id}/start`,
        method: "PATCH",
       
      }),

      invalidatesTags: ["Session"],
    }),
  })
})
export const {useStartSessionPrioMutation}=StartSessionPrioApi
//////////////////////////////////////////////////////////////////
export const EndSessionPrioApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

   EndSessionPrio: builder.mutation({
      query: ({id}) => ({
        url: `/sessions/${id}/end`,
        method: "PATCH",
       
      }),

      invalidatesTags: ["Session"],
    }),
  })
})
export const {useEndSessionPrioMutation}=EndSessionPrioApi;