import { baseApi } from "../../api/baseApi";
import type { TrainingPlan } from "../../types/TrainingPlan";

export const trainingPlanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getTrainingPlans: builder.query<TrainingPlan[], void>({
      query: () => "/training-plan",
      providesTags: ["TrainingPlan"],
    }),

    getTrainingPlanById: builder.query<TrainingPlan, number>({
      query: (id) => `/training-plan/${id}`,
      providesTags: ["TrainingPlan"],
    }),

    deleteTrainingPlan: builder.mutation<void, number>({
      query: (id) => ({
        url: `/training-plan/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TrainingPlan"],
    }),

    updateTrainingPlan: builder.mutation<
      TrainingPlan,
      { id: number; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/training-plan/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["TrainingPlan"], 
    }),
  }),
});

export const {
  useGetTrainingPlansQuery,
  useGetTrainingPlanByIdQuery,
  useDeleteTrainingPlanMutation,
  useUpdateTrainingPlanMutation,
} = trainingPlanApi;