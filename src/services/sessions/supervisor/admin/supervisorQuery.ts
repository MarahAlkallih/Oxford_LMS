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
export interface Supervisors {
    assignmentId: number;
    sessionId:    number;
    adminId:      number;
    admin:        Admin;
    session:      Session;
}

export interface Admin {
    firstName: string;
    lastName:  string;
    email:     string;
}

export interface Session {
    title:  string;
    status: string;
    date:   Date;
}

const GetSupervisorsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSupervisors: builder.query<
      Supervisors[],
      any
    >({
      query: () => ({
        url: "/session-supervisors",
      
      }),
      providesTags: ["Supervisor"],
    }),
  }),
});
const GetOneSupervisorApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getOneSupervisor:builder.query<Supervisor,{id:number}>({
            query:({id})=>`/session-supervisors/${id}`,
            providesTags:["Supervisor"]
        })
    })
})
const GetSupervisorsForSessionApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getSupervisorsForSession:builder.query<Supervisor[],{id:number}>({
            query:({id})=>`/session-supervisors/session/${id}`,
            providesTags:["Supervisor"]
        })
    })
})
export const {useGetOneSupervisorQuery}=GetOneSupervisorApi

export const {useGetSupervisorsQuery}=GetSupervisorsApi
export const {useGetSupervisorsForSessionQuery}=GetSupervisorsForSessionApi