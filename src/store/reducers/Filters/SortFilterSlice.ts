import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type sortTypes = 'asc' | 'desc'

interface sortFilterProps {
  sortType: sortTypes
}

const initialState: sortFilterProps = {
  sortType: 'desc',
}

const slice = createSlice({
  name: 'sortFilter',
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<sortTypes>) => {
      state.sortType = action.payload
    },
  },
})

export const { reducer: sortFilterReducer, actions: sortFilterActions } = slice
