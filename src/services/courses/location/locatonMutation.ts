import { baseApi } from "../../../api/baseApi";
 const addLocationApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        addLocation:builder.mutation({
        query:(data)=>({
            url:"/locations",
            method:"POST",
            body:data
        }),
          invalidatesTags: ["Locations"],
        })
    })
})
export const {useAddLocationMutation}=addLocationApi;

// {edit}
const editLocationApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        editLocation:builder.mutation({
        query:({id,data})=>({
            url:`/locations/${id}`,
            body:data,
            method:"PATCH"
        }),
          invalidatesTags: ["Locations"],
        }),
        
    })
})
export const {useEditLocationMutation}=editLocationApi;

// {delete}
const deleteLocationApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        deleteLocation:builder.mutation({
        query:({id})=>({
            url:`/locations/${id}`,
           
            method:"DELETE"
        }),
          invalidatesTags: ["Locations"],
        })
    })
})
export const {useDeleteLocationMutation}=deleteLocationApi;