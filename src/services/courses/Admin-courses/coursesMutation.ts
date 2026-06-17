import { baseApi } from "../../../api/baseApi";

// {Add Course}
const CreateCourseApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        addCourse:builder.mutation({
            query:(data)=>({
                url:"/course",
                method:"POST",
                body:data
            }),
            invalidatesTags:["Courses"]
        })

    })
})
export const {useAddCourseMutation}=CreateCourseApi;
//////////////////////////////////
//{edit}
const EditCourseApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        editCourse:builder.mutation({
            query:({data,id})=>({
                url:`course/${id}`,
                method:"PATCH",
                body:data
            }),
            invalidatesTags:["Courses"]
        })

    })
})
export const {useEditCourseMutation}=EditCourseApi;
/////////////////////////
//{delete}

const DeleteCourseApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        delteCourse:builder.mutation({
            query:({id})=>({
                url:`course/${id}`,
                method:"DELETE",
                
            }),
            invalidatesTags:["Courses"]
        })

    })
})
export const {useDelteCourseMutation}=DeleteCourseApi;
//////////////////////////////////
//{un active}
const ActiveCourseApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        activeCourse:builder.mutation({
            query:({id})=>({
                url:`course/${id}/activate`,
                method:"PATCH",
               
            }),
            invalidatesTags:["Courses"]
        })

    })
})
export const {useActiveCourseMutation}=ActiveCourseApi;