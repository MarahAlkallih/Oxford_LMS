import { baseApi } from "../../../api/baseApi";
 const addStartFormApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        addStartForm:builder.mutation({
        query:(data)=>({
            url:"/start-forms",
            method:"POST",
            body:data
        }),
          invalidatesTags: ["StartForms"],
        })
    })
})
export const {useAddStartFormMutation}=addStartFormApi;

// {edit}
const editStartFormApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        editStartForm:builder.mutation({
        query:({id,data})=>({
            url:`/start-forms/${id}`,
            body:data,
            method:"PATCH"
        }),
          invalidatesTags: ["StartForms"],
        }),
        
    })
})
export const {useEditStartFormMutation}=editStartFormApi;

// {delete}
const deleteStartFormApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        deleteStartForm:builder.mutation({
        query:({id})=>({
            url:`/start-forms/${id}`,
           
            method:"DELETE"
        }),
          invalidatesTags: ["StartForms"],
        })
    })
})
export const {useDeleteStartFormMutation}=deleteStartFormApi;