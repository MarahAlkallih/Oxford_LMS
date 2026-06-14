import { baseApi } from "../../../api/baseApi";

export const QuestionTypesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createQuestionType: builder.mutation<any, any>({
      query: (data) => ({
        url: "/question-types",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Questions-types"],
    }),
  })
})
export const {useCreateQuestionTypeMutation}=QuestionTypesApi;


export const EditQuestionTypesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

   editQuestionType: builder.mutation({
      query: ({data,id}) => ({
        url: `/question-types/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["Questions-types"],
    }),
  })
})
export const {useEditQuestionTypeMutation}=EditQuestionTypesApi;
const deleteQuestionTypeApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        deleteQuestionType:builder.mutation({
        query:({id})=>({
            url:`/question-types/${id}`,
           
            method:"DELETE"
        }),
          invalidatesTags: ["Questions-types"],
        })
    })
})
export const {useDeleteQuestionTypeMutation}=deleteQuestionTypeApi;