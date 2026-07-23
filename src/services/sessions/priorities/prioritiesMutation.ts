import { baseApi } from "../../../api/baseApi";

export const SessionPrioApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createSessionPrio: builder.mutation<any, any>({
      query: (data) => ({
        url: "/session-priorities",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Session-priorities"],
    }),
  })
})
export const {useCreateSessionPrioMutation}=SessionPrioApi;


export const EditSessionPrioApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

   editSessionPrio: builder.mutation({
      query: ({data,id}) => ({
        url: `/session-priorities/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["Session-priorities"],
    }),
  })
})
export const {useEditSessionPrioMutation}=EditSessionPrioApi;
const deleteSessionPrioApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        deleteSessionPrio:builder.mutation({
        query:({id})=>({
            url:`/session-priorities/${id}`,
           
            method:"DELETE"
        }),
          invalidatesTags: ["Session-priorities"],
        })
    })
})
export const {useDeleteSessionPrioMutation}=deleteSessionPrioApi;