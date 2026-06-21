import { baseApi } from "../../../api/baseApi";
import type { Form,FormsResponse } from "../../../types/Form";
const GetEndFormsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getEndForms: builder.query<FormsResponse, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: "/end-forms",
        params: {
          page,
          limit,
        },
      }),

      providesTags: ["EndForms"],
    }),
    })
})
const GetEndFormByIdApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getEndFormById: builder.query<Form, { id: number }>({
      query: ({ id }) => `/end-forms/${id}`,
      
      providesTags: ["EndForms"],
    }),
    
    })
})
export const {  useGetEndFormByIdQuery } = GetEndFormByIdApi;
export const {  useGetEndFormsQuery } = GetEndFormsApi;