import { createSlice } from '@reduxjs/toolkit';


export interface CounterState {
	max_rating: number;
}


const initialState: CounterState = {
	max_rating: 10,
}

const slice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		setActiveFilterIndex: (state, action) => {
			state.max_rating = action.payload;
		}
	},
})

export const { reducer: CatalogueFilterReducer, actions: CatalogueFilterActions } = slice;
