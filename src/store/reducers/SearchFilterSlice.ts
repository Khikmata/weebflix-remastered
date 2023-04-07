import { createSlice } from '@reduxjs/toolkit';


export interface CounterState {
	maxScore: number;
	minScore: number;
	dateFrom: string;
	dateTo: string;
}


const initialState: CounterState = {
	maxScore: 10,
	minScore: 0,
	dateFrom: "1941",
	dateTo: "2023",
}

const slice = createSlice({
	name: 'counter',
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
		}
	},
})

export const { reducer: SearchFilterReducer, actions: SearchFilterActions } = slice;
