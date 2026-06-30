import { baseApi } from "../../../api/baseApi";
import type {ExamFile} from "../../../types/ExamFile"
const GetExamsFilesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFiles: builder.query<ExamFile,{ id: number }>({
      query: ({
       id
      }) => ({
        url:`/exam-files/${id}`,
        params: {
        id
        },
      }),

      providesTags: ["Exam"],
    }),
  }),
});

export const { useGetFilesQuery } = GetExamsFilesApi;

