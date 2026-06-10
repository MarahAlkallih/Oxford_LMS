import { baseApi } from "../../../api/baseApi";
import type { Category } from "../../../types/Category";
const GetCategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getCategory: builder.query<Category[], void>({
      query: () => "/categories",

      providesTags: ["Categories"],
    }),
    })
})
export const {  useGetCategoryQuery } = GetCategoryApi;
const GetInActiveCategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getInActiveCategory: builder.query<Category[], void>({
      query: () => "/categories/allUnActive",

      providesTags: ["Categories"],
    }),
    })
})
export const {  useGetInActiveCategoryQuery } = GetInActiveCategoryApi;