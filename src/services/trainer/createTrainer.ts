import {baseApi} from "../../api/baseApi"
import type {Trainer } from "../../types/user"
const createTrainerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTrainer: builder.mutation<any,Trainer>({
      query: (userData: Trainer) => ({
        url: "/admin/createTrainer",
        method: "POST",
        body: userData
      })
     
    })
    
  })
});

export const { useCreateTrainerMutation } = createTrainerApi;