// services/conversation/chatApi.ts
import { baseApi } from "../../../api/baseApi";

export interface Participant {
  id: number;
  createdAt: string;
  updatedAt: string;
  accountId: number;
  conversationId: number;
  lastReadAt: string | null;
  firstName: string;
  lastName: string;
  image: string | null;
}

export interface LastMessage {
  id: number;
  createdAt: string;
  updatedAt: string;
  conversationId: number;
  senderId: number;
  body: string;
  isInternal: boolean;
  isRead: boolean;
  readAt: string | null;
  senderFirstName: string;
  senderLastName: string;
  senderImage: string | null;
  attachments: any[];
}

export interface Datum {
  id: number;
  createdAt: string;
  updatedAt: string;
  subject: string;
  requestTypeId: number;
  requestTypeName: string;
  courseId: number | null;
  status: string;
  createdById: number;
  participants: Participant[];
  lastMessage: LastMessage | null;
}

export interface Meta {
  totalRecords: number;
  currentPage: number;
  limit: number;
  totalPages: number;
}

export interface MyChatsResponse {
  data: Datum[];
  meta: Meta;
}

export interface MessagesResponse {
  data: LastMessage[];
  meta: Meta;
}

// الواجهة الخاصة ببيانات إرسال الرسالة
export interface SendMessagePayload {
  conversationId: number;
  body: string;
  isInternal?: boolean;
  files?: File[] | FileList | null;
}

const ChatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyChats: builder.query<MyChatsResponse, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 20 } = {}) => `/conversations`,
      providesTags: ["Chats"],
    }),
    getChatMessages: builder.query<MessagesResponse, { conversationId: number; page?: number }>({
      query: ({ conversationId, page = 1 }) => `conversations/${conversationId}/messages`,
      providesTags: (result, error, { conversationId }) => [{ type: "Messages", id: conversationId }],
    }),
    markAsRead: builder.mutation<void, { conversationId: number }>({
  query: ({ conversationId }) => ({
    url: `conversations/${conversationId}/read`,
    method: "PATCH", // أو "POST" حسب ما هو معتمد بالـ Backend
  }),
  invalidatesTags: (result, error, { conversationId }) => [
    { type: "Messages", id: conversationId },
    "Chats", // لإعادة جلب قائمة المحادثات وإخفاء علامة "غير مقروء"
  ],
}),
    sendMessage: builder.mutation<LastMessage, SendMessagePayload>({
      query: ({ conversationId, body, isInternal = false, files }) => {
        const formData = new FormData();
        
        formData.append("body", body);
        formData.append("isInternal", String(isInternal));

        if (files) {
          Array.from(files).forEach((file) => {
            formData.append("files", file);
          });
        }
        
        return {
          url: `conversations/${conversationId}/messages`,
          method: "POST",
          body: formData,
        };
      },
      
      invalidatesTags: (result, error, { conversationId }) => [
        { type: "Messages", id: conversationId },
        "Chats",
      ],
    },

),
  }),
});

export const {
  useGetMyChatsQuery,
  useGetChatMessagesQuery,
  useSendMessageMutation,
  useMarkAsReadMutation,
} = ChatApi;