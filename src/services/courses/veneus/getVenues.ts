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
export const {  useGetVenuesQuery } = GetVenueApi;