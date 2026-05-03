
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  accessToken: null,
  isLoggedIn: false,
  role:null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken
      localStorage.setItem("accessToken", action.payload.accessToken)
      localStorage.setItem("refreshToken", action.payload.refreshToken)
      localStorage.setItem("role",action.payload.role)
      localStorage.setItem("isLoggedIn",true.toString())
      state.isLoggedIn = true
      state.role=action.payload.role
    },
    logout: (state) => {
      state.accessToken = null
      localStorage.removeItem("accessToken")
      state.isLoggedIn = false
      state.role=null
    },
  },
})

export const { setTokens, logout } = authSlice.actions
export default authSlice.reducer