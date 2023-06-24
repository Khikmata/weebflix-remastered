import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IDropdownItem } from 'types/DetailsTypes'

interface typeFilterProps {
  typeQuery: string | null
  typeDisplay: string | null
}

const initialState: typeFilterProps = {
  typeQuery: null,
  typeDisplay: null,
}

const slice = createSlice({
  name: 'typeFilter',
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<string>) => {
      state.typeQuery = action.payload
      state.typeDisplay = action.payload
    },
    removeType: (state) => {
      state.typeQuery = null
      state.typeDisplay = null
    },
  },
})

export const { reducer: typeFilterReducer, actions: typeFilterActions } = slice
