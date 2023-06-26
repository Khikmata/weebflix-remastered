import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface searchFilterProps {
  searchQuery: string
  sfw: string
}

const initialState: searchFilterProps = {
  searchQuery: '',
  sfw: 'true',
}

const slice = createSlice({
  name: 'searchFilter',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
  },
})

export const { reducer: searchFilterReducer, actions: searchFilterActions } =
  slice
