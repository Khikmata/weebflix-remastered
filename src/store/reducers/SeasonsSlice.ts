import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CounterState {
	year: string,
	season: string
	seasonQuery: string
}


const initialState: CounterState = {
	year: '',
	season: '',
	seasonQuery: '',
}

const slice = createSlice({
	name: 'season',
	initialState,
	reducers: {
		setSeason: (state, action) => {
			state.year = action.payload;
			state.season = action.payload;
		},
		removeSeason: (state, action: PayloadAction<string>) => {
			state.year = '';
			state.season = '';
		},
	},
})

export const { reducer: SeasonReducer, actions: SeasonActions } = slice;
