import { baseApi } from "../../../api/baseApi";

export const SessionTypesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createSessionType: builder.mutation<any, any>({
      query: (data) => ({
        url: "/session-types",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Session-types"],
    }),
  })
})
export const {useCreateSessionTypeMutation}=SessionTypesApi;


export const EditSessionTypesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

   editSessionType: builder.mutation({
      query: ({data,id}) => ({
        url: `/session-types/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["Session-types"],
    }),
  })
})
export const {useEditSessionTypeMutation}=EditSessionTypesApi;
const deleteSessionTypeApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        deleteSessionType:builder.mutation({
        query:({id})=>({
            url:`/session-types/${id}`,
           
            method:"DELETE"
        }),
          invalidatesTags: ["Session-types"],
        })
    })
})
export const {useDeleteSessionTypeMutation}=deleteSessionTypeApi;