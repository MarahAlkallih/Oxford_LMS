//////////////////////////////////
import { baseApi } from "../../../../api/baseApi";

//{reject}
const RejectRegistrationApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        rejectRegistration:builder.mutation({
            query:({ id ,data})=>({
                url:`/course-registration/${id}/review`,
                method:"PATCH",
                body:data
            }),
            invalidatesTags:["Registrations"]
        })

    })
})
export const {useRejectRegistrationMutation}=RejectRegistrationApi;
///////////////////////////////////////////////////////////////////////
//{accept}
const RevokeRegistrationApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        revokeRegistration:builder.mutation({
            query:({ id })=>({
                url:`/course-registration/${id}/revoke-acceptance`,
                method:"PATCH",
               
            }),
            invalidatesTags:["Registrations"]
        })

    })
})
export const {useRevokeRegistrationMutation}=RevokeRegistrationApi;