import { createSlice } from '@reduxjs/toolkit';

export enum statusTypeEnum {
	'airing',
	"complete",
	"upcoming"
}

export interface CounterState {
	statusType: statusTypeEnum | null,
}


const initialState: CounterState = {
	statusType: null,
}

const slice = createSlice({
	name: 'statusFilter',
	initialState,
	reducers: {
		setStatus: (state, action) => {
			state.statusType = action.payload;
		},
	},
})

export const { reducer: statusFilterReducer, actions: statusFilterActions } = slice;
