import { baseApi } from "../../../api/baseApi"
import type { Instance, InstanceResponse } from "../../../types/Instance"

const GetInstancesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllInstances: builder.query<InstanceResponse, { page: number, limit: number }>({
            query: ({ page, limit }) => ({
                url: "/exam-instances",
                params: {
                    page,
                    limit,
                },
            }),
            providesTags: ["Exam-instances"]
        }),

    })
})
const GetOneInstanceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOneInstance: builder.query<Instance, { id: number }>({
            query: ({ id }) => `/exam-instances/${id}`,
            providesTags: ["Exam-instances"]
        })
    })
})
export const { useGetOneInstanceQuery } = GetOneInstanceApi

export const { useGetAllInstancesQuery } = GetInstancesApi