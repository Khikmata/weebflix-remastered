import { createSlice } from '@reduxjs/toolkit'

export interface AuthState {
  isOpen: boolean
}

const initialState: AuthState = {
  isOpen: false,
}

const slice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      state.isOpen = action.payload
    },
  },
})

export const { reducer: authModalReducer, actions: authModalAction } = slice
