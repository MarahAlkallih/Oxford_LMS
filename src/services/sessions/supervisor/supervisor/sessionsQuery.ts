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