
import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
	typeQuery: string,
	typeDisplay: string,

}


const initialState: CounterState = {
	typeQuery: '',
	typeDisplay: '',
}

const slice = createSlice({
	name: 'typeFilter',
	initialState,
	reducers: {
		setType: (state, action) => {
			state.typeQuery = action.payload;
			state.typeDisplay = action.payload;
		},
		removeType: (state) => {
			state.typeQuery = '';
			state.typeDisplay = '';
		},
	},
})

export const { reducer: typeFilterReducer, actions: typeFilterActions } = slice;
