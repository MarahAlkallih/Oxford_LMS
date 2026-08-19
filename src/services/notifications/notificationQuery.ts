import { baseApi } from "../../api/baseApi";
import type {
  NotificationsResponse,
  UnreadCountResponse,
} from "../../types/Notifications/notification";


const notificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<
      NotificationsResponse,
     { page?: number; limit?: number }
    >({
      query: ({page,limit}) => ({
        url: "/notifications",
        params:{
            page,
            limit
        }
      }),
      providesTags: ["Notifications"],
    }),
  }),
});

export const {useGetNotificationsQuery}=notificationsApi

///////////////////////////////////////////////////////////////////
const CountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUnreadCount: builder.query<
      UnreadCountResponse,
    void
    >({
      query: () => ({
        url: "/notifications/unread-count",
        
      }),
      providesTags: ["UnreadCount"],
    }),
  }),
});

export const {useGetUnreadCountQuery}=CountApi