import { baseApi } from "../../../api/baseApi"
import type {Tasks} from "../../../types/Course/tasks/Task"
export interface TaskItem {
  id: number;
  courseId: number;
  title: string;
  description: string;
  dueDate: string;
  maxScore: number;
  filePath: string;
  createdAt: string;
  createdBy: number;
}
 const GetTasksApi = baseApi.injectEndpoints({
     endpoints: (builder) => ({
    
 getTasks: builder.query<TaskItem[],{ id: number }>({
   query: ({id}) => ({
     url: `/tasks/courses/${id}/tasks`,
     method: "GET",
   
   }),
   providesTags: ["Tasks"],
 })
     })
 })
 const GetOneTasksApi = baseApi.injectEndpoints({
     endpoints: (builder) => ({
         getOneTasks: builder.query<any, { id: number }>({
             query: ({ id }) => `/tasks/${id}`,
             providesTags: ["Tasks"]
         })
     })
 })
 export const { useGetOneTasksQuery } = GetOneTasksApi
 //////////////////////////////////////////
  const GetsubmissionsTaskApi = baseApi.injectEndpoints({
     endpoints: (builder) => ({
         getSubmissions: builder.query<Tasks, { id: number }>({
             query: ({ id }) => `/tasks/${id}/submissions`,
             providesTags: ["Tasks"]
         })
     })
 })

 
 export const { useGetTasksQuery } = GetTasksApi
 export const { useGetSubmissionsQuery } = GetsubmissionsTaskApi