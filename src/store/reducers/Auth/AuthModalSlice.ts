import { createSlice } from '@reduxjs/toolkit'

interface IUser {
  token: string
  userId: string
}
export interface AuthState {
  isOpen: boolean
  user: null | IUser
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
      console.log(state.user)
    },
    logout: (state, action) => {
      state.user = null
    },
  },
})

export const { reducer: authModalReducer, actions: authModalAction } = slice
