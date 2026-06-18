import { baseApi } from "../../../api/baseApi";
import type { Form } from "../../../types/Form";
const GetStartFormsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getStartForms: builder.query<Form[], void>({
      query: () => "/start-forms",

      providesTags: ["StartForms"],
    }),
    })
})
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