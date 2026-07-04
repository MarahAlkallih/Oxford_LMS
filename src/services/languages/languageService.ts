import { baseApi } from "../../api/baseApi";

interface Language {
  id?: number;
  name: string;
  description: string;
  createdAt?: Date,

}

export const languageService = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createLanguage: builder.mutation<any, Language>({
      query: (data) => ({
        url: "/language",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Language"],
    }),

    getLanguages: builder.query<Language[], void>({
      query: () => "/language",

      providesTags: ["Language"],
    }),
      getOLanguage: builder.query<Language, { id: number }>({
      query: ({ id }) => `/language/${id}`,

      providesTags: ["Language"],
    }),

  }),
});
// {edit}
const editLanguageApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        editLanguage:builder.mutation({
        query:({id,data})=>({
            url:`/language/${id}`,
            body:data,
            method:"PATCH"
        }),
          invalidatesTags: ["Language"],
        }),
        
    })
})
export const {useEditLanguageMutation}=editLanguageApi;

// {delete}
const deleteLanguageApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        deleteLanguage:builder.mutation({
        query:({id})=>({
            url:`/language/${id}`,
           
            method:"DELETE"
        }),
          invalidatesTags: ["Language"],
        })
    })
})
export const {useDeleteLanguageMutation}=deleteLanguageApi;
export const {
  useCreateLanguageMutation,
  useGetLanguagesQuery,
  useGetOLanguageQuery
} = languageService;