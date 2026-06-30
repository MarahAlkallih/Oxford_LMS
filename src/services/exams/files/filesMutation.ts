import { baseApi } from "../../../api/baseApi";


const AddExamFileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addFile: builder.mutation({
            query: (formData: FormData) => ({
                url: "/exam-files/upload",
                method: "POST",
                body: formData,

            }),
            invalidatesTags: ["Exam"]
        }),
        
    })
})
export const {useAddFileMutation}=AddExamFileApi;

const DeleteExamsFilesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteFiles: builder.mutation<{ id: number },any>({
      query: ({
       id
      }) => ({
        url:`/exam-files/${id}`,
        method: "DELETE",
        params: {
        id
        },
      }),

      invalidatesTags: ["Exam"],
    }),
  }),
});

export const { useDeleteFilesMutation } = DeleteExamsFilesApi;