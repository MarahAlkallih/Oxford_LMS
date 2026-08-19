import { baseApi } from "../../api/baseApi";

export const SaveTokenApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

   saveToken: builder.mutation({
      query: ({data}) => ({
        url: `/notifications/token`,
        body:data,
        method: "POST",
      }),

      invalidatesTags: ["Notifications"],
    }),
  })
})
export const {useSaveTokenMutation}=SaveTokenApi;




///////////////////////////////////////////////////////////////
export const MarkAsReadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

   markAsRead: builder.mutation({
      query: ({id}) => ({
        url: `/notifications/${id}/read`,
        method: "PATCH",
      
      }),

      invalidatesTags: ["Notifications", "UnreadCount"],
    }),
  })
})
export const {useMarkAsReadMutation}=MarkAsReadApi;
/////////////////////////////////////////////////
export const MarkAllReadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

   markAsReadAll: builder.mutation({
      query: () => ({
        url: `/notifications/mark-all-read`,
        method: "PATCH",
      
      }),

      invalidatesTags: ["Notifications", "UnreadCount"],
    }),
  })
})
export const {useMarkAsReadAllMutation}=MarkAllReadApi;