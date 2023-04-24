
import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
	typeQuery: string,
	typeDisplay: string[],

}


const initialState: CounterState = {
	typeQuery: '',
	typeDisplay: [],
}

const slice = createSlice({
	name: 'typeFilter',
	initialState,
	reducers: {
		setType: (state, action) => {
			state.typeQuery = action.payload;
			state.typeDisplay[0] = (action.payload);
		},
		removeType: (state, action) => {
			state.typeQuery = state.typeQuery.replace(`${action.payload.mal_id}`, '');
			const indexToRemove = state.typeDisplay.findIndex(el => el === action.payload.name);
			if (indexToRemove !== 0) {
				state.typeDisplay.splice(indexToRemove, 1);
			} else {
				state.typeDisplay.shift();
			}
		},
	},
})

export const { reducer: typeFilterReducer, actions: typeFilterActions } = slice;
