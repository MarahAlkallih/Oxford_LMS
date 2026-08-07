import { baseApi } from "../../../../api/baseApi";

export interface SuperSessions {
    assignmentId: number;
    sessionId:    number;
    sessionTitle: string;
    date:         Date;
    startTime:    Date;
    endTime:      Date;
    joinUrl:      string;
    status:       string;
    courseId:     number;
    courseTitle:  string;
    courseCode:   string;
}
export interface SuperSession {
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

const GetSuperSessionApi = baseApi.injectEndpoints({
    
  endpoints: (builder) => ({
    getSuperSession: builder.query<SuperSessions[],any>({
      query: () => ({
        url:`/session-supervisors/my-sessions`,
      
      }),
      providesTags: ["Session"],
    }),
  }),
});
export const {useGetSuperSessionQuery}=GetSuperSessionApi;
////////////////////////////////////////////////////////////////
const GetSuperOneSessionApi = baseApi.injectEndpoints({
    
  endpoints: (builder) => ({
    getSuperOneSession: builder.query<SuperSession,{id:number}>({
      query: ({id}) => ({
        url:`/session-supervisors/${id}`,
      
      }),
      providesTags: ["Session"],
    }),
  }),
});
export const {useGetSuperOneSessionQuery}=GetSuperOneSessionApi;