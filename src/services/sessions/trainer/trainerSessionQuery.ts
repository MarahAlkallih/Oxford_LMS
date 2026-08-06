import { baseApi } from "../../../api/baseApi";
import type { WeekSessions } from "../../../types/Sessions/Sessions";

const GetWeekSessionApi = baseApi.injectEndpoints({
    
  endpoints: (builder) => ({
    getWeekSession: builder.query<WeekSessions[],any>({
      query: () => ({
        url:`/sessions/trainer/this-week`,
      
      }),
      providesTags: ["Session"],
    }),
  }),
});
export const {useGetWeekSessionQuery}=GetWeekSessionApi;