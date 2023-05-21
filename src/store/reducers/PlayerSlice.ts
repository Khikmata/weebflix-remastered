import { createSlice } from '@reduxjs/toolkit'

export interface PlayerState {
  activeEpisode: number
}

const initialState: PlayerState = {
  activeEpisode: 1,
}

const slice = createSlice({
  name: 'playerSlice',
  initialState,
  reducers: {
    setActiveEpisodeIndex: (state, action) => {
      state.activeEpisode = action.payload
    },
  },
})

export const { reducer: PlayerReducer, actions: PlayerActions } = slice
