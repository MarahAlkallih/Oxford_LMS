import { baseApi } from "../../../../api/baseApi";
import type { CourseTrainers } from "../../../../types/Course";
// {statuses}
const GetCourseTrainerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getCourseTrainers: builder.query<CourseTrainers[], {id:number}>({
      query: ({id}) => `/course-trainer/course/${id}`,

      providesTags: ["Courses-trainers"],
    }),
    })
})

export const {useGetCourseTrainersQuery}=GetCourseTrainerApi;