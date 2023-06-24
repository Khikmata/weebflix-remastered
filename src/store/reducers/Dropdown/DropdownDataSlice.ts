import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IGenres } from 'types/DetailsTypes'
import { IProducers, ISeasons } from 'types/FetchTypes'

export interface DropdownDataState {
  genreData: IGenres[]
  producersData: IProducers[]
  seasonsData: ISeasons[]
}

const initialState: DropdownDataState = {
  genreData: [],
  producersData: [],
  seasonsData: [],
}

const slice = createSlice({
  name: 'dropdownData',
  initialState,
  reducers: {
    setGenreData: (state, action: PayloadAction<IGenres[]>) => {
      state.genreData = action.payload
    },
    setProducerData: (state, action) => {
      state.producersData = action.payload
    },
    setSeasonData: (state, action: PayloadAction<ISeasons[]>) => {
      state.seasonsData = action.payload
    },
  },
})

export const { reducer: DropdownDataReducer, actions: DropdownDataActions } = slice
