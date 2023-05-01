import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IGenres } from '../../../types/DetailsTypes'

export interface CounterState {
  genresQuery: string
  genresName: string[]
}

const initialState: CounterState = {
  genresQuery: '',
  genresName: [],
}

const slice = createSlice({
  name: 'genreFilter',
  initialState,
  reducers: {
    setGenre: (state, action: PayloadAction<IGenres>) => {
      state.genresQuery += `${action.payload.mal_id},`
      state.genresName.push(action.payload.name)
    },
    removeGenre: (state, action: PayloadAction<IGenres>) => {
      state.genresQuery = state.genresQuery.replace(`${action.payload.mal_id},`, '')
      const indexToRemove = state.genresName.findIndex((el) => el === action.payload.name)
      if (indexToRemove !== 0) {
        state.genresName.splice(indexToRemove, 1)
      } else {
        state.genresName.shift()
      }
    },
  },
})

export const { reducer: genreFilterReducer, actions: genreFilterActions } = slice
