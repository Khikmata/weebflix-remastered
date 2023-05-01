import { createSlice } from '@reduxjs/toolkit';


export interface CounterState {
	activeEpisode: number
}


const initialState: CounterState = {
	activeEpisode: 1,
}

const slice = createSlice({
	name: 'playerSlice',
	initialState,
	reducers: {
		setActiveEpisodeIndex: (state, action) => {
			state.activeEpisode = action.payload;
		}
	},
})

export const { reducer: PlayerReducer, actions: PlayerActions } = slice;
