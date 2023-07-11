import { createSlice } from '@reduxjs/toolkit'

export const filterOptions = ['Актуальное', 'Скоро выйдет']

interface MobileOptionState {
  isUserMobile: boolean
}

const initialState: MobileOptionState = {
  isUserMobile: false,
}

const slice = createSlice({
  name: 'MobileOptions',
  initialState,
  reducers: {
    setUserMobile: (state) => {
      state.isUserMobile = true
    },
  },
})

export const { reducer: MobileReducer, actions: MobileActions } = slice
