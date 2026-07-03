import { baseApi } from "../../../api/baseApi";
// {add quest with answer and files}
const AddQuestionWithFieldsApi= baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addQuestWithFields: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/questions/withAnswerFieldsAndFile",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useAddQuestWithFieldsMutation } =AddQuestionWithFieldsApi;
///////////////////////////////////////////////////////////////////////////////////
// {add quest}
const AddQuestionApi= baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addQuestion: builder.mutation<any, any>({
      query: (data) => ({
        url: "/questions",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const EditQuestionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    updateQuestion: builder.mutation({
      query: ({ id, body }) => ({
        url: `/questions/${id}/withAnswerFieldsAndFile`,
        method: "PATCH",
        body: body,
        params:{
          id
        }
      }),
      invalidatesTags: ["Questions"],
    }),

  }),
});
 const deleteQuestionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    deleteQuestion: builder.mutation<any, { id: number }>({
      query: ({ id}) => ({
        url: `/questions/${id}`,
        method: "DELETE",
        
      }),
      invalidatesTags: ["Questions"],
    }),

  }),
});

export const { useAddQuestionMutation } =AddQuestionApi;
export const { useUpdateQuestionMutation } =EditQuestionApi;
export const { useDeleteQuestionMutation } =deleteQuestionApi;