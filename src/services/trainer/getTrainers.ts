import { baseApi } from "../../api/baseApi";
import type { TrainerResponse,Trainer } from "../../types/Trainer";

const getTrainersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTrainers: builder.query<
      TrainerResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: "/trainer",
        params: {
          page,
          limit,
        },
      }),
      providesTags:["Trainers"]
    }),
  }),
});
const getInActiveTrainersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInActiveTrainers: builder.query<
      TrainerResponse,
     any
    >({
      query: () => ({
        url: "/trainer/inactive",
      
      }),
      providesTags:["Trainers"]
    }),
  }),
});
const getTrainerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({getTrainer: builder.query<Trainer, { id: number }>({
      query: ({ id }) => ({
        url: `/trainer/${id}`,
      }),
      providesTags:["Trainers"]
    }),
  }),
});
const getMeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({getMe: builder.query({
      query: () => ({
        url: `/trainer/me`,
      }),
      providesTags:["Trainers"]
    }),
  }),
});
export const { useGetTrainersQuery } = getTrainersApi;
export const { useGetInActiveTrainersQuery } = getInActiveTrainersApi;
export const { useGetTrainerQuery } = getTrainerApi;
export const { useGetMeQuery } = getMeApi;