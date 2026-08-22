import { baseApi } from "../../../api/baseApi";

interface RequestType{
    
createdAt: string
id: number
name: string
priority: string
updatedAt: string
}
export const RequestTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    requestType: builder.mutation<any, any>({
      query: (data) => ({
        url: "/conversations/request-types",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Request-Chats"],
    }),
  })
})
export const {useRequestTypeMutation}=RequestTypeApi;


export const EditRequestTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

   editRequestType: builder.mutation({
      query: ({data,id}) => ({
        url: `/conversations/request-types/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["Request-Chats"],
    }),
  })
})
export const {useEditRequestTypeMutation}=EditRequestTypeApi;
const deleteCurrencyApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        deleteCurrency:builder.mutation({
        query:({id})=>({
            url:`/conversations/request-types/${id}`,
           
            method:"DELETE"
        }),
          invalidatesTags: ["Request-Chats"],
        })
    })
})
export const {useDeleteCurrencyMutation}=deleteCurrencyApi;
/////////////////////////////////////////////////////////////////////////////
 const GetReqApi = baseApi.injectEndpoints({
     endpoints: (builder) => ({
    
 getReqs: builder.query<RequestType[],any>({
   query: () => ({
     url: `/conversations/request-types`,
     method: "GET",
   
   }),
   providesTags: ["Request-Chats"],
 })
     })
 })
 const GetOneReqApi = baseApi.injectEndpoints({
     endpoints: (builder) => ({
         getOneReq: builder.query<any, { id: number }>({
             query: ({ id }) => `/conversations/request-types/${id}`,
             providesTags: ["Request-Chats"]
         })
     })
 })
 export const { useGetOneReqQuery } = GetOneReqApi
  export const { useGetReqsQuery } = GetReqApi