import { baseApi } from "../../api/baseApi";

const uploadTrainingPlan = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadTrainingPlan: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/training-plan",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useUploadTrainingPlanMutation } =
  uploadTrainingPlan;