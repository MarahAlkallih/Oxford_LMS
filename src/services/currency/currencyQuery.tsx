import { baseApi } from "../../api/baseApi";

 interface Currency{
    id: number;
    currencyName: string;
    symbol: string;
 }

 const GetCurrenciesApi = baseApi.injectEndpoints({
     endpoints: (builder) => ({
    
 getCurrencies: builder.query<Currency[],any>({
   query: () => ({
     url: "/currency",
     method: "GET",
   
   }),
   providesTags: ["Currencies"],
 })
     })
 })
 const GetOneCurrencyApi = baseApi.injectEndpoints({
     endpoints: (builder) => ({
         getOneCurrency: builder.query<Currency, { id: number }>({
             query: ({ id }) => `/currency/${id}`,
             providesTags: ["Currencies"]
         })
     })
 })
 export const { useGetOneCurrencyQuery } = GetOneCurrencyApi
 
 export const { useGetCurrenciesQuery } = GetCurrenciesApi