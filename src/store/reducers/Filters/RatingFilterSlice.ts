import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CounterState {
	ratingQuery: string,
	ratingDisplay: string[],
}


const initialState: CounterState = {
	ratingQuery: '',
	ratingDisplay: [],
}

const slice = createSlice({
	name: 'ratingFilter',
	initialState,
	reducers: {
		setRating: (state, action) => {
			state.ratingQuery = action.payload;
			state.ratingDisplay[0] = (action.payload);
		},
		removeRating: (state, action: PayloadAction<string>) => {
			state.ratingQuery = state.ratingQuery.replace(`${action.payload}`, '');
			state.ratingDisplay[0] = ('');
		},

	},
})

export const { reducer: ratingFilterReducer, actions: ratingFilterActions } = slice;
