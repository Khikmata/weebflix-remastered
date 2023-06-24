import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface sortFilterProps {
  sortType: string
}

const initialState: sortFilterProps = {
  sortType: 'desc',
}

const slice = createSlice({
  name: 'sortFilter',
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<string>) => {
      state.sortType = action.payload
    },
  },
})

export const { reducer: sortFilterReducer, actions: sortFilterActions } = slice
