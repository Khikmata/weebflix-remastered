import { createSlice } from '@reduxjs/toolkit'

interface IUser {
  _id: string
  userId: string
}
export interface AuthState {
  isOpen: boolean
  user: null | string
}

const initialState: AuthState = {
  isOpen: false,
  user: null,
}

const slice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      state.isOpen = action.payload
    },
    authUser: (state, action) => {
      state.user = action.payload
      window.localStorage.setItem('token', action.payload)
      console.log(state.user)
    },
    logout: (state) => {
      state.user = null
      window.localStorage.removeItem('token')
    },
  },
})

export const { reducer: authModalReducer, actions: authModalAction } = slice
