import { baseApi } from "../../api/baseApi";

export const CurrencyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createCurrency: builder.mutation<any, any>({
      query: (data) => ({
        url: "/currency",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Currencies"],
    }),
  })
})
export const {useCreateCurrencyMutation}=CurrencyApi;


export const EditCurrenciesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

   editCurrency: builder.mutation({
      query: ({data,id}) => ({
        url: `/currency/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["Currencies"],
    }),
  })
})
export const {useEditCurrencyMutation}=EditCurrenciesApi;
const deleteCurrencyApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        deleteCurrency:builder.mutation({
        query:({id})=>({
            url:`/currency/${id}`,
           
            method:"DELETE"
        }),
          invalidatesTags: ["Currencies"],
        })
    })
})
export const {useDeleteCurrencyMutation}=deleteCurrencyApi;