import { baseApi } from "../../../api/baseApi";

export const CreateDirectChatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createDirectChat: builder.mutation<any, any>({
      query: (data) => ({
        url: "/conversations/direct",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Direct-Chats"],
    }),
  })
})

export const {useCreateDirectChatMutation}=CreateDirectChatApi;
//////////////////////////////////////////////////////////////////////////
export const CreateGroupChatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createGroupChat: builder.mutation<any, any>({
      query: (data) => ({
        url: "/conversations/group",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Group-Chats"],
    }),
  })
})

export const {useCreateGroupChatMutation}=CreateGroupChatApi;