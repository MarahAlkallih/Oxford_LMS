import { baseApi } from "../../../api/baseApi";
import type { Category } from "../../../types/Category";

const AddCategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addCategory: builder.mutation({
            query: (formData: FormData) => ({
                url: "/categories",
                method: "POST",
                body: formData,

            }),
            invalidatesTags: ["Categories"]
        }),
        
    })
})
export const {useAddCategoryMutation}=AddCategoryApi;
// edit
export const editCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    updateCategory: builder.mutation<
      Category,
      { id: number; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Categories"],
    }),

  }),
});
 const deleteCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    deleteCategory: builder.mutation<
      Category,
      { id: number }
    >({
      query: ({ id}) => ({
        url: `/categories/${id}`,
        method: "DELETE",
        
      }),
      invalidatesTags: ["Categories"],
    }),

  }),
});
 const inActiveCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    inActiveCategory: builder.mutation<Category,{ id: number }>({
      query: ({ id}) => ({
        url: `/categories/${id}/activate`,
        method: "PATCH",
        
      }),
      invalidatesTags: ["Categories"],
    }),

  }),
});
export const {useInActiveCategoryMutation}=inActiveCategoryApi;
export const {useDeleteCategoryMutation}=deleteCategoryApi;
export const { useUpdateCategoryMutation } = editCategoryApi;