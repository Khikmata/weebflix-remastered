import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CounterState {
	year: string,
	season: string,
	seasonQuery: string,
}


const initialState: CounterState = {
	year: '',
	season: '',
	seasonQuery: '',
}


interface SeasonData {
	year: string;
	season: string;
}

const slice = createSlice({
	name: 'seasonFilter',
	initialState,
	reducers: {
		setSeasonData: (state, action: PayloadAction<SeasonData>) => {

			state.year = action.payload.year;
			state.season = action.payload.season;
			state.seasonQuery = `${state.year}/${state.season}`
		},
		removeSeasonData: (state, action: PayloadAction<SeasonData>) => {
			state.seasonQuery = ''
			state.year = ''
			state.season = ''
		},
	},
})

export const { reducer: seasonFilterReducer, actions: seasonFilterActions } = slice;
