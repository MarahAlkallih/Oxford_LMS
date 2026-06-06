import { baseApi } from "../../../api/baseApi";
import type { Venue } from "../../../types/Venues";
const AddVeneusApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addVenues: builder.mutation({
            query: (formData: FormData) => ({
                url: "/venue",
                method: "POST",
                body: formData,

            }),
            invalidatesTags: ["Venues"]
        }),
        
    })
})
export const editVenueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    updateVenue: builder.mutation<
      Venue,
      { id: number; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/venue/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Venues"],
    }),

  }),
});
 const deleteVenueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    deleteVenue: builder.mutation<
      Venue,
      { id: number }
    >({
      query: ({ id}) => ({
        url: `/venue/${id}`,
        method: "DELETE",
        
      }),
      invalidatesTags: ["Venues"],
    }),

  }),
});
 const inActiveVenueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    inActiveVenue: builder.mutation<Venue,{ id: number }>({
      query: ({ id}) => ({
        url: `/venue/${id}/activate`,
        method: "PATCH",
        
      }),
      invalidatesTags: ["Venues"],
    }),

  }),
});
export const {useInActiveVenueMutation}=inActiveVenueApi;
export const {useDeleteVenueMutation}=deleteVenueApi;
export const { useUpdateVenueMutation } = editVenueApi;
export const { useAddVenuesMutation } = AddVeneusApi;