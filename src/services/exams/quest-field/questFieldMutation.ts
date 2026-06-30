import { baseApi } from "../../../api/baseApi";

export const EditFieldApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
     updateQuestion: builder.mutation({
      query: ({ id, body }) => ({
        url: `/question-fields/${id}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Questions"],
    }),

  }),
});