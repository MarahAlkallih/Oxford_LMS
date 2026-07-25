import { baseApi } from "../../../../api/baseApi";

export interface Supervisor{
       
        assignmentId: number,
        adminId: number,
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        gender: string
    
}

const GetSupervisorsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSupervisors: builder.query<
      Supervisor[],
      any
    >({
      query: () => ({
        url: "/session-priorities",
      
      }),
      providesTags: ["Supervisor"],
    }),
  }),
});
const GetOneSupervisorApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getOneSupervisor:builder.query<Supervisor,{id:number}>({
            query:({id})=>`/session-priorities/${id}`,
            providesTags:["Supervisor"]
        })
    })
})
export const {useGetOneSupervisorQuery}=GetOneSupervisorApi

export const {useGetSupervisorsQuery}=GetSupervisorsApi