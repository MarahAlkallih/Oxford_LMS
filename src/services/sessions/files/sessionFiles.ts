import { baseApi } from "../../../api/baseApi";


const AddSessionFilesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addSessionFile: builder.mutation<any, { id: number; formData: FormData }>({
            query: ({ formData, id }) => ({
                url: `/session-files/${id}/upload`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["SessionFiles"],
        }),
    }),
});

export const { useAddSessionFileMutation } = AddSessionFilesApi;
////////////////////////////////////////////////////////////////////////

const GetSessionFilesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSessionFiles: builder.query<any, number>({
            query: (id) => `/session-files/${id}`,

      providesTags: ["SessionFiles"],
    }),
    })
})
export const {  useGetSessionFilesQuery } = GetSessionFilesApi;
/////////////////////////////////////////////////////////////////////
const deleteSessionFileApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        deleteSessionFile:builder.mutation({
        query:({id})=>({
            url:`/session-files/${id}`,
           
            method:"DELETE"
        }),
          invalidatesTags: ["SessionFiles"],
        })
    })
})
export const {useDeleteSessionFileMutation}=deleteSessionFileApi;