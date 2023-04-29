import { PayloadAction, createSlice } from '@reduxjs/toolkit';


export enum sortTypeEnum {
	desc = 'По убыванию',
	asc = 'По возрастанию'
}

export interface CounterState {
	sortType: sortTypeEnum | null,
}


const initialState: CounterState = {
	sortType: sortTypeEnum.desc,
}

const slice = createSlice({
	name: 'sortFilter',
	initialState,
	reducers: {
		setType: (state, action: PayloadAction<sortTypeEnum>) => {
			state.sortType = action.payload;
		}
	}
})

export const { reducer: sortFilterReducer, actions: sortFilterActions } = slice;
