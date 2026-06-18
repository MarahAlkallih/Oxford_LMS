import { baseApi } from "../../../api/baseApi";
import type { Form } from "../../../types/Form";
const GetEndFormsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getEndForms: builder.query<Form[], void>({
      query: () => "/end-forms",

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