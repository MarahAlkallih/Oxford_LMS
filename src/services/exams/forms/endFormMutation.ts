import { baseApi } from "../../../api/baseApi";
 const addEndFormApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        addEndForm:builder.mutation({
        query:(data)=>({
            url:"/end-forms",
            method:"POST",
            body:data
        }),
          invalidatesTags: ["EndForms"],
        })
    })
})
export const {useAddEndFormMutation}=addEndFormApi;

// {edit}
const editEndFormApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        editEndForm:builder.mutation({
        query:({id,data})=>({
            url:`/end-forms/${id}`,
            body:data,
            method:"PATCH"
        }),
          invalidatesTags: ["EndForms"],
        }),
        
    })
})
export const {useEditEndFormMutation}=editEndFormApi;

// {delete}
const deleteEndFormApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        deleteEndForm:builder.mutation({
        query:({id})=>({
            url:`/end-forms/${id}`,
           
            method:"DELETE"
        }),
          invalidatesTags: ["EndForms"],
        })
    })
})
export const {useDeleteEndFormMutation}=deleteEndFormApi;