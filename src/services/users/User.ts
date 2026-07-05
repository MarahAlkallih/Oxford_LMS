import {baseApi} from "../../api/baseApi"
import type {User, UserInfo } from "../../types/user"
const createUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userData: User) => ({
        url: "/admin/createAdmin",
        method: "POST",
        body: userData
      }),
     invalidatesTags:["users"]
    }),
     getUsers:builder.query<User[],void>({
        query:()=>"/admin",
        providesTags:["users"]

      }),
 getUserById: builder.query<UserInfo, number>({
  query: (id) => `/admin/${id}`,
  transformResponse: (res: any) => res.data,
})
    
  })
});
const editUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    editUser: builder.mutation({
      query: ({data,id}) => ({
        url: `/admin/${id}`,
        method: "PATCH",
        body: data
      }),
           invalidatesTags:["users"]
    })
  })
});
const activeUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    activeUser: builder.mutation({
      query: ({id}) => ({
        url: `/admin/${id}/activate`,
        method: "PATCH",
        
      }),
           invalidatesTags:["users"]
    })
  })
});
const deActiveUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deActiveUser: builder.mutation({
      query: ({id}) => ({
        url: `/admin/${id}/deactivate`,
        method: "PATCH",
        
      }),
           invalidatesTags:["users"]
    })
  })
});
export const {useEditUserMutation}=editUserApi
export const {useActiveUserMutation}=activeUserApi
export const {useDeActiveUserMutation}=deActiveUserApi
export const { useCreateUserMutation,useGetUsersQuery,useGetUserByIdQuery } = createUserApi;