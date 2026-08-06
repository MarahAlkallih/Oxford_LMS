import { baseApi } from "../../../api/baseApi";


const AddCourseFilesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addCourseFile: builder.mutation<any, { id: number; formData: FormData }>({
            query: ({ formData, id }) => ({
                url: `/course-files/${id}/upload`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["CourseFiles"],
        }),
    }),
});

export const { useAddCourseFileMutation } = AddCourseFilesApi;
////////////////////////////////////////////////////////////////////////

const GetCourseFilesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCourseFiles: builder.query<any, number>({
            query: (id) => `/course-files/${id}`,

      providesTags: ["CourseFiles"],
    }),
    })
})
export const {  useGetCourseFilesQuery } = GetCourseFilesApi;
/////////////////////////////////////////////////////////////////////
const deleteCourseFileApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        deleteCourseFile:builder.mutation({
        query:({id})=>({
            url:`/course-files/${id}`,
           
            method:"DELETE"
        }),
          invalidatesTags: ["CourseFiles"],
        })
    })
})
export const {useDeleteCourseFileMutation}=deleteCourseFileApi;