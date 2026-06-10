import { baseApi } from "../../../api/baseApi";
import type { Venue } from "../../../types/Venues";
const GetVenueApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getVenues: builder.query<Venue[], void>({
      query: () => "/venue",

      providesTags: ["Venues"],
    }),
    })
})
const GetUnActiveVenueApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getUnActiveVenues: builder.query<Venue[], void>({
      query: () => "/venue/allUnActive",

      providesTags: ["Venues"],
    }),
    })
})
export const {  useGetUnActiveVenuesQuery } = GetUnActiveVenueApi;
export const {  useGetVenuesQuery } = GetVenueApi;