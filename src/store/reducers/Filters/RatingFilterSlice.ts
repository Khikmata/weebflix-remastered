import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IDropdownItem } from '@store/types/DetailsTypes'

export function transformRating(rating: string) {
  switch (rating) {
    case 'G - All Ages':
      return 'g'
    case 'PG - Children':
      return 'pg'
    case 'PG-13 - Teens 13 or older':
      return 'pg13'
    case 'R - 17+ (violence & profanity)':
      return 'r17'
    case 'R+ - Mild Nudity':
      return 'r'
    case 'Rx - Hentai':
      return 'rx'
    default:
      return rating
  }
}

interface ratingFilterProps {
  ratingQuery: string | null
  ratingDisplay: string | null
}

const initialState: ratingFilterProps = {
  ratingQuery: null,
  ratingDisplay: null,
}

const slice = createSlice({
  name: 'ratingFilter',
  initialState,
  reducers: {
    setRating: (state, action: PayloadAction<IDropdownItem>) => {
      state.ratingQuery = transformRating(action.payload.value)
      state.ratingDisplay = action.payload.value
    },
    removeRating: (state) => {
      state.ratingQuery = null
      state.ratingDisplay = null
    },
  },
})

export const { reducer: ratingFilterReducer, actions: ratingFilterActions } =
  slice
