import { baseApi } from "../../../api/baseApi";

export const AssignmentTraineesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    assignmentTrainees: builder.mutation<any, any>({
      query: (data) => ({
        url: "/assignment-users/bulk",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Assignment"],
    }),
  })
})
export const {useAssignmentTraineesMutation}=AssignmentTraineesApi;
const deleteAssignmentTraineesApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        deleteAssignmentTrainees:builder.mutation({
        query:({id})=>({
            url:`/assignment-users/${id}`,
           
            method:"DELETE"
        }),
          invalidatesTags: ["Assignment"],
        })
    })
})
export const {useDeleteAssignmentTraineesMutation}=deleteAssignmentTraineesApi;