import { baseApi } from "../../../api/baseApi";

 import type { AssignmentUser } from "../../../types/exam/assignmentUser";
import type { TraineesInfo } from "../../../types/exam/OneAssignment";

 const GetAssignmentsApi = baseApi.injectEndpoints({
     endpoints: (builder) => ({
    
 getAssignmens: builder.query<AssignmentUser,any>({
   query: ({filters}) => ({
     url: "/assignment-users",
     method: "GET",
     params:filters
   
   }),
   providesTags: ["Assignment"],
 })
     })
 })
 const GetOneAssignmentApi = baseApi.injectEndpoints({
     endpoints: (builder) => ({
         getOneAssignment: builder.query<TraineesInfo, { id: number }>({
             query: ({ id }) => `/assignment-users/${id}`,
             providesTags: ["Assignment"]
         })
     })
 })
 export const { useGetOneAssignmentQuery } = GetOneAssignmentApi
 
 export const { useGetAssignmensQuery } = GetAssignmentsApi