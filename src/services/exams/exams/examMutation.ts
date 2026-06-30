import { baseApi } from "../../../api/baseApi";
 const addExamApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        addExam:builder.mutation({
        query:(data)=>({
            url:"/exams",
            method:"POST",
            body:data
        }),
          invalidatesTags: ["Exam"],
        })
    })
})
export const {useAddExamMutation}=addExamApi;

// {edit}
const editExamApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        editExam:builder.mutation({
        query:({id,data})=>({
            url:`/exams/${id}`,
            body:data,
            method:"PATCH"
        }),
          invalidatesTags: ["Exam"],
        }),
        
    })
})
export const {useEditExamMutation}=editExamApi;

// {delete}
const deleteExamApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        deleteExam:builder.mutation({
        query:({id})=>({
            url:`/exams/${id}`,
           
            method:"DELETE"
        }),
          invalidatesTags: ["Exam"],
        })
    })
})
export const {useDeleteExamMutation}=deleteExamApi;