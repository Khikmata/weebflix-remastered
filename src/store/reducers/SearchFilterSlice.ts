import { createSlice } from '@reduxjs/toolkit';


export interface CounterState {
	maxScore: number;
	minScore: number;
	dateFrom: number;
	dateTo: number;
	genres: string;
}


const initialState: CounterState = {
	maxScore: 10,
	minScore: 0,
	dateFrom: 1990,
	dateTo: 2023,
	genres: '',
}

const slice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setMaxScore: (state, action) => {
			state.maxScore = action.payload;
		},
		setMinScore: (state, action) => {
			state.minScore = action.payload;
		},
		setDateFrom: (state, action) => {
			state.dateFrom = action.payload;
		},
		setDateTo: (state, action) => {
			state.dateTo = action.payload;
		},
		setGenre: (state, action) => {
			state.genres += action.payload;
		}
	},
})

export const { reducer: SearchFilterReducer, actions: SearchFilterActions } = slice;
