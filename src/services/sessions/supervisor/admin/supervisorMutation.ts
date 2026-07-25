import { baseApi } from "../../../../api/baseApi";

export const AddSupervisorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    addSupervisor: builder.mutation<any, any>({
      query: (data) => ({
        url: "/session-supervisors",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Supervisor"],
    }),
  })
})
export const {useAddSupervisorMutation}=AddSupervisorApi;
/////////////////////////

export const EditSupervisorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

   editSupervisor: builder.mutation({
      query: ({data,id}) => ({
        url: `/session-supervisors/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["Supervisor"],
    }),
  })
})
export const {useEditSupervisorMutation}=EditSupervisorApi;
const deleteSupervisorApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        deleteSupervisor:builder.mutation({
        query:({id})=>({
            url:`/session-supervisors/${id}`,
           
            method:"DELETE"
        }),
          invalidatesTags: ["Supervisor"],
        })
    })
})
export const {useDeleteSupervisorMutation}=deleteSupervisorApi;


