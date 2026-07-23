import { baseApi } from "../../../api/baseApi";

interface SessionPrio{
    id?: number;
  name: string;
  description: string;
  

}

const GetSessionPrioApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSessionPrio: builder.query<
      SessionPrio[],
      any
    >({
      query: () => ({
        url: "/session-priorities",
      
      }),
      providesTags: ["Session-priorities"],
    }),
  }),
});
const GetOneSPrioApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getOneSPrio:builder.query<SessionPrio,{id:number}>({
            query:({id})=>`/session-priorities/${id}`,
            providesTags:["Session-priorities"]
        })
    })
})
export const {useGetOneSPrioQuery}=GetOneSPrioApi

export const {useGetSessionPrioQuery}=GetSessionPrioApi