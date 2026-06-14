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
            })
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
              
            })
        })
    })
})
export const {useGetTraineeQuery}=getTraineeByIdApi;