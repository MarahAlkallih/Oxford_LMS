import {baseApi} from "../../api/baseApi"
import type {User, UserInfo } from "../../types/user"
const createUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userData: User) => ({
        url: "/admin/createAdmin",
        method: "POST",
        body: userData
      })
     
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

export const { useCreateUserMutation,useGetUsersQuery,useGetUserByIdQuery } = createUserApi;