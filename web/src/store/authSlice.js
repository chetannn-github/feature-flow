import { createSlice } from '@reduxjs/toolkit'

const tokenFromStorage = localStorage.getItem('ff_token')
const userFromStorage = localStorage.getItem('ff_user')

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: tokenFromStorage || null,
    user: userFromStorage ? JSON.parse(userFromStorage) : null,
    loading: false,
    error: null
  },
  reducers: {
    loginStart(state) { state.loading = true; state.error = null },
    loginSuccess(state, action) {
      state.loading = false
      state.token = action.payload.token
      state.user = action.payload.user
      localStorage.setItem('ff_token', action.payload.token)
      localStorage.setItem('ff_user', JSON.stringify(action.payload.user))
    },
    loginFailure(state, action) { state.loading = false; state.error = action.payload },
    logout(state) {
      state.token = null
      state.user = null
      localStorage.removeItem('ff_token')
      localStorage.removeItem('ff_user')
    }
  }
})

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions
export default authSlice.reducer
