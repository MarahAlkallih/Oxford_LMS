import { baseApi } from "../../../api/baseApi";

interface SessionTypes{
    id?: number;
  name: string;
  description: string;
  

}



const GetSessionTypesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSessionTypes: builder.query<
      SessionTypes[],
      any
    >({
      query: () => ({
        url: "/session-types",
      
      }),
      providesTags: ["Session-types"],
    }),
  }),
});
const GetOneSTypeApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getOneSType:builder.query<SessionTypes,{id:number}>({
            query:({id})=>`/session-types/${id}`,
            providesTags:["Session-types"]
        })
    })
})
export const {useGetOneSTypeQuery}=GetOneSTypeApi

export const {useGetSessionTypesQuery}=GetSessionTypesApi