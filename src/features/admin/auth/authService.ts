import type { User } from "../../../types/user";
import { baseApi } from "../../../api/baseApi";
export const authService =baseApi.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation<{token:string},User>({
            query:(data)=>({
                url:"/auth/admin/login",
                method:"POST",
                body:data
                
            })
            
        })
    })
    
})
export const { useLoginMutation } = authService;