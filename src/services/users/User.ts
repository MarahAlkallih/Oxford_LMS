import {baseApi} from "../../api/baseApi"
import type {User } from "../../types/user"
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

      })
    
  })
});

export const { useCreateUserMutation,useGetUsersQuery } = createUserApi;