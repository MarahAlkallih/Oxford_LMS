import { configureStore } from "@reduxjs/toolkit"
import { baseApi } from "../api/baseApi"
import authReducer from "../features/admin/auth/authSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,

    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>