import { baseApi } from "../../../api/baseApi";

export const CreateSessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createSession: builder.mutation<any, any>({
      query: (data) => ({
        url: "/sessions",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Session"],
    }),
  })
})
export const {useCreateSessionMutation}=CreateSessionApi;


