import { baseApi } from "../../api/baseApi";

export const RolesServices=baseApi.injectEndpoints({
    endpoints:(builder)=>({
    getRoles:builder.query<string[], void>({
    query:()=>"/admin/getAdminRoles",
    transformResponse: (response: any) => response.data,
   })
    })
})
export const { useGetRolesQuery } = RolesServices