import { baseApi } from "../../../api/baseApi";
import type { Location } from "../../../types/Location";
const GetLocationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getLocations: builder.query<Location[], void>({
      query: () => "/locations",

      providesTags: ["Locations"],
    }),
    })
})
const GetLocationByIdApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getLocationById: builder.query<Location, { id: number }>({
      query: ({ id }) => `/locations/${id}`,
      
      providesTags: ["Locations"],
    }),
    
    })
})
export const {  useGetLocationByIdQuery } = GetLocationByIdApi;
export const {  useGetLocationsQuery } = GetLocationApi;