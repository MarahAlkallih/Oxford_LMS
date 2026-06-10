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
const getTrainerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({getTrainer: builder.query<Trainer, { id: number }>({
      query: ({ id }) => ({
        url: `/trainer/${id}`,
      }),
      providesTags:["Trainers"]
    }),
  }),
});
export const { useGetTrainersQuery } = getTrainersApi;
export const { useGetTrainerQuery } = getTrainerApi;