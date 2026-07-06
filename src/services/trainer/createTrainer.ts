import {baseApi} from "../../api/baseApi"
import type {Trainer } from "../../types/user"
const createTrainerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTrainer: builder.mutation<any,any>({
      query: (userData: Trainer) => ({
        url: "/admin/createTrainer",
        method: "POST",
        body: userData
      }),
      invalidatesTags:["Trainers"]
     
    })
    
  })
});
const editTrainerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    editTrainer: builder.mutation({
      query: ({data,id}) => ({
        url: `/trainer/${id}`,
        method: "PATCH",
        body: data
      }),
           invalidatesTags:["Trainers"]
    })
  })
});
const activeTrainerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    activeTrainer: builder.mutation({
      query: ({id}) => ({
        url: `/trainer/${id}/activate`,
        method: "PATCH",
        
      }),
           invalidatesTags:["Trainers"]
    })
  })
});
const deActiveTrainerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deActiveTrainer: builder.mutation({
      query: ({id}) => ({
        url: `/trainer/${id}/deactivate`,
        method: "PATCH",
        
      }),
           invalidatesTags:["Trainers"]
    })
  })
});
export const {useEditTrainerMutation}=editTrainerApi
export const {useActiveTrainerMutation}=activeTrainerApi
export const {useDeActiveTrainerMutation}=deActiveTrainerApi
export const { useCreateTrainerMutation } = createTrainerApi;