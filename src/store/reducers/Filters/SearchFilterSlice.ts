import { PayloadAction, createSlice } from '@reduxjs/toolkit';



export interface CounterState {
	searchQuery: string,
	sfw: string,
}


const initialState: CounterState = {
	searchQuery: '',
	sfw: 'true',
}

const slice = createSlice({
	name: 'searchFilter',
	initialState,
	reducers: {
		setSearchQuery: (state, action: PayloadAction<string>) => {
			state.searchQuery = action.payload
		},
	},
})

export const { reducer: searchFilterReducer, actions: searchFilterActions } = slice;
