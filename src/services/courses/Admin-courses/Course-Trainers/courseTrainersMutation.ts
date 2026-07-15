import { baseApi } from "../../../../api/baseApi";

const AssignCourseTrainerApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        assignCourseTrainer:builder.mutation({
            query:(data)=>({
                url:"/course-trainer/assign",
                method:"POST",
                body:data
            }),
            invalidatesTags:["Courses-trainers"]
        })

    })
})
export const {useAssignCourseTrainerMutation}=AssignCourseTrainerApi