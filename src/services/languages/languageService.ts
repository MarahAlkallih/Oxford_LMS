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

  }),
});

export const {
  useCreateLanguageMutation,
  useGetLanguagesQuery,
} = languageService;