// types/notification.ts

export interface NotificationItem {
  id: number;
  accountId: number;
  title: string;
  subTitle?: string | null;
  url?: string | null;
  image?: string | null;
  body: string;
  data?: string | null; // JSON String e.g. '{"test":"success","route":"/home"}'
  readAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationsResponse {
  data: NotificationItem[];
  meta: {
    totalRecords: number;
    currentPage: number;
    limit: number;
    totalPages: number;
  };
}

export interface UnreadCountResponse {
  unreadCount: number;
}