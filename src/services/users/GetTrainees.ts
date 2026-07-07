import { baseApi } from "../../api/baseApi";
import type {Trainee, TraineesResponse} from "../../types/Trainees"
const getTraineeApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getTrainees:builder.query<TraineesResponse,{page:number,limit:number}>({
            query:({page,limit})=>({
                url:"/user",
                params:{
                    page,
                    limit
                }
            }),
            providesTags:["Trainees"]
            
        })
        
    })
})
export const {useGetTraineesQuery}=getTraineeApi;
///////////////////////////////////////////////////////////////////////
const getTraineeByIdApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getTrainee:builder.query<Trainee,{accountId:number}>({
            query:({accountId})=>({
                url:`/user/${accountId}`,
              
            }),
            providesTags:["Trainees"]
        })
    })
})
//////////////////////////////////////////////////////////////////////
const updateUserApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
     
updateTrainee: builder.mutation<any, { id: number; body: any }>({
  query: ({ id, body }) => ({
    url: `/user/${id}`, 
    method: "PATCH", 
    body,
  }),
  invalidatesTags:["Trainees"]

}),
    })
})
export const {useGetTraineeQuery}=getTraineeByIdApi;
export const {useUpdateTraineeMutation}=updateUserApi;