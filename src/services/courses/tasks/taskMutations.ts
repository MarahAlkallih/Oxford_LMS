import { baseApi } from "../../../api/baseApi";


const AddTaskApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addTask: builder.mutation<any, { id: number; formData: FormData }>({
            query: ({ formData, id }) => ({
                url: `/tasks/courses/${id}/tasks`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Tasks"],
        }),
    }),
});

export const { useAddTaskMutation } = AddTaskApi;
////////////////////////////////////////////////////////////////////////
//{edit}
const EditTaskApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        editTask:builder.mutation({
            query:({fromData,id})=>({
                url:`/tasks/${id}`,
                method:"PATCH",
                body:fromData
            }),
            invalidatesTags:["Tasks"]
        })

    })
})
export const {useEditTaskMutation}=EditTaskApi;

/////////////////////////////////////////////////////////////////////
const deleteTaskApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        deleteTask:builder.mutation({
        query:({id})=>({
            url:`/tasks/${id}`,
           
            method:"DELETE"
        }),
          invalidatesTags: ["Tasks"],
        })
    })
})
export const {useDeleteTaskMutation}=deleteTaskApi;


////////////////////////////////////////////////////////////////////////
//{edit submission}
const GradSubmissionApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        gradSubmission:builder.mutation({
            query:({data,id})=>({
                url:`/tasks/submissions/${id}/grade`,
                method:"PATCH",
                body:data
            }),
            invalidatesTags:["Tasks"]
        })

    })
})
export const {useGradSubmissionMutation}=GradSubmissionApi;

/////////////////////////////////////////////////////////////////////
const deleteSubApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        deleteSub:builder.mutation({
        query:({id})=>({
            url:`/tasks/submissions/${id}`,
           
            method:"DELETE"
        }),
          invalidatesTags: ["Tasks"],
        })
    })
})
export const {useDeleteSubMutation}=deleteSubApi;