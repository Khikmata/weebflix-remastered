import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IGenres } from 'types/DetailsTypes'

interface genreFilterProps {
  selectedGenresNames: string[]
  selectedGenresIndexes: number[]
}

const initialState: genreFilterProps = {
  selectedGenresIndexes: [],
  selectedGenresNames: [],
}

const slice = createSlice({
  name: 'genreFilter',
  initialState,
  reducers: {
    setGenre: (state, action: PayloadAction<IGenres>) => {
      //Если данный жанр уже существует в массиве, возвращаем ничего
      state.selectedGenresIndexes.push(action.payload.mal_id)
      state.selectedGenresNames.push(action.payload.name)
    },
    excludeGenre: (state, action: PayloadAction<IGenres>) => {
      // TODO: Выбор исключенных жанров
    },
    removeGenre: (state, action: PayloadAction<IGenres>) => {
      //Удаление жанра из массива
      state.selectedGenresIndexes.splice(state.selectedGenresIndexes.indexOf(action.payload.mal_id), 1)
      state.selectedGenresNames.splice(state.selectedGenresIndexes.indexOf(action.payload.mal_id), 1)
    },
  },
})

export const { reducer: genreFilterReducer, actions: genreFilterActions } = slice
