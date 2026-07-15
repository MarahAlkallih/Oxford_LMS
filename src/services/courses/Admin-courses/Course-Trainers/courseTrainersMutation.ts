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
///////////////////////////////////////////////
const RemoveCourseTrainerApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        removeCourseTrainer:builder.mutation({
            query:({courseId,trainerId})=>({
                url:`/course-trainer/course/${courseId}/trainer/${trainerId}`,
                method:"DELETE",
                
            }),
            invalidatesTags:["Courses-trainers"]
        })

    })
})
export const {useRemoveCourseTrainerMutation}=RemoveCourseTrainerApi