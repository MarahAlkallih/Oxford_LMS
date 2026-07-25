import { baseApi } from "../../../api/baseApi";

export interface Session {
    id:           number;
    title:        string;
    status:       string;
    startTime:    Date;
    trainerName:  string;
    trainerEmail: string;
    trainerPhone: string;
}
export interface SessionDetails {
    id:              number;
    title:           string;
    date:            Date;
    startTime:       Date;
    endTime:         Date;
    status:          string;
    joinUrl:         string;
    trainerName:     string;
    startUrl:        string;
    trainerEmail:    string;
    trainerPhone:    string;
    actualStartTime: null;
    actualEndTime:   null;
}



const GetSessionApi = baseApi.injectEndpoints({
    
  endpoints: (builder) => ({
    getSession: builder.query<Session[],{id:number}>({
      query: ({id}) => ({
        url:`/sessions/course/${id}`,
      
      }),
      providesTags: ["Session"],
    }),
  }),
});
export const {useGetSessionQuery}=GetSessionApi;
const GetOneSessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOneSession: builder.query<
      SessionDetails,
      {id:number}
    >({
      query: ({id}) => ({
        url:`/sessions/${id}`,
      
      }),
      providesTags: ["Session"],
    }),
  }),
});
export const {useGetOneSessionQuery}=GetOneSessionApi;