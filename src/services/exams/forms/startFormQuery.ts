import { baseApi } from "../../../api/baseApi";
import type {Form, FormsResponse } from "../../../types/Form";
const GetStartFormsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStartForms: builder.query<
      FormsResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: "/start-forms",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["StartForms"],
    }),
  }),
});
const GetStartFormByIdApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getStartFormById: builder.query<Form, { id: number }>({
      query: ({ id }) => `/start-forms/${id}`,
      
      providesTags: ["StartForms"],
    }),
    
    })
})
export const {  useGetStartFormByIdQuery } = GetStartFormByIdApi;
export const {  useGetStartFormsQuery } = GetStartFormsApi;