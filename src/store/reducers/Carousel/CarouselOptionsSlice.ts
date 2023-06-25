import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const filterOptions = ['Актуальное', 'Скоро выйдет']

interface CarouselOptionState {
  activeCarouselOptionIndex: number
}

const initialState: CarouselOptionState = {
  activeCarouselOptionIndex: 0,
}

const slice = createSlice({
  name: 'carouselOptions',
  initialState,
  reducers: {
    setActiveCarouselOptionIndex: (state, action: PayloadAction<number>) => {
      state.activeCarouselOptionIndex = action.payload
    },
  },
})

export const { reducer: CarouselReducer, actions: CarouselActions } = slice
