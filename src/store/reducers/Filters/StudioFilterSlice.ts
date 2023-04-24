
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CounterState {
	producersQuery: string,
	producersDisplay: string[],
}


const initialState: CounterState = {
	producersQuery: '',
	producersDisplay: [],
}

const slice = createSlice({
	name: 'studioFilter',
	initialState,
	reducers: {
		setProducer: (state, action) => {
			state.producersQuery = action.payload;
			state.producersDisplay[0] = (action.payload);
		},
		removeProducer: (state, action: PayloadAction<string>) => {
			state.producersQuery = state.producersQuery.replace(`${action.payload}`, '');
			state.producersDisplay[0] = ('');
		},
	}
})

export const { reducer: studioFilterReducer, actions: studioFilterActions } = slice;
