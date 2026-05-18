import { baseApi } from "../../api/baseApi";

export const RolesServices=baseApi.injectEndpoints({
    endpoints:(builder)=>({
    getRoles:builder.query<void>({
    query:()=>"/admin/getAdminRoles"
   })
    })
})
export const { useGetRolesQuery } = RolesServices