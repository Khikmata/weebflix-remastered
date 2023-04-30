
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IProducers } from '../../../types/FetchTypes';

export interface CounterState {
	producersQuery: string,
	producersDisplay: string,
}


const initialState: CounterState = {
	producersQuery: '',
	producersDisplay: '',
}

const slice = createSlice({
	name: 'producersFilter',
	initialState,
	reducers: {
		setProducer: (state, action: PayloadAction<IProducers>) => {
			state.producersQuery = action.payload.mal_id.toString();
			state.producersDisplay = action.payload.titles[0].title;
		},
		removeProducer: (state, action: PayloadAction<string>) => {
			state.producersQuery = '';
			state.producersDisplay = '';
		},
	}
})

export const { reducer: producersFilterReducer, actions: producersFilterActions } = slice;
